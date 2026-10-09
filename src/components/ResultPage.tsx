import React, { useState } from 'react';
import type { ScoreResult, AnswerRecord } from '../data/types';
import { styleResults } from '../data/results';
import { questions } from '../data/questions';
import ShareCard from './ShareCard';
import './ResultPage.css';

interface ResultPageProps {
  result: ScoreResult;
  answers: Record<string, AnswerRecord>;
  onRestart: () => void;
  onViewChoices?: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({
  result,
  answers,
  onRestart,
}) => {
  const [showShareCard, setShowShareCard] = useState(false);

  if (result.status !== 'complete' || !result.styleCode) {
    return null;
  }

  const style = styleResults[result.styleCode];
  const evidenceQuestions = result.evidenceQuestions || [];
  const bestMatch = styleResults[style.bestMatch];
  const contrastMatch = styleResults[style.contrastMatch];

  // 生成匹配依据的文字描述 —— 完整引用当时的选项
  const getEvidenceText = (qNum: number) => {
    const q = questions.find((q) => q.number === qNum);
    const answer = answers[q?.id || ''];
    if (!q || !answer) return '';

    const option = q.options.find((o) => o.letter === answer.optionLetter);
    if (!option) return '';

    return option.text;
  };

  return (
    <div className="result-page">
      {/* 顶部 */}
      <header className="result-header">
        <p className="eyebrow-cn result-eyebrow">和你最像的画派是</p>
      </header>

      <main className="result-main">
        <div className="result-content">
          {/* 结果名称 */}
          <h1 className="result-name">{style.name}</h1>
          {style.englishName && (
            <p className="result-english eyebrow">{style.englishName}</p>
          )}

          {/* 主画框（竖版主视觉） */}
          <figure className="art-frame result-frame result-frame--portrait">
            <div className="result-frame-inner">
              {style.imagePath && (
                <img
                  className="result-artwork-img"
                  src={style.imagePath}
                  alt={`${style.name}风格主视觉`}
                  loading="eager"
                  draggable={false}
                />
              )}
            </div>
            <figcaption className="result-frame-caption">
              {style.name} · {style.englishName}
            </figcaption>
          </figure>

          {/* 关键词 */}
          <div className="result-keywords">
            {style.keywords.map((kw, i) => (
              <span key={i} className="keyword-tag">
                {kw}
              </span>
            ))}
          </div>

          {/* 结果摘要 */}
          <p className="result-summary">{style.summary}</p>

          {/* 画派名片：金句 · 色卡 · 周末过法 */}
          <section className="style-card" aria-label="你的画派名片">
            <p className="style-card-eyebrow eyebrow-cn">你的画派名片</p>
            <blockquote className="style-card-motto">{style.motto}</blockquote>

            <div className="style-card-row">
              <span className="style-card-label">专属配色</span>
              <span className="style-card-palette">
                {style.palette.map((c) => (
                  <span className="palette-chip" key={c.hex}>
                    <span
                      className="palette-dot"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden="true"
                    />
                    {c.name}
                  </span>
                ))}
              </span>
            </div>

            <div className="style-card-row">
              <span className="style-card-label">这个周末</span>
              <span className="style-card-weekend">{style.weekend}</span>
            </div>
          </section>

          <hr className="divider" />

          {/* 01 你的表达方式 */}
          <section className="result-section">
            <header className="section-head">
              <span className="section-number">01</span>
              <span className="section-head-rule" aria-hidden="true" />
              <h2 className="section-title">你的表达方式</h2>
            </header>
            <p className="section-text">{style.expression}</p>
          </section>

          <hr className="divider" />

          {/* 02 你的心动瞬间 */}
          <section className="result-section">
            <header className="section-head">
              <span className="section-number">02</span>
              <span className="section-head-rule" aria-hidden="true" />
              <h2 className="section-title">你的心动瞬间</h2>
            </header>
            <p className="section-lead caption">
              回头看，答题时让你停下来的是这几个：
            </p>
            <ul className="evidence-list">
              {evidenceQuestions.map((qNum) => (
                <li key={qNum} className="evidence-item">
                  <span className="evidence-num">{qNum}</span>
                  <span className="evidence-text">
                    第 {qNum} 题，你被「{getEvidenceText(qNum)}」吸引
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="divider" />

          {/* 03 认识这个画派 */}
          {style.artKnowledge && (
            <>
              <section className="result-section">
                <header className="section-head">
                  <span className="section-number">03</span>
                  <span className="section-head-rule" aria-hidden="true" />
                  <h2 className="section-title">认识这个画派</h2>
                </header>
                <div className="master-labels">
                  <p className="master-label">
                    <span className="master-label-key">代表人物</span>
                    <span className="master-label-val">{style.masters}</span>
                  </p>
                  <p className="master-label">
                    <span className="master-label-key">代表作品</span>
                    <span className="master-label-val">{style.masterworks}</span>
                  </p>
                </div>
                <p className="section-text">{style.artKnowledge}</p>
              </section>
              <hr className="divider" />
            </>
          )}

          {/* 04 画派搭子 */}
          <section className="result-section">
            <header className="section-head">
              <span className="section-number">04</span>
              <span className="section-head-rule" aria-hidden="true" />
              <h2 className="section-title">你的画派搭子</h2>
            </header>
            <div className="match-cards">
              <div className="match-card match-card--best">
                <p className="match-tag eyebrow-cn">最合拍</p>
                <p className="match-name">
                  {bestMatch.name}
                  <span className="match-en">{bestMatch.englishName}</span>
                </p>
                <p className="match-desc caption">同频，能约着一起看展的那种</p>
              </div>
              <div className="match-card match-card--contrast">
                <p className="match-tag eyebrow-cn">最反差</p>
                <p className="match-name">
                  {contrastMatch.name}
                  <span className="match-en">{contrastMatch.englishName}</span>
                </p>
                <p className="match-desc caption">完全不同，但会偷偷好奇对方</p>
              </div>
            </div>
          </section>

          <hr className="divider" />

          {/* 05 带进日常 */}
          {style.dailyPractice && (
            <>
              <section className="result-section">
                <header className="section-head">
                  <span className="section-number">05</span>
                  <span className="section-head-rule" aria-hidden="true" />
                  <h2 className="section-title">带进日常</h2>
                </header>
                <div className="practice-card">
                  <p className="section-text">{style.dailyPractice}</p>
                </div>
              </section>
              <hr className="divider" />
            </>
          )}

          {/* 底部行动 */}
          <div className="result-actions">
            <button
              className="btn-primary"
              onClick={() => setShowShareCard(true)}
            >
              保存我的艺术卡
            </button>
            <p className="share-invite caption">
              也发给朋友测测，看你们是不是一个画派
            </p>
            <div className="result-secondary-actions">
              <button className="btn-text" onClick={onRestart}>
                再测一次
              </button>
            </div>
          </div>

          {/* 底部说明 */}
          <p className="result-footer-note caption">
            喜欢某一种艺术，并不意味着你只能用一种方式生活。
          </p>
        </div>
      </main>

      {/* 分享卡弹层 */}
      {showShareCard && (
        <ShareCard
          styleCode={result.styleCode}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
};

export default ResultPage;
