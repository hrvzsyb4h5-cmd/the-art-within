import React, { useEffect, useRef } from 'react';
import type { AnswerRecord, OptionLetter } from '../data/types';
import { questions } from '../data/questions';
import './QuizPage.css';

interface QuizPageProps {
  currentQuestionNumber: number;
  answers: Record<string, AnswerRecord>;
  onAnswer: (answer: AnswerRecord) => void;
  onQuestionChange: (num: number) => void;
  onBackToHome: () => void;
  onSubmit: () => void;
}

const QuizPage: React.FC<QuizPageProps> = ({
  currentQuestionNumber,
  answers,
  onAnswer,
  onQuestionChange,
  onBackToHome,
  onSubmit,
}) => {
  const currentQuestion = questions.find((q) => q.number === currentQuestionNumber)!;
  const currentAnswer = answers[currentQuestion.id];
  const selectedLetter = currentAnswer?.optionLetter || null;
  const isLastQuestion = currentQuestionNumber === questions.length;
  const promptRef = useRef<HTMLHeadingElement>(null);

  // 题目切换时滚动到顶部并聚焦题干
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    promptRef.current?.focus({ preventScroll: true });
  }, [currentQuestionNumber]);

  const handleSelect = (letter: OptionLetter) => {
    const option = currentQuestion.options.find((o) => o.letter === letter)!;
    const answer: AnswerRecord = {
      questionId: currentQuestion.id,
      questionNumber: currentQuestion.number,
      optionLetter: letter,
      optionId: option.id,
      styleCode: option.styleCode,
      answeredAt: Date.now(),
    };
    onAnswer(answer);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onSubmit();
    } else {
      onQuestionChange(currentQuestionNumber + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionNumber > 1) {
      onQuestionChange(currentQuestionNumber - 1);
    } else {
      onBackToHome();
    }
  };

  const progress = (currentQuestionNumber / questions.length) * 100;
  // 第1-12题带插图
  const hasOptionImages = currentQuestion.options.some((o) => !!o.imagePath);

  return (
    <div className="quiz-page">
      {/* 顶部栏 */}
      <header className="quiz-header">
        <button
          className="btn-text back-btn"
          onClick={handlePrev}
          aria-label={currentQuestionNumber === 1 ? '返回首页' : '上一题'}
        >
          <span aria-hidden="true">←</span>
          <span>{currentQuestionNumber === 1 ? '返回' : '上一题'}</span>
        </button>
        <div className="quiz-product-name">内心画派</div>
        <div className="quiz-progress-text">
          <span className="font-display quiz-progress-num">
            {String(currentQuestionNumber).padStart(2, '0')}
          </span>
          <span className="quiz-progress-sep font-display">/</span>
          <span className="font-display quiz-progress-total">
            {String(questions.length).padStart(2, '0')}
          </span>
        </div>
      </header>

      {/* 进度条 */}
      <div className="quiz-progress-bar" role="progressbar" aria-valuenow={currentQuestionNumber} aria-valuemin={1} aria-valuemax={36}>
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 主内容 */}
      <main className="quiz-main">
        <div className="quiz-content" key={currentQuestionNumber}>
          {/* 图录编号行 */}
          <p className="quiz-catalog">
            <span className="font-display quiz-catalog-no">
              No.{String(currentQuestion.number).padStart(2, '0')}
            </span>
            <span className="quiz-catalog-rule" aria-hidden="true" />
            <span className="font-display quiz-catalog-chapter">
              Chapter {['I', 'II', 'III'][currentQuestion.section - 1]}
            </span>
          </p>

          {/* 章节标签 */}
          <p className="quiz-chapter">
            {currentQuestion.chapterLabel}
          </p>

          {/* 题干 */}
          <h1
            ref={promptRef}
            className="quiz-prompt"
            tabIndex={-1}
          >
            {currentQuestion.prompt}
          </h1>

          {currentQuestion.hint && (
            <p className="quiz-hint caption">
              {currentQuestion.hint}
            </p>
          )}

          {/* 选项 */}
          <fieldset className="quiz-options">
            <legend className="sr-only">请选择一个选项</legend>
            
            {/* A-D 选项 */}
            <div className={`options-grid ${hasOptionImages ? 'options-grid--images' : ''}`}>
              {currentQuestion.options
                .filter((o) => o.letter !== 'E')
                .map((option) => {
                  const isSelected = selectedLetter === option.letter;
                  return (
                    <label
                      key={option.id}
                      className={`option-card ${hasOptionImages ? 'option-card--image' : ''} ${isSelected ? 'is-selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option.letter}
                        checked={isSelected}
                        onChange={() => handleSelect(option.letter)}
                        className="sr-only"
                      />
                      {option.imagePath && (
                        <span className="option-image-wrap">
                          <img
                            className="option-image"
                            src={option.imagePath}
                            alt=""
                            loading="lazy"
                            draggable={false}
                          />
                          <span className="option-image-letter" aria-hidden="true">
                            {option.letter}
                          </span>
                          <span className="option-image-check" aria-hidden="true">
                            {isSelected && '✓'}
                          </span>
                        </span>
                      )}
                      <span className="option-body">
                        {!option.imagePath && (
                          <span className="option-letter" aria-hidden="true">
                            {option.letter}
                          </span>
                        )}
                        <span className="option-text">{option.text}</span>
                        {!option.imagePath && (
                          <span className="option-check" aria-hidden="true">
                            {isSelected && '✓'}
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
            </div>

            {/* E 选项 */}
            {currentQuestion.options
              .filter((o) => o.letter === 'E')
              .map((option) => {
                const isSelected = selectedLetter === option.letter;
                return (
                  <label
                    key={option.id}
                    className={`option-e ${isSelected ? 'is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option.letter}
                      checked={isSelected}
                      onChange={() => handleSelect(option.letter)}
                      className="sr-only"
                    />
                    <span className="option-e-letter" aria-hidden="true">
                      E
                    </span>
                    <span className="option-e-text">{option.text}</span>
                    <span className="option-check" aria-hidden="true">
                      {isSelected && '✓'}
                    </span>
                  </label>
                );
              })}
          </fieldset>
        </div>
      </main>

      {/* 底部行动栏 */}
      <div className="quiz-bottom-bar">
        <div className="bottom-bar-inner">
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!selectedLetter}
          >
            {isLastQuestion ? '查看我的画派' : '下一题'}
            <span className="btn-arrow" aria-hidden="true">
              {isLastQuestion ? '→' : '→'}
            </span>
          </button>
        </div>
      </div>

      {/* 底部留白，防止内容被底部栏遮挡 */}
      <div className="quiz-bottom-spacer" />
    </div>
  );
};

export default QuizPage;
