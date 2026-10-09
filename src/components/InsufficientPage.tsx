import React, { useEffect } from 'react';
import type { ScoreResult } from '../data/types';
import './InsufficientPage.css';

interface InsufficientPageProps {
  result: ScoreResult;
  onGoToQuestion: (questionNum: number) => void;
  onBackToQuiz: () => void;
}

const InsufficientPage: React.FC<InsufficientPageProps> = ({
  result,
  onGoToQuestion,
  onBackToQuiz,
}) => {
  const missing = result.missingQuestions || [];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // 按部分分组
  const part1Missing = missing.filter((n) => n >= 1 && n <= 12);
  const part2Missing = missing.filter((n) => n >= 13 && n <= 28);
  const part3Missing = missing.filter((n) => n >= 29 && n <= 36);

  return (
    <div className="insufficient-page">
      <main className="insufficient-main">
        <div className="insufficient-content">
          <p className="eyebrow-cn">结果还出不来</p>
          
          <h1 className="insufficient-title">
            还差几道题
          </h1>
          
          <p className="insufficient-desc">
            现在记下了 {result.validCount} 题的选择，再补几道，才能算出和你最像的画派。
            <br />
            点下面的题号，可以直接跳过去补选：
          </p>

          {/* 各部分缺答 */}
          <div className="missing-sections">
            {part1Missing.length > 0 && (
              <div className="missing-section">
                <p className="missing-section-title">
                  第一部分 · 还需 {Math.max(0, 9 - result.sectionValid[1])} 题
                </p>
                <div className="missing-grid">
                  {part1Missing.map((num) => (
                    <button
                      key={num}
                      className="missing-btn"
                      onClick={() => onGoToQuestion(num)}
                    >
                      第 {num} 题
                    </button>
                  ))}
                </div>
              </div>
            )}

            {part2Missing.length > 0 && (
              <div className="missing-section">
                <p className="missing-section-title">
                  第二部分 · 还需 {Math.max(0, 12 - result.sectionValid[2])} 题
                </p>
                <div className="missing-grid">
                  {part2Missing.map((num) => (
                    <button
                      key={num}
                      className="missing-btn"
                      onClick={() => onGoToQuestion(num)}
                    >
                      第 {num} 题
                    </button>
                  ))}
                </div>
              </div>
            )}

            {part3Missing.length > 0 && (
              <div className="missing-section">
                <p className="missing-section-title">
                  第三部分 · 还需 {Math.max(0, 6 - result.sectionValid[3])} 题
                </p>
                <div className="missing-grid">
                  {part3Missing.map((num) => (
                    <button
                      key={num}
                      className="missing-btn"
                      onClick={() => onGoToQuestion(num)}
                    >
                      第 {num} 题
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="insufficient-actions">
            <button className="btn-primary" onClick={onBackToQuiz}>
              继续答题
            </button>
          </div>

          <p className="insufficient-hint caption">
            选 E「都不太像」的题不计入结果。
          </p>
        </div>
      </main>
    </div>
  );
};

export default InsufficientPage;
