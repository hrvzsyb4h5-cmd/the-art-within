import type { Question, StyleCode, OptionLetter } from './types';

// 评分映射表：题号 -> A/B/C/D 对应风格
const scoringMap: Record<number, Record<Exclude<OptionLetter, 'E'>, StyleCode>> = {
  1: { A: 'IM', B: 'RE', C: 'MI', D: 'SU' },
  2: { A: 'AN', B: 'PT', C: 'FA', D: 'SY' },
  3: { A: 'RE', B: 'EX', C: 'CU', D: 'PO' },
  4: { A: 'RO', B: 'IM', C: 'AE', D: 'MI' },
  5: { A: 'SU', B: 'SY', C: 'AE', D: 'RO' },
  6: { A: 'CU', B: 'PO', C: 'RE', D: 'FA' },
  7: { A: 'IM', B: 'PT', C: 'AN', D: 'EX' },
  8: { A: 'MI', B: 'SY', C: 'SU', D: 'RO' },
  9: { A: 'CU', B: 'RE', C: 'PO', D: 'AE' },
  10: { A: 'FA', B: 'AN', C: 'MI', D: 'PT' },
  11: { A: 'RE', B: 'IM', C: 'EX', D: 'SY' },
  12: { A: 'CU', B: 'SU', C: 'PO', D: 'AE' },
  13: { A: 'IM', B: 'RE', C: 'MI', D: 'RO' },
  14: { A: 'EX', B: 'SY', C: 'AE', D: 'RE' },
  15: { A: 'PT', B: 'AN', C: 'PO', D: 'RO' },
  16: { A: 'CU', B: 'RE', C: 'MI', D: 'EX' },
  17: { A: 'AE', B: 'SU', C: 'FA', D: 'PT' },
  18: { A: 'IM', B: 'RE', C: 'SY', D: 'RO' },
  19: { A: 'AN', B: 'PO', C: 'MI', D: 'FA' },
  20: { A: 'CU', B: 'SY', C: 'SU', D: 'EX' },
  21: { A: 'RE', B: 'PT', C: 'AE', D: 'FA' },
  22: { A: 'MI', B: 'AN', C: 'PO', D: 'CU' },
  23: { A: 'IM', B: 'RE', C: 'RO', D: 'SY' },
  24: { A: 'SU', B: 'CU', C: 'AE', D: 'PO' },
  25: { A: 'MI', B: 'PT', C: 'AN', D: 'EX' },
  26: { A: 'IM', B: 'RE', C: 'SU', D: 'RO' },
  27: { A: 'FA', B: 'MI', C: 'AE', D: 'SY' },
  28: { A: 'CU', B: 'PO', C: 'SU', D: 'PT' },
  29: { A: 'IM', B: 'PT', C: 'FA', D: 'EX' },
  30: { A: 'SY', B: 'SU', C: 'RO', D: 'RE' },
  31: { A: 'EX', B: 'AE', C: 'CU', D: 'MI' },
  32: { A: 'AN', B: 'PO', C: 'RE', D: 'IM' },
  33: { A: 'PT', B: 'AN', C: 'AE', D: 'FA' },
  34: { A: 'RO', B: 'SY', C: 'RE', D: 'EX' },
  35: { A: 'PO', B: 'SU', C: 'CU', D: 'MI' },
  36: { A: 'IM', B: 'FA', C: 'PT', D: 'AE' },
};

interface RawQuestion {
  number: number;
  section: 1 | 2 | 3;
  type: 'visual' | 'life';
  chapterLabel: string;
  prompt: string;
  hint?: string;
  options: { letter: 'A' | 'B' | 'C' | 'D'; text: string }[];
}

