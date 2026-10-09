import React, { useState, useEffect, useRef } from 'react';
import { prefetchQuestionImages } from '../utils/prefetch';
import './HomePage.css';

interface HomePageProps {
  answeredCount: number;
  hasProgress: boolean;
  onStartQuiz: () => void;
  onContinueQuiz: () => void;
  onResetProgress: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  answeredCount,
  hasProgress,
  onStartQuiz,
  onContinueQuiz,
  onResetProgress,
}) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // 首页加载后空闲预取第1题插图，开始答题时首屏更快
  useEffect(() => {
    prefetchQuestionImages(1);
  }, []);

  // 弹层键盘事件
  useEffect(() => {
    if (!showAbout) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAbout(false);
        aboutBtnRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // 自动聚焦关闭按钮
    setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAbout]);

  // 锁定背景滚动
  useEffect(() => {
    if (showAbout || showResetConfirm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAbout, showResetConfirm]);

  const handleReset = () => {
    onResetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="home-page">
      {/* 顶部品牌栏 */}
      <header className="home-header">
        <div className="brand">
          <span className="brand-name">MeetYourself 探索室</span>
        </div>
        <button
          ref={aboutBtnRef}
          className="btn-text about-btn"
          onClick={() => setShowAbout(true)}
          aria-label="关于测试"
        >
          关于测试
        </button>
      </header>

      {/* 主内容区 */}
      <main className="home-main">
        <div className="home-content">
          {/* 文案区 */}
          <div className="home-hero-text">
            <p className="eyebrow home-eyebrow reveal reveal-1">
              <span className="eyebrow-line" aria-hidden="true" />
              The Art Within
              <span className="eyebrow-line" aria-hidden="true" />
            </p>
            <h1 className="home-title reveal reveal-2">
              你的内心，
              <br />
              是哪一种<span className="title-accent">画派</span>？
            </h1>
            <p className="home-subtitle reveal reveal-3">
              36 道小题，认出和你最像的那一种。
            </p>

            <div className="home-specs reveal reveal-4">
              <span className="spec-item">
                <span className="spec-num font-display">36</span>
              道选择题
              </span>
              <span className="spec-rule" aria-hidden="true" />
              <span className="spec-item">
                <span className="spec-num font-display">13</span>
              种艺术风格
              </span>
              <span className="spec-rule" aria-hidden="true" />
              <span className="spec-item">
                <span className="spec-num font-display">01</span>
              份结果解读
              </span>
            </div>
          </div>

          {/* 画框区 */}
          <div className="home-frame-wrapper reveal reveal-3">
            <figure className="art-frame home-frame">
              <div className="art-frame-inner">
                {/* 首页原创主视觉：午后的私人美术馆角落 */}
                <span className="home-frame-art-wrap">
                  <img
                    className="home-frame-art"
                    src={`${import.meta.env.BASE_URL}images/home/hero.jpg`}
                    alt="阳光穿过百叶窗，洒在私人美术馆角落的扶手椅、画框与绿植上"
                    loading="eager"
                    draggable={false}
                  />
                  <span className="hero-seal" aria-hidden="true">
                    <span>心</span><span>赏</span>
                  </span>
                </span>
              </div>
            </figure>
            {/* 画廊墙牌 */}
            <figcaption className="wall-label">
              <span className="wall-label-index font-display">Pl. 00</span>
              <span className="wall-label-title">内心画派</span>
              <span className="wall-label-en font-display">The Art Within</span>
            </figcaption>
          </div>
        </div>

        {/* 行动区 */}
        <div className="home-actions reveal reveal-5">
          {hasProgress ? (
            <>
              <button className="btn-primary" onClick={onContinueQuiz}>
                继续答题 · 已答{answeredCount}/36
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>
              <button
                className="btn-text reset-btn"
                onClick={() => setShowResetConfirm(true)}
              >
                重新开始
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={onStartQuiz}>
              开始测试
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          )}
          <p className="home-hint caption">
            不用懂艺术，跟着第一感觉选就好
          </p>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="home-footer reveal reveal-6">
        <span className="footer-rule" aria-hidden="true" />
        <p className="caption">只是个趣味测试，不是心理诊断。</p>
      </footer>

      {/* 关于测试弹层 */}
      {showAbout && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowAbout(false);
            aboutBtnRef.current?.focus();
          }}
          role="presentation"
        >
          <div
            className="modal-dialog about-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              className="modal-close"
              onClick={() => {
                setShowAbout(false);
                aboutBtnRef.current?.focus();
              }}
              aria-label="关闭"
            >
              ×
            </button>
            <h2 id="about-title" className="modal-title">
              关于这个测试
            </h2>
            <div className="modal-content">
              <ul className="about-list">
                <li>
                  <strong>36 道选择题</strong>
                  <p className="caption">
                    一半看画，一半看生活，每题单选。
                  </p>
                </li>
                <li>
                  <strong>只给一个结果</strong>
                  <p className="caption">
                    从 13 种画派里匹配一种，没有好坏之分。
                  </p>
                </li>
                <li>
                  <strong>可以反悔</strong>
                  <p className="caption">
                    答题时随时能回到前面的题，改选别的。
                  </p>
                </li>
                <li>
                  <strong>有 E 选项兜底</strong>
                  <p className="caption">
                    拿不准就选「都不太像／暂时无法判断」，这题不计入偏好。
                  </p>
                </li>
                <li>
                  <strong>可能加赛一题</strong>
                  <p className="caption">
                    如果两种画派一样接近，会多出一道小题帮你分出高下。
                  </p>
                </li>
                <li>
                  <strong>仅供一乐</strong>
                  <p className="caption">
                    这是个好玩的艺术偏好测试，不是专业心理测量。
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 重新开始确认弹层 */}
      {showResetConfirm && (
        <div
          className="modal-overlay"
          onClick={() => setShowResetConfirm(false)}
          role="presentation"
        >
          <div
            className="modal-dialog confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="reset-title" className="modal-title">
              重新开始？
            </h2>
            <p className="modal-desc">
              已经答过的题会被清空，找不回来。
            </p>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowResetConfirm(false)}
              >
                取消
              </button>
              <button className="btn-primary" onClick={handleReset}>
                确认重新开始
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
