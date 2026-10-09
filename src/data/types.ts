// 艺术风格代号
export type StyleCode =
  | 'IM' // 印象主义
  | 'RO' // 浪漫主义
  | 'RE' // 现实主义
  | 'EX' // 表现主义
  | 'SU' // 超现实主义
  | 'SY' // 象征主义
  | 'FA' // 野兽派
  | 'CU' // 立体主义
  | 'AE' // 抽象表现主义
  | 'MI' // 极简主义
  | 'PO' // 波普艺术
  | 'AN' // 新艺术运动
  | 'PT'; // 点彩

// 选项字母
export type OptionLetter = 'A' | 'B' | 'C' | 'D' | 'E';

// 题目部分
export type QuestionSection = 1 | 2 | 3;

// 题目类型
export type QuestionType = 'visual' | 'life' | 'tiebreaker';

// 单个选项
export interface QuestionOption {
  id: string;
  letter: OptionLetter;
  text: string;
  imagePath?: string;
  styleCode: StyleCode | null; // E选项为null
}

// 题目
export interface Question {
  id: string;
  number: number;
  section: QuestionSection;
  type: QuestionType;
  chapterLabel: string;
  prompt: string;
  hint?: string;
  options: QuestionOption[];
}

// 专属色卡
export interface PaletteColor {
  name: string;
  hex: string;
}

// 结果数据
export interface StyleResult {
  code: StyleCode;
  name: string;
  englishName?: string;
  summary: string;
  keywords: string[];
  expression: string;
  artKnowledge?: string;
  dailyPractice?: string;
  // 代表人物与代表作
  masters: string;
  masterworks: string;
  // 画派名片
  motto: string;
  weekend: string;
  palette: PaletteColor[];
  // 画派搭子
  bestMatch: StyleCode;
  contrastMatch: StyleCode;
  imagePath?: string;
}

// 用户答案记录
export interface AnswerRecord {
  questionId: string;
  questionNumber: number;
  optionLetter: OptionLetter;
  optionId: string;
  styleCode: StyleCode | null;
  answeredAt: number;
}

// 评分结果类型
export type ScoreResultStatus = 'complete' | 'insufficient' | 'tie' | 'tiebreaker_needed' | 'error';

export interface ScoreResult {
  status: ScoreResultStatus;
  styleCode?: StyleCode;
  styleName?: string;
  // 有效作答数
  validCount: number;
  // 各部分有效数
  sectionValid: { 1: number; 2: number; 3: number };
  // 需补答题号
  missingQuestions?: number[];
  // 各类型得分详情
  scores?: Record<StyleCode, number>;
  // 并列的类型
  tiedStyles?: StyleCode[];
  // 匹配依据（对应题号）
  evidenceQuestions?: number[];
  errorMessage?: string;
}

// 本地存储的进度
export interface QuizProgress {
  version: string;
  answers: Record<string, AnswerRecord>; // questionId -> answer
  currentQuestionNumber: number;
  startedAt: number;
  updatedAt: number;
}

// 页面路由
export type PageView = 'home' | 'quiz' | 'result' | 'tiebreaker';