const rawQuestions: RawQuestion[] = [
  // 第一部分：你会为怎样的画面停留？（1—12）
  {
    number: 1, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '同样是一扇窗，你更想把哪幅画挂在身边？',
    hint: '选更想停留欣赏的一幅',
    options: [
      { letter: 'A', text: '光落在窗帘上，颜色随空气轻轻变化。' },
      { letter: 'B', text: '窗框、杯子和窗外街道，都保留具体的生活细节。' },
      { letter: 'C', text: '窗框与墙面被简化，只留几条线和一块光。' },
      { letter: 'D', text: '窗外不是街道，而是一片漂浮着鱼的天空。' },
    ],
  },
  {
    number: 2, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '四幅花的画面，你更愿意反复看哪幅？',
    options: [
      { letter: 'A', text: '枝叶弯成连续曲线，花瓶与边框也相互呼应。' },
      { letter: 'B', text: '花朵由细小色点组成，近看与远看各有趣味。' },
      { letter: 'C', text: '花瓣用了不写实的鲜亮颜色，对比大胆。' },
      { letter: 'D', text: '花旁留着一把钥匙，让人猜它们之间的关系。' },
    ],
  },
  {
    number: 3, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '同样是一个人的肖像，哪种处理更吸引你？',
    options: [
      { letter: 'A', text: '保留表情和面部细节，像看见一个真实的人。' },
      { letter: 'B', text: '五官和轮廓略有变形，让情绪格外鲜明。' },
      { letter: 'C', text: '正面与侧面的角度同时出现在画面里。' },
      { letter: 'D', text: '同一张脸被重复排列，换上不同的鲜明色彩。' },
    ],
  },
  {
    number: 4, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '四幅海景，你更想在何处停留？',
    options: [
      { letter: 'A', text: '巨浪与渺小的人物相对，场面带来强烈感受。' },
      { letter: 'B', text: '海面闪着碎光，几乎能感觉到风与湿度。' },
      { letter: 'C', text: '海被处理成大块色面，笔触留下运动的痕迹。' },
      { letter: 'D', text: '海天被压缩为简单色带，画面安静而清楚。' },
    ],
  },
  {
    number: 5, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '如果画一个梦，你更被哪种表达吸引？',
    options: [
      { letter: 'A', text: '房间里的楼梯通向云层，熟悉的东西有了新关系。' },
      { letter: 'B', text: '用鸟、门和灯反复暗示一个没有说完的故事。' },
      { letter: 'C', text: '不出现具体物体，只让线条与色块自由延伸。' },
      { letter: 'D', text: '一个人穿过风暴，走向遥远而明亮的地方。' },
    ],
  },
  {
    number: 6, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '同样表现一条街，你更喜欢哪种版本？',
    options: [
      { letter: 'A', text: '把街道画成分解重组的平面，几个角度同时出现。' },
      { letter: 'B', text: '招牌、包装和广告图像组成节奏鲜明的画面。' },
      { letter: 'C', text: '店铺、行人和路面痕迹让地点显得具体而真实。' },
      { letter: 'D', text: '街上的人和建筑用高反差色彩表现，不拘泥本来的颜色。' },
    ],
  },
  {
    number: 7, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '近看画面时，哪种细节更让你想继续看？',
    options: [
      { letter: 'A', text: '一笔笔颜色交错，留下光影变化的感觉。' },
      { letter: 'B', text: '小色点经过排列，远看时组成新的颜色与形状。' },
      { letter: 'C', text: '弯曲线条连接花叶，装饰细节有连续的节奏。' },
      { letter: 'D', text: '粗重的线条和变形轮廓，集中表达一种感受。' },
    ],
  },
  {
    number: 8, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '如果为"夜晚"选一幅画，你更喜欢？',
    options: [
      { letter: 'A', text: '几何形状与少量颜色，把夜晚压缩得很简洁。' },
      { letter: 'B', text: '一盏灯、一个影子，似乎暗示着某段故事。' },
      { letter: 'C', text: '月亮落进室内，家具漂浮在空中。' },
      { letter: 'D', text: '风雨中的人物与远处亮光，带着戏剧性的情绪。' },
    ],
  },
  {
    number: 9, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '同样画桌上的杯子，你更喜欢？',
    options: [
      { letter: 'A', text: '把杯子从不同方向拆开，再重组成一幅画。' },
      { letter: 'B', text: '仔细表现杯口磨损、水渍和它原来的样子。' },
      { letter: 'C', text: '把杯子轮廓重复排列，像一张日常物品海报。' },
      { letter: 'D', text: '让杯子退成模糊轮廓，重点看颜料流动的痕迹。' },
    ],
  },
  {
    number: 10, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '为一张封面选视觉，你更倾向？',
    options: [
      { letter: 'A', text: '鲜亮而不写实的配色，让颜色自己成为主角。' },
      { letter: 'B', text: '植物曲线贯穿文字和边框，形成完整装饰。' },
      { letter: 'C', text: '只留下一个简洁形状与大片空间。' },
      { letter: 'D', text: '用密集小点逐渐构成图案，细看有很多层次。' },
    ],
  },
  {
    number: 11, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '同样表达"想念"，哪幅画更能吸引你？',
    options: [
      { letter: 'A', text: '保留一个普通房间的真实陈设，让生活痕迹说话。' },
      { letter: 'B', text: '画下记忆中某个下午的光，轮廓不必完全清楚。' },
      { letter: 'C', text: '用夸张的姿态、线条和色彩，把感受直接推出来。' },
      { letter: 'D', text: '通过一封信、一扇门等物件，留下一些未说出的意思。' },
    ],
  },
  {
    number: 12, section: 1, type: 'visual', chapterLabel: '看见你的偏好',
    prompt: '画面没有唯一答案时，你更喜欢哪种开放感？',
    options: [
      { letter: 'A', text: '几个视角并置，需要自己重新组织关系。' },
      { letter: 'B', text: '物体之间出现不可能的组合，引出各种想象。' },
      { letter: 'C', text: '日常符号被重复或改造，让熟悉的东西变得陌生。' },
      { letter: 'D', text: '没有具体故事，顺着笔触与色块感受变化。' },
    ],
  },
  // 第二部分：你怎样观察和表达生活？（13—28）
  {
    number: 13, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '从一次散步中带回一张照片，你更可能留下？',
    options: [
      { letter: 'A', text: '当时刚好落在墙上的一束光。' },
      { letter: 'B', text: '一个认真做事的人和他周围的环境。' },
      { letter: 'C', text: '形状与颜色特别简洁的一角。' },
      { letter: 'D', text: '让自己感到震撼的远景。' },
    ],
  },
  {
    number: 14, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '想把最近的心情记录下来，你更自然的方式是？',
    options: [
      { letter: 'A', text: '直接写出感受，不急着整理得漂亮。' },
      { letter: 'B', text: '找一个物件或比喻，绕着它慢慢表达。' },
      { letter: 'C', text: '随手画线、涂颜色，让过程带着自己走。' },
      { letter: 'D', text: '写清发生了什么，感受藏在具体经过里。' },
    ],
  },
  {
    number: 15, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '旅行结束后制作一页纪念册，你更想？',
    options: [
      { letter: 'A', text: '按小片段认真整理，让细节慢慢拼成全貌。' },
      { letter: 'B', text: '用花叶、边框和文字做一张完整设计。' },
      { letter: 'C', text: '拼贴车票、包装和路上的标语。' },
      { letter: 'D', text: '把最有情绪的一段经历做成像故事封面的一页。' },
    ],
  },
  {
    number: 16, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '面对一件看法不一致的事，你比较自然的反应是？',
    options: [
      { letter: 'A', text: '尝试把几个人的角度放在一起看。' },
      { letter: 'B', text: '先确认具体发生了什么。' },
      { letter: 'C', text: '找出最关键的问题，把其他干扰先放下。' },
      { letter: 'D', text: '先说清这件事带给自己的感受。' },
    ],
  },
  {
    number: 17, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '空白手账的第一页，你更想怎样开始？',
    options: [
      { letter: 'A', text: '随手留下颜色和笔迹，之后再看它长成什么样。' },
      { letter: 'B', text: '画一个现实里不可能出现的场景。' },
      { letter: 'C', text: '用自己喜欢的鲜亮颜色大胆铺开。' },
      { letter: 'D', text: '先做一些小标记，逐步累积成完整页面。' },
    ],
  },
  {
    number: 18, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '重看过去的记录，哪类内容更让你停留？',
    options: [
      { letter: 'A', text: '当时的光线、天气、气味等感官片段。' },
      { letter: 'B', text: '普通日子里的人和具体事情。' },
      { letter: 'C', text: '自己反复提到的物件、意象和隐喻。' },
      { letter: 'D', text: '曾经非常热烈地相信或追求某件事的时刻。' },
    ],
  },
  {
    number: 19, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '给朋友做一张卡片，你更享受哪个部分？',
    options: [
      { letter: 'A', text: '把文字、边框和图案安排得相互呼应。' },
      { letter: 'B', text: '用彼此熟悉的梗或日常符号重新组合。' },
      { letter: 'C', text: '留下少量但刚好的文字和图形。' },
      { letter: 'D', text: '用不寻常的颜色表达祝福，不一定按真实物体上色。' },
    ],
  },
  {
    number: 20, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '一本书的结尾留有空白，你更喜欢怎样的余味？',
    options: [
      { letter: 'A', text: '线索可以从不同角度重新理解。' },
      { letter: 'B', text: '有些意象像藏着另一层意思。' },
      { letter: 'C', text: '现实和梦的边界始终没有完全说明。' },
      { letter: 'D', text: '人物的感受被强烈地留下，情节未必全部交代。' },
    ],
  },
  {
    number: 21, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '如果有一小时自由创作，你更想？',
    options: [
      { letter: 'A', text: '看着眼前的物件，认真记录它的样子。' },
      { letter: 'B', text: '从一些小单元开始，慢慢完成一个整体。' },
      { letter: 'C', text: '随着手的动作和材料变化，不预设最后的画面。' },
      { letter: 'D', text: '选几个大胆的颜色，试出自己喜欢的碰撞。' },
    ],
  },
  {
    number: 22, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '做一个个人展示页，你更想突出？',
    options: [
      { letter: 'A', text: '简洁结构，让少量内容清楚呈现。' },
      { letter: 'B', text: '图案、字体与细节形成统一装饰。' },
      { letter: 'C', text: '来自日常文化的符号，用自己的方式重新组合。' },
      { letter: 'D', text: '同一件作品的不同面向，让人从多个角度认识它。' },
    ],
  },
  {
    number: 23, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '想向朋友形容一次难忘的经历，你更常从哪里讲起？',
    options: [
      { letter: 'A', text: '当时看见、听见和感觉到的细节。' },
      { letter: 'B', text: '谁做了什么，事情怎样发生。' },
      { letter: 'C', text: '那一刻对自己有多强烈、多重要。' },
      { letter: 'D', text: '一个最能代表这段经历的比喻或物件。' },
    ],
  },
  {
    number: 24, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '遇到一张让你看不懂的画，你更愿意怎样靠近它？',
    options: [
      { letter: 'A', text: '看里面的东西为什么被放在一起，展开想象。' },
      { letter: 'B', text: '顺着形式和角度，尝试重新组织画面。' },
      { letter: 'C', text: '不急着解释，先感受笔触、色块和节奏。' },
      { letter: 'D', text: '留意它用了哪些熟悉的商品或流行图像。' },
    ],
  },
  {
    number: 25, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '一个作品快完成时，你更享受哪一种调整？',
    options: [
      { letter: 'A', text: '删除多余部分，让重点更清楚。' },
      { letter: 'B', text: '微调许多小细节，使整体逐渐成立。' },
      { letter: 'C', text: '让线条和装饰在各个位置相互呼应。' },
      { letter: 'D', text: '加强最关键的情绪，让表达更有力量。' },
    ],
  },
  {
    number: 26, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '同一处景色多次经过，你更可能注意？',
    options: [
      { letter: 'A', text: '不同时间的光，让它看起来总不一样。' },
      { letter: 'B', text: '那里的人和生活发生了哪些具体变化。' },
      { letter: 'C', text: '某个角落像通向另一种想象中的世界。' },
      { letter: 'D', text: '自然与自己的处境相遇时，带来的强烈感受。' },
    ],
  },
  {
    number: 27, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '用颜色表达自己时，你更倾向？',
    options: [
      { letter: 'A', text: '选自己此刻想用的颜色，不受物体原色限制。' },
      { letter: 'B', text: '让少量颜色保持简洁关系。' },
      { letter: 'C', text: '让颜色在涂画过程中逐渐变化，不预先定好。' },
      { letter: 'D', text: '给颜色赋予自己的含义，用它暗示感受。' },
    ],
  },
  {
    number: 28, section: 2, type: 'life', chapterLabel: '你怎样观察生活',
    prompt: '想把熟悉的东西变得新鲜，你更可能？',
    options: [
      { letter: 'A', text: '换几个观看角度，再把它们组合起来。' },
      { letter: 'B', text: '放大、重复或改写一个日常符号。' },
      { letter: 'C', text: '把它放进现实中不可能出现的情境。' },
      { letter: 'D', text: '从细小单元开始，重新组织它的表面和结构。' },
    ],
  },
  // 第三部分：当两种表达都吸引你（29—36）
  {
    number: 29, section: 3, type: 'life', chapterLabel: '当两种表达都吸引你',
    prompt: '两幅画都色彩丰富，你更看重哪一点？',
    options: [
      { letter: 'A', text: '它抓住了某个瞬间的光与空气。' },
      { letter: 'B', text: '它通过小色点的组合形成整体效果。' },
      { letter: 'C', text: '颜色本身足够大胆，不需要符合现实。' },
      { letter: 'D', text: '色彩与变形一起，把感受表达得很强烈。' },
    ],
  },
  {
    number: 30, section: 3, type: 'life', chapterLabel: '当两种表达都吸引你',
    prompt: '一幅画让你觉得有故事，你更想继续追寻？',
    options: [
      { letter: 'A', text: '那些物件可能代表什么。' },
      { letter: 'B', text: '不可能的场景还能引出怎样的想象。' },
      { letter: 'C', text: '人物正在经历怎样强烈的情感与追求。' },
      { letter: 'D', text: '这个普通场景里，真实发生过什么。' },
    ],
  },
  {
    number: 31, section: 3, type: 'life', chapterLabel: '当两种表达都吸引你',
    prompt: '同样不追求写实，你更偏爱？',
    options: [
      { letter: 'A', text: '看得出主题，但情绪改变了它的形状。' },
      { letter: 'B', text: '具体主题逐渐退后，笔触与颜色成为表达。' },
      { letter: 'C', text: '主题被分解，从几个角度重新组织。' },
      { letter: 'D', text: '形式被尽量简化，留下少量关系。' },
    ],
  },
  {
    number: 32, section: 3, type: 'life', chapterLabel: '当两种表达都吸引你',
    prompt: '想让一个日常角落更有自己的味道，你更愿意？',
    options: [
      { letter: 'A', text: '用植物曲线和装饰让各部分形成整体。' },
      { letter: 'B', text: '挑几个日常符号，以重复或拼贴重新呈现。' },
      { letter: 'C', text: '保留物品真实的使用痕迹。' },
      { letter: 'D', text: '根据不同时间的光线调整观看和记录方式。' },
    ],
  },
  {
    number: 33, section: 3, type: 'life', chapterLabel: '当两种表达都吸引你',
    prompt: '创作过程中，哪种满足感更接近你？',
    options: [
      { letter: 'A', text: '许多小步骤终于组成了完整画面。' },
      { letter: 'B', text: '连续线条和细节相互呼应，设计变得完整。' },
      { letter: 'C', text: '即兴留下的痕迹带来了事先想不到的效果。' },
      { letter: 'D', text: '大胆配色让普通事物突然有了活力。' },
    ],
  },
  {
    number: 34, section: 3, type: 'life', chapterLabel: '当两种表达都吸引你',
    prompt: '表达一段重要经历时，你更愿意？',
    options: [
      { letter: 'A', text: '用戏剧性的场景放大它对自己的意义。' },
      { letter: 'B', text: '用几个含义私密的物件，留下暗示。' },
      { letter: 'C', text: '把具体经过和人物保留下来。' },
      { letter: 'D', text: '用夸张的线条与形态直接表达感受。' },
    ],
  },
  {
    number: 35, section: 3, type: 'life', chapterLabel: '当两种表达都吸引你',
    prompt: '四种改造一张普通照片的方法，你更想尝试？',
    options: [
      { letter: 'A', text: '放大并重复其中的日常符号。' },
      { letter: 'B', text: '加入一个不可能出现的物体，改变现实关系。' },
      { letter: 'C', text: '把不同角度拆开，再重组成一张图。' },
      { letter: 'D', text: '删除杂乱信息，只留下简单形状。' },
    ],
  },
  {
    number: 36, section: 3, type: 'life', chapterLabel: '当两种表达都吸引你',
    prompt: '一次创作结束后，哪种体验最让你想再来一次？',
    options: [
      { letter: 'A', text: '捕捉到了一个稍纵即逝的感官瞬间。' },
      { letter: 'B', text: '发现自己能用色彩创造鲜明而自由的画面。' },
      { letter: 'C', text: '零散的小痕迹经过积累，终于产生整体效果。' },
      { letter: 'D', text: '手势与材料带着自己走向意料之外的表达。' },
    ],
  },
];

