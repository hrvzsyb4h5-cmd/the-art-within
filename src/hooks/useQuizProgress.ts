import { useState, useEffect, useCallback } from 'react';
import type { AnswerRecord, QuizProgress } from '../data/types';

const STORAGE_KEY = 'inner-art-quiz-progress';
const VERSION = '1.0.0';

interface UseQuizProgressReturn {
  answers: Record<string, AnswerRecord>;
  currentQuestionNumber: number;
  answeredCount: number;
  hasProgress: boolean;
  saveAnswer: (answer: AnswerRecord) => void;
  setCurrentQuestion: (num: number) => void;
  resetProgress: () => void;
  loadProgress: () => QuizProgress | null;
}

export function useQuizProgress(): UseQuizProgressReturn {
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  // 从 localStorage 加载进度
  const loadProgress = useCallback((): QuizProgress | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw) as QuizProgress;
      if (data.version !== VERSION) {
        // 版本不匹配，清除旧数据
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data;
    } catch (e) {
      console.warn('Failed to load quiz progress:', e);
      return null;
    }
  }, []);

  // 保存进度到 localStorage
  const saveProgress = useCallback((newAnswers: Record<string, AnswerRecord>, currentNum: number) => {
    try {
      const progress: QuizProgress = {
        version: VERSION,
        answers: newAnswers,
        currentQuestionNumber: currentNum,
        startedAt: Object.values(newAnswers)[0]?.answeredAt || Date.now(),
        updatedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save quiz progress:', e);
    }
  }, []);

  // 初始化加载
  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setAnswers(saved.answers);
      setCurrentQuestionNumber(saved.currentQuestionNumber);
    }
  }, [loadProgress]);

  // 保存答案
  const saveAnswer = useCallback((answer: AnswerRecord) => {
    setAnswers((prev) => {
      const next = { ...prev, [answer.questionId]: answer };
      saveProgress(next, currentQuestionNumber);
      return next;
    });
  }, [currentQuestionNumber, saveProgress]);

  // 设置当前题目
  const setCurrentQuestion = useCallback((num: number) => {
    setCurrentQuestionNumber(num);
    saveProgress(answers, num);
  }, [answers, saveProgress]);

  // 重置进度
  const resetProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to reset quiz progress:', e);
    }
    setAnswers({});
    setCurrentQuestionNumber(1);
  }, []);

  const answeredCount = Object.keys(answers).filter(
    (id) => answers[id]?.optionLetter !== 'E'
  ).length;

  const hasProgress = Object.keys(answers).length > 0;

  return {
    answers,
    currentQuestionNumber,
    answeredCount,
    hasProgress,
    saveAnswer,
    setCurrentQuestion,
    resetProgress,
    loadProgress,
  };
}

export default useQuizProgress;
