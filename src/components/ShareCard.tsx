import React, { useState, useRef, useEffect } from 'react';
import type { StyleCode } from '../data/types';
import { styleResults } from '../data/results';
import './ShareCard.css';

interface ShareCardProps {
  styleCode: StyleCode;
  onClose: () => void;
}

const ShareCard: React.FC<ShareCardProps> = ({ styleCode, onClose }) => {
  const [exportStatus, setExportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const cardRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const style = styleResults[styleCode];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleExport = async () => {
    if (!cardRef.current) return;

    setExportStatus('loading');

    try {
      // 先加载真实结果主视觉图
      const loadImage = (src: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      let artwork: HTMLImageElement | null = null;
      if (style.imagePath) {
        try {
          artwork = await loadImage(style.imagePath);
        } catch {
          artwork = null;
        }
      }

      // 使用 canvas 绘制方案导出（1080x1440 竖版）
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1440;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('无法创建画布');
      }

      // 绘制背景 —— 腮红纸
      ctx.fillStyle = '#F7EDE9';
      ctx.fillRect(0, 0, 1080, 1440);

      // 品牌名
      ctx.fillStyle = '#7A6E6E';
      ctx.font = '26px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('MeetYourself 探索室', 540, 110);

      // 英文眉题
      ctx.font = '22px sans-serif';
      ctx.fillText('T H E   A R T   W I T H I N', 540, 152);

      // 眉题下玫瑰金发丝线
      ctx.strokeStyle = '#D6ADA0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(490, 176);
      ctx.lineTo(590, 176);
      ctx.stroke();

      // 竖版画框（3:4 图片区域）
      const frameX = 310;
      const frameY = 210;
      const frameW = 460;
      const frameH = 614;

      // 画框底
      ctx.fillStyle = '#FDF8F5';
      ctx.fillRect(frameX - 20, frameY - 20, frameW + 40, frameH + 40);
      ctx.strokeStyle = '#E9D8D3';
      ctx.lineWidth = 2;
      ctx.strokeRect(frameX - 20, frameY - 20, frameW + 40, frameH + 40);

      // 画框内侧发丝线
      ctx.strokeStyle = 'rgba(74, 45, 52, 0.12)';
      ctx.lineWidth = 1;
      ctx.strokeRect(frameX - 10, frameY - 10, frameW + 20, frameH + 20);

      // 裁切绘制主视觉图（cover）
      ctx.save();
      ctx.beginPath();
      ctx.rect(frameX, frameY, frameW, frameH);
      ctx.clip();
      if (artwork) {
        drawCover(ctx, artwork, frameX, frameY, frameW, frameH);
      } else {
        ctx.fillStyle = '#F5E1E4';
        ctx.fillRect(frameX, frameY, frameW, frameH);
      }
      ctx.restore();

      // 图片细边框
      ctx.strokeStyle = 'rgba(233, 216, 211, 0.9)';
      ctx.lineWidth = 1;
      ctx.strokeRect(frameX, frameY, frameW, frameH);

      // 画派名称
      ctx.fillStyle = '#2E2626';
      ctx.font = 'bold 68px "Songti SC", "STSong", serif';
      ctx.textAlign = 'center';
      ctx.fillText(style.name, 540, 920);

      // 英文名
      if (style.englishName) {
        ctx.fillStyle = '#7A6E6E';
        ctx.font = '24px sans-serif';
        ctx.fillText(style.englishName.toUpperCase(), 540, 966);
      }

      // 金句
      ctx.fillStyle = '#A4576B';
      ctx.font = '27px "Songti SC", "STSong", serif';
      ctx.fillText(style.motto, 540, 1012);

      // 摘要
      ctx.fillStyle = '#2E2626';
      ctx.font = '30px "Songti SC", serif';
      ctx.textAlign = 'center';
      const summary = style.summary;
      const maxWidth = 760;
      const lineHeight = 46;
      wrapText(ctx, summary, 540, 1086, maxWidth, lineHeight);

      // 底部
      ctx.fillStyle = '#7A6E6E';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('内心画派｜趣味探索', 540, 1360);

      // 导出
      canvas.toBlob((blob) => {
        if (!blob) {
          setExportStatus('error');
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `内心画派_${style.name}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setExportStatus('success');
        setTimeout(() => setExportStatus('idle'), 2000);
      }, 'image/png');

    } catch (e) {
      console.error('Export failed:', e);
      setExportStatus('error');
    }
  };

  // 以 cover 方式把图片绘制进目标矩形（居中裁切）
  function drawCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    const imgRatio = img.width / img.height;
    const boxRatio = w / h;
    let drawW: number;
    let drawH: number;
    if (imgRatio > boxRatio) {
      drawH = h;
      drawW = h * imgRatio;
    } else {
      drawW = w;
      drawH = w / imgRatio;
    }
    const dx = x + (w - drawW) / 2;
    const dy = y + (h - drawH) / 2;
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }

  // 文字换行辅助函数
  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split('');
    let line = '';
    let lines: string[] = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n];
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n];
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // 垂直居中调整
    const totalHeight = lines.length * lineHeight;
    const startY = y - totalHeight / 2 + lineHeight / 2;

    lines.forEach((l, i) => {
      ctx.fillText(l, x, startY + i * lineHeight);
    });
  }

  return (
    <div
      className="modal-overlay share-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="share-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className="modal-close"
          onClick={onClose}
          aria-label="关闭"
        >
          ×
        </button>

        <h2 id="share-title" className="sr-only">
          分享我的艺术卡
        </h2>

        {/* 分享卡预览 */}
        <div className="share-card-wrapper">
          <div ref={cardRef} className="share-card">
            <div className="share-card-brand">
              MeetYourself 探索室
            </div>
            <p className="share-card-eyebrow">THE ART WITHIN</p>

            <div className="share-card-frame">
              <div className="share-card-frame-inner">
                {style.imagePath && (
                  <img
                    className="share-card-art"
                    src={style.imagePath}
                    alt=""
                    draggable={false}
                  />
                )}
              </div>
            </div>

            <div className="share-card-info">
              <h3 className="share-card-name">{style.name}</h3>
              {style.englishName && (
                <p className="share-card-en">{style.englishName}</p>
              )}
              <p className="share-card-motto">{style.motto}</p>
              <p className="share-card-summary">{style.summary}</p>
            </div>

            <div className="share-card-footer">
              内心画派｜趣味探索
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="share-actions">
          <button
            className="btn-primary"
            onClick={handleExport}
            disabled={exportStatus === 'loading'}
          >
            {exportStatus === 'loading' && '保存中…'}
            {exportStatus === 'success' && '已保存 ✓'}
            {exportStatus === 'error' && '保存失败，重试'}
            {exportStatus === 'idle' && '保存图片'}
          </button>
          <button className="btn-secondary" onClick={onClose}>
            关闭
          </button>
        </div>

        {exportStatus === 'error' && (
          <p className="share-error caption">
            暂时无法保存，可重试或截图
          </p>
        )}
      </div>
    </div>
  );
};

export default ShareCard;