// 构建完整题目数据，加入E选项和评分映射
// 全部36题均配有选项插图：images/quiz/q01-A.webp … q36-D.webp
export const questions: Question[] = rawQuestions.map((q) => {
  const map = scoringMap[q.number];
  const numStr = String(q.number).padStart(2, '0');
  return {
    id: `q${q.number}`,
    number: q.number,
    section: q.section,
    type: q.type,
    chapterLabel: q.chapterLabel,
    prompt: q.prompt,
    hint: q.hint,
    options: [
      ...q.options.map((opt) => ({
        id: `${q.number}-${opt.letter}`,
        letter: opt.letter as OptionLetter,
        text: opt.text,
        imagePath: `${import.meta.env.BASE_URL}images/quiz/q${numStr}-${opt.letter}.webp`,
        styleCode: map[opt.letter as Exclude<OptionLetter, 'E'>],
      })),
      {
        id: `${q.number}-E`,
        letter: 'E' as OptionLetter,
        text: '都不太像／暂时无法判断',
        styleCode: null,
      },
    ],
  };
});

// 决胜题（并列时使用）
export const tiebreakerQuestion: Question = {
  id: 'tiebreaker',
  number: 0,
  section: 3,
  type: 'tiebreaker',
  chapterLabel: '加赛一题',
  prompt: '如果现在继续体验一种创作，你更想尝试哪一种？',
  hint: '有两个方向都很像你，再选一题就好',
  options: [], // 运行时根据并列类型动态生成
};

// 决胜题各风格对应的创作活动描述
export const tiebreakerOptions: Record<StyleCode, string> = {
  IM: '在不同时间记录同一处光线的变化',
  RO: '把一段强烈的体验做成有戏剧感的画面',
  RE: '认真描绘眼前一个普通物件的真实细节',
  EX: '用夸张的线条和色彩直接画出此刻的感受',
  SU: '画一个现实中不可能出现但充满想象的场景',
  SY: '选几个有隐喻的物件，安排它们的关系',
  FA: '用大胆自由的颜色，不按物体本来的样子画',
  CU: '把同一个物体从几个角度拆开再重组',
  AE: '随着手势和材料的变化，不预设结果地画',
  MI: '尽量删减，只留下最必要的几个形状',
  PO: '重复、放大或改写一个熟悉的日常符号',
  AN: '用植物曲线和连续线条做一张完整装饰',
  PT: '用细小的色点或笔触，慢慢组成一个整体',
};

export default questions;
