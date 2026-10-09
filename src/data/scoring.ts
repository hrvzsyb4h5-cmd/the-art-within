import type {
  ScoreResult,
  AnswerRecord,
  StyleCode,
  Question,
} from './types';
import { questions } from './questions';
import { styleResults } from './results';

const ALL_STYLES: StyleCode[] = [
  'IM', 'RO', 'RE', 'EX', 'SU', 'SY', 'FA', 'CU', 'AE', 'MI', 'PO', 'AN', 'PT'
];

// 各部分最少有效题数
const MIN_VALID = {
  total: 27,
  1: 9,
  2: 12,
  3: 6,
};

/**
 * 计算单个类型的平滑得分
 * s: 被选择次数
 * n: 在有效作答题目里作为选项出现的次数
 * 原型比较值 = (s+1)/(n+4)
 */
function calcScore(s: number, n: number): number {
  return (s + 1) / (n + 4);
}

/**
 * 统计各题中某风格是否作为选项出现
 * 注意：每题的A-D对应四个不同风格，E对应null
 * 所以每题每个风格要么出现1次要么0次
 */
function countStyleAppearance(
  questionList: Question[],
  answers: Record<string, AnswerRecord>
): { s: Record<StyleCode, number>; n: Record<StyleCode, number>; validCount: number; sectionValid: { 1: number; 2: number; 3: number } } {
  const s: Record<string, number> = {};
  const n: Record<string, number> = {};
  ALL_STYLES.forEach((code) => {
    s[code] = 0;
    n[code] = 0;
  });

  let validCount = 0;
  const sectionValid = { 1: 0, 2: 0, 3: 0 } as { 1: number; 2: number; 3: number };

  for (const q of questionList) {
    const answer = answers[q.id];
    if (!answer) continue;

    // E选项视为缺失，不计分，但题目本身还是"出现过"
    if (answer.optionLetter === 'E') {
      // E选项：该题各风格n都+1吗？
      // 不，规则说"在有效作答题目里作为选项出现的次数n"
      // E选项表示该题没有有效偏好，不应计入n
      // 重新理解：有效作答题目 = 选了A-D的题
      // E = 缺失 = 该题不参与任何类型的s和n计算
      continue;
    }

    validCount++;
    sectionValid[q.section]++;

    // 对每个选项对应的风格，n+1
    // 因为每题有四个不同风格选项（A-D），所以这道题里每个选项风格的n都+1
    // 也就是这道有效题中，所有四个风格都"作为选项出现了"
    const styleSet = new Set<StyleCode>();
    for (const opt of q.options) {
      if (opt.styleCode) {
        styleSet.add(opt.styleCode);
      }
    }
    styleSet.forEach((code) => {
      n[code]++;
    });

    // 被选中的风格s+1
    if (answer.styleCode) {
      s[answer.styleCode]++;
    }
  }

  return {
    s: s as Record<StyleCode, number>,
    n: n as Record<StyleCode, number>,
    validCount,
    sectionValid,
  };
}

/**
 * 计算完整得分
 */
