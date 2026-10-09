import React, { useState, useRef, useEffect } from 'react';
import type { StyleCode, OptionLetter } from '../data/types';
import { tiebreakerOptions } from '../data/questions';
import './TiebreakerPage.css';

interface TiebreakerPageProps {
  tiedStyles: StyleCode[];
  onChoose: (styleCode: StyleCode) => void;
  onBack: () => void;
}

const TiebreakerPage: React.FC<TiebreakerPageProps> = ({
  tiedStyles,
  onChoose,
  onBack,
}) => {
  const [selected, setSelected] = useState<StyleCode | null>(null);
  const promptRef = useRef<HTMLHeadingElement>(null);

  // 为并列风格生成选项（A、B、C...）
  const options = tiedStyles.map((code, index) => ({
    letter: (String.fromCharCode(65 + index)) as OptionLetter,
    styleCode: code,
    text: tiebreakerOptions[code],
  }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    promptRef.current?.focus({ preventScroll: true });
  }, []);

  const handleSelect = (styleCode: StyleCode) => {
    setSelected(styleCode);
  };

  const handleConfirm = () => {
    if (selected) {
      onChoose(selected);
    }
  };

  return (
    <div className="tiebreaker-page">
      {/* 顶部栏 */}
      <header className="quiz-header">
        <button
          className="btn-text back-btn"
          onClick={onBack}
          aria-label="返回修改"
        >
          <span aria-hidden="true">←</span>
          <span>返回修改</span>
        </button>
        <div className="quiz-product-name">内心画派</div>
        <div className="tiebreaker-progress eyebrow-cn">
          加赛一题
        </div>
      </header>

      {/* 进度条 - 满格 */}
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: '100%' }} />
      </div>

      <main className="quiz-main">
        <div className="quiz-content">
          <p className="quiz-chapter tiebreaker-label">
            加赛一题 · 有两个方向都很像你
          </p>

          <h1
            ref={promptRef}
            className="quiz-prompt"
            tabIndex={-1}
          >
            如果现在继续体验一种创作，你更想尝试哪一种？
          </h1>

          <p className="quiz-hint caption">
            有 {tiedStyles.length} 种画派和你一样近，再凭直觉选一题就好。
          </p>

          {/* 选项 */}
          <fieldset className="quiz-options">
            <legend className="sr-only">请选择一种创作体验</legend>
            
            <div className="options-grid">
              {options.map((option) => {
                const isSelected = selected === option.styleCode;
                return (
                  <label
                    key={option.styleCode}
                    className={`option-card ${isSelected ? 'is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="tiebreaker"
                      value={option.styleCode}
                      checked={isSelected}
                      onChange={() => handleSelect(option.styleCode)}
                      className="sr-only"
                    />
                    <span className="option-letter" aria-hidden="true">
                      {option.letter}
                    </span>
                    <span className="option-text">{option.text}</span>
                    <span className="option-check" aria-hidden="true">
                      {isSelected && '✓'}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      </main>

      {/* 底部行动栏 */}
      <div className="quiz-bottom-bar">
        <div className="bottom-bar-inner">
          <button
            className="btn-primary"
            onClick={handleConfirm}
            disabled={!selected}
          >
            查看我的画派
          </button>
        </div>
      </div>

      <div className="quiz-bottom-spacer" />
    </div>
  );
};

export default TiebreakerPage;
