import React, { useState, useCallback } from 'react';
import type { PageView, ScoreResult, StyleCode } from './data/types';
import { calculateScore, resolveWithTiebreaker } from './data/scoring';
import { useQuizProgress } from './hooks/useQuizProgress';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import InsufficientPage from './components/InsufficientPage';
import TiebreakerPage from './components/TiebreakerPage';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const {
    answers,
    currentQuestionNumber,
    answeredCount,
    hasProgress,
    saveAnswer,
    setCurrentQuestion,
    resetProgress,
  } = useQuizProgress();

  // 开始答题
  const handleStartQuiz = useCallback(() => {
    setCurrentPage('quiz');
    if (currentQuestionNumber < 1) {
      setCurrentQuestion(1);
    }
  }, [currentQuestionNumber, setCurrentQuestion]);

  // 继续答题
  const handleContinueQuiz = useCallback(() => {
    setCurrentPage('quiz');
  }, []);

  // 返回首页
  const handleBackToHome = useCallback(() => {
    setCurrentPage('home');
    setScoreResult(null);
  }, []);

  // 提交答案
  const handleSubmit = useCallback(() => {
    setIsRevealing(true);
    // 模拟揭晓动画（约600ms）
    setTimeout(() => {
      const result = calculateScore(answers);
      setScoreResult(result);
      setIsRevealing(false);

      if (result.status === 'complete') {
        setCurrentPage('result');
      } else if (result.status === 'insufficient') {
        setCurrentPage('result'); // 用同一页面容器，内部判断
      } else if (result.status === 'tiebreaker_needed') {
        setCurrentPage('tiebreaker');
      }
    }, 600);
  }, [answers]);

  // 跳转到指定题目补答
  const handleGoToQuestion = useCallback((questionNum: number) => {
    setCurrentQuestion(questionNum);
    setCurrentPage('quiz');
    setScoreResult(null);
  }, [setCurrentQuestion]);

  // 返回答题页继续
  const handleBackToQuiz = useCallback(() => {
    setCurrentPage('quiz');
    setScoreResult(null);
  }, []);

  // 决胜题选择
  const handleTiebreakerChoose = useCallback((styleCode: StyleCode) => {
    if (!scoreResult?.tiedStyles) return;

    setIsRevealing(true);
    setTimeout(() => {
      const finalResult = resolveWithTiebreaker(
        answers,
        scoreResult.tiedStyles!,
        styleCode
      );
      setScoreResult(finalResult);
      setIsRevealing(false);
      setCurrentPage('result');
    }, 600);
  }, [answers, scoreResult]);

  // 重新开始
  const handleRestart = useCallback(() => {
    resetProgress();
    setCurrentPage('home');
    setScoreResult(null);
  }, [resetProgress]);

  // 揭晓动画
  if (isRevealing) {
    return (
      <div className="reveal-overlay">
        <div className="reveal-content">
          <div className="reveal-frame art-frame">
            <div className="art-frame-inner">
              <div className="reveal-loading">
                <div className="loading-dot" />
                <div className="loading-dot" />
                <div className="loading-dot" />
              </div>
            </div>
          </div>
          <p className="reveal-text caption">正在匹配你的画派…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {currentPage === 'home' && (
        <HomePage
          answeredCount={answeredCount}
          hasProgress={hasProgress}
          onStartQuiz={handleStartQuiz}
          onContinueQuiz={handleContinueQuiz}
          onResetProgress={handleRestart}
        />
      )}

      {currentPage === 'quiz' && (
        <QuizPage
          currentQuestionNumber={currentQuestionNumber}
          answers={answers}
          onAnswer={saveAnswer}
          onQuestionChange={setCurrentQuestion}
          onBackToHome={handleBackToHome}
          onSubmit={handleSubmit}
        />
      )}

      {currentPage === 'tiebreaker' && scoreResult?.tiedStyles && (
        <TiebreakerPage
          tiedStyles={scoreResult.tiedStyles}
          onChoose={handleTiebreakerChoose}
          onBack={handleBackToQuiz}
        />
      )}

      {currentPage === 'result' && scoreResult && (
        <>
          {scoreResult.status === 'complete' && (
            <ResultPage
              result={scoreResult}
              answers={answers}
              onRestart={handleRestart}
            />
          )}
          {scoreResult.status === 'insufficient' && (
            <InsufficientPage
              result={scoreResult}
              onGoToQuestion={handleGoToQuestion}
              onBackToQuiz={handleBackToQuiz}
            />
          )}
          {scoreResult.status === 'error' && (
            <div className="error-page">
              <h2>出错了</h2>
              <p>{scoreResult.errorMessage || '发生了未知错误'}</p>
              <button className="btn-primary" onClick={handleBackToQuiz}>
                返回答题
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