export function calculateScore(
  answers: Record<string, AnswerRecord>
): ScoreResult {
  try {
    const { s, n, validCount, sectionValid } = countStyleAppearance(questions, answers);

    // 检查有效数量是否足够
    if (
      validCount < MIN_VALID.total ||
      sectionValid[1] < MIN_VALID[1] ||
      sectionValid[2] < MIN_VALID[2] ||
      sectionValid[3] < MIN_VALID[3]
    ) {
      // 找出需要补答的题目
      const missingQuestions = findMissingQuestions(answers);
      return {
        status: 'insufficient',
        validCount,
        sectionValid,
        missingQuestions,
      };
    }

    // 计算各类型得分
    const scores: Record<StyleCode, number> = {} as Record<StyleCode, number>;
    ALL_STYLES.forEach((code) => {
      scores[code] = calcScore(s[code], n[code]);
    });

    // 找最高分
    const maxScore = Math.max(...Object.values(scores));
    const topStyles = ALL_STYLES.filter((code) => scores[code] === maxScore);

    if (topStyles.length === 1) {
      const winner = topStyles[0];
      const evidence = findEvidence(answers, winner);
      return {
        status: 'complete',
        styleCode: winner,
        styleName: styleResults[winner].name,
        validCount,
        sectionValid,
        scores,
        evidenceQuestions: evidence,
      };
    }

    // 并列：先比较第1-12题的得分
    const part1Questions = questions.filter((q) => q.section === 1);
    const part1Result = compareWithSubset(topStyles, part1Questions, answers);

    if (part1Result.winner) {
      const evidence = findEvidence(answers, part1Result.winner);
      return {
        status: 'complete',
        styleCode: part1Result.winner,
        styleName: styleResults[part1Result.winner].name,
        validCount,
        sectionValid,
        scores,
        tiedStyles: topStyles,
        evidenceQuestions: evidence,
      };
    }

    // 再比较第29-36题
    const part3Questions = questions.filter((q) => q.section === 3);
    const part3Result = compareWithSubset(part1Result.remainingTied!, part3Questions, answers);

    if (part3Result.winner) {
      const evidence = findEvidence(answers, part3Result.winner);
      return {
        status: 'complete',
        styleCode: part3Result.winner,
        styleName: styleResults[part3Result.winner].name,
        validCount,
        sectionValid,
        scores,
        tiedStyles: topStyles,
        evidenceQuestions: evidence,
      };
    }

    // 仍并列，需要决胜题
    return {
      status: 'tiebreaker_needed',
      validCount,
      sectionValid,
      scores,
      tiedStyles: part3Result.remainingTied,
    };
  } catch (e) {
    return {
      status: 'error',
      validCount: 0,
      sectionValid: { 1: 0, 2: 0, 3: 0 },
      errorMessage: e instanceof Error ? e.message : '未知错误',
    };
  }
}

/**
 * 用题目子集比较并列的风格
 */
function compareWithSubset(
  tiedStyles: StyleCode[],
  questionSubset: Question[],
  answers: Record<string, AnswerRecord>
): { winner?: StyleCode; remainingTied?: StyleCode[] } {
  const { s, n } = countStyleAppearance(questionSubset, answers);

  // 只计算参与比较的风格
  const subsetScores: Record<string, number> = {};
  tiedStyles.forEach((code) => {
    subsetScores[code] = calcScore(s[code], n[code]);
  });

  const maxScore = Math.max(...Object.values(subsetScores));
  const remaining = tiedStyles.filter((code) => subsetScores[code] === maxScore);

  if (remaining.length === 1) {
    return { winner: remaining[0] };
  }
  return { remainingTied: remaining };
}

/**
 * 找出需要补答的题目
 * 优先补各部分不足的
 */
function findMissingQuestions(
  answers: Record<string, AnswerRecord>
): number[] {
  const missing: number[] = [];

  // 按部分找出未答的题
  for (const q of questions) {
    const answer = answers[q.id];
    if (!answer || answer.optionLetter === 'E') {
      // 未答或选了E都算需要补答
      missing.push(q.number);
    }
  }

  return missing.sort((a, b) => a - b);
}

/**
 * 找出匹配依据（用户实际选择了该类型的2-3道题）
 */
function findEvidence(
  answers: Record<string, AnswerRecord>,
  styleCode: StyleCode
): number[] {
  const evidence: number[] = [];

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer && answer.styleCode === styleCode) {
      evidence.push(q.number);
    }
  }

  // 取前3道
  return evidence.slice(0, 3);
}

/**
 * 用决胜题结果计算最终结果
 */
export function resolveWithTiebreaker(
  answers: Record<string, AnswerRecord>,
  tiedStyles: StyleCode[],
  tiebreakerChoice: StyleCode
): ScoreResult {
  const baseResult = calculateScore(answers);
  
  if (!tiedStyles.includes(tiebreakerChoice)) {
    return baseResult;
  }

  const evidence = findEvidence(answers, tiebreakerChoice);
  
  return {
    status: 'complete',
    styleCode: tiebreakerChoice,
    styleName: styleResults[tiebreakerChoice].name,
    validCount: baseResult.validCount,
    sectionValid: baseResult.sectionValid,
    scores: baseResult.scores,
    tiedStyles,
    evidenceQuestions: evidence,
  };
}

export default calculateScore;
