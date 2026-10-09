import { questions } from '../data/questions';

// 已预取记录，避免重复发起请求
const prefetched = new Set<string>();

/**
 * 后台预取某一题的全部选项插图。
 * 利用浏览器空闲时间执行，不与当前题图片抢带宽。
 */
export function prefetchQuestionImages(questionNumber: number): void {
  const run = () => {
    const q = questions.find((item) => item.number === questionNumber);
    if (!q) return;
    q.options.forEach((option) => {
      const path = option.imagePath;
      if (!path || prefetched.has(path)) return;
      prefetched.add(path);
      const img = new Image();
      img.src = path;
    });
  };

  const ric = (window as unknown as {
    requestIdleCallback?: (cb: () => void) => number;
  }).requestIdleCallback;
  if (ric) {
    ric(run);
  } else {
    window.setTimeout(run, 200);
  }
}
