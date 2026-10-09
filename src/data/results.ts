import type { StyleResult, StyleCode } from './types';

export const styleResults: Record<StyleCode, StyleResult> = {
  IM: {
    code: 'IM',
    name: '印象主义',
    englishName: 'Impressionism',
    summary: '一束光、一阵风、空气里的温度，都值得你停下来。',
    keywords: ['对光很敏感', '信第一感觉', '记得住瞬间'],
    expression:
      '同样一条街，你记住的往往是那天的光：几点钟、什么天气、空气湿不湿。轮廓清不清楚、有没有结论，你不太在意，当时皮肤和眼睛的反应才算数。所以你留下的东西，多半是些别人容易漏掉的小瞬间。',
    artKnowledge:
      '印象主义兴起于19世纪的法国，画家们走出画室，在户外捕捉不同时刻的光线与氛围。他们不追求细腻的轮廓，而是用快速的笔触和色彩的并置，留下“印象”——一种稍纵即逝却真实的感官体验。',
    masters: '莫奈、雷诺阿',
    masterworks: '《日出·印象》《睡莲》',
    motto: '“今天的光，有点不一样。”',
    weekend: '找个靠窗的位置，一直坐到光线变掉',
    palette: [
      { name: '薄雾蓝', hex: '#AEC6CF' },
      { name: '晨光金', hex: '#F2D398' },
      { name: '莲粉', hex: '#E8B4B8' },
    ],
    bestMatch: 'PT',
    contrastMatch: 'MI',
    dailyPractice:
      '今天挑一个角落（窗台、路口都行），早中晚各看它一眼，拍下来也行。三张照片摆在一起，你会发现根本不是同一个地方。',
  },
  RO: {
    code: 'RO',
    name: '浪漫主义',
    englishName: 'Romanticism',
    summary: '壮阔的风景、炽热的念头，最容易让你心头一热。',
    keywords: ['容易被点燃', '心里有团火', '为热爱上头'],
    expression:
      '你身上有股容易被点燃的劲儿。站在高处、看见大海、听到一段沉甸甸的经历，甚至只是想起某个认真追过的目标，都会起鸡皮疙瘩。平铺直叙地讲一件事对你来说太难了，你总忍不住挑出最烫的那个瞬间，放大了讲。',
    artKnowledge:
      '浪漫主义是18世纪末至19世纪的艺术思潮，强调个人情感、想象力和对自然的敬畏。浪漫主义作品常常充满戏剧张力，用宏大的场面、强烈的明暗对比和充满动感的构图，传达内心深处的激情与追求。',
    masters: '德拉克洛瓦、透纳',
    masterworks: '《自由引导人民》《暴风雪中的汽船》',
    motto: '“人活着，总要为点什么发热。”',
    weekend: '去看海，或听一场让你起鸡皮疙瘩的现场',
    palette: [
      { name: '风暴深蓝', hex: '#2E3A59' },
      { name: '落日橘红', hex: '#C85A3E' },
      { name: '月光米', hex: '#EDE4D3' },
    ],
    bestMatch: 'EX',
    contrastMatch: 'RE',
    dailyPractice:
      '挑一件现在想起来还会心口发热的事，画下来或写下来。别按时间顺序交代，直接从最激烈的那个镜头开始。',
  },
  RE: {
    code: 'RE',
    name: '现实主义',
    englishName: 'Realism',
    summary: '比起观点和概念，你更信具体的人和日子。',
    keywords: ['先问“然后呢”', '细节控', '信不过空话'],
    expression:
      '听人讲一件事，你最先问的往往是“然后呢，具体怎么回事”。一个人的表情、一只杯子的缺口、一件事的前因后果，这些让你觉得踏实。观点谁都会讲，细节却撒不了谎。你宁可老老实实把细节摆出来，也不肯往上拔高度。',
    artKnowledge:
      '现实主义是19世纪的艺术运动，主张如实描绘日常生活和普通人物，而非神话、历史或贵族题材。现实主义艺术家关注社会现实，用细致的观察和扎实的技法，让普通人的生活也能成为艺术的主角。',
    masters: '库尔贝、米勒',
    masterworks: '《拾穗者》《奥尔南的葬礼》',
    motto: '“别急，让事实自己说话。”',
    weekend: '逛老城区，听一个人把他的故事讲完',
    palette: [
      { name: '土褐', hex: '#8A6E52' },
      { name: '烟灰', hex: '#9B958C' },
      { name: '旧墙米', hex: '#E3D9C8' },
    ],
    bestMatch: 'MI',
    contrastMatch: 'SU',
    dailyPractice:
      '今天看看楼下认真做事的人，或者桌上那只用旧的杯子。记下它本来的样子就好，别加滤镜，也别硬安一个意义。',
  },
  EX: {
    code: 'EX',
    name: '表现主义',
    englishName: 'Expressionism',
    summary: '画得像不像不重要，情绪到了最重要。',
    keywords: ['情绪不隔夜', '高兴藏不住', '颜色用最冲的'],
    expression:
      '你高兴和不高兴都藏不太住，也不想藏。画一个人，你可能把他的脸扯歪、把天画成橙红色，像不像无所谓，别人一眼能感到你的情绪，这画就成立。绕弯子、铺垫半天的那种表达，你受不了。',
    artKnowledge:
      '表现主义是20世纪初的艺术流派，强调主观情感的表达而非客观现实的再现。表现主义艺术家常常使用扭曲的形体、粗犷的线条和强烈的色彩，把内心的焦虑、激情或孤独直接呈现在画面上。',
    masters: '蒙克、基希纳',
    masterworks: '《呐喊》《街道》',
    motto: '“情绪到了，别的都好说。”',
    weekend: '去 Livehouse 或 KTV，把情绪痛快喊出来',
    palette: [
      { name: '血红', hex: '#B23A32' },
      { name: '钴蓝', hex: '#2C4D8C' },
      { name: '柠黄', hex: '#E8C83A' },
    ],
    bestMatch: 'RO',
    contrastMatch: 'MI',
    dailyPractice:
      '限时十分钟，只画“我现在的心情”，不许画任何具体东西。笔可以戳、可以拖，颜色不用遵守现实。画完不用解释。',
  },
  SU: {
    code: 'SU',
    name: '超现实主义',
    englishName: 'Surrealism',
    summary: '日常逻辑之外的世界，最让你来劲。',
    keywords: ['脑洞很大', '梦里什么都有', '八竿子打不着'],
    expression:
      '你脑子里常有些没头没尾的画面：鱼在天上游，楼梯长在海里。别人觉得荒诞，你觉得那儿才有意思。规则和因果在你这儿只是参考线，随时可以擦掉。你讲事也爱拐个弯，把两个八竿子打不着的东西搁一块儿，等人发现其中的妙处。',
    artKnowledge:
      '超现实主义是20世纪的艺术与文学运动，受弗洛伊德潜意识理论影响。超现实主义艺术家把日常物品放在不合逻辑的场景里，制造梦境般的画面，试图释放潜意识中的想象，打破理性对思维的束缚。',
    masters: '达利、马格利特、米罗',
    masterworks: '《记忆的永恒》《形象的叛逆》',
    motto: '“为什么不可以？”',
    weekend: '逛旧货市场，给三件废物编一个共同的故事',
    palette: [
      { name: '梦境紫', hex: '#7E6BB0' },
      { name: '深海青', hex: '#2F6E73' },
      { name: '云白', hex: '#F3EEF7' },
    ],
    bestMatch: 'SY',
    contrastMatch: 'RE',
    dailyPractice:
      '随手抓三样东西，比如钥匙、袜子和一杯水，把它们放进一个现实里不可能发生的场景，画下来或写下来。不用解释，越没道理越好。',
  },
  SY: {
    code: 'SY',
    name: '象征主义',
    englishName: 'Symbolism',
    summary: '意思说尽了就没意思了，你偏爱话里有话。',
    keywords: ['话只说七分', '爱用物件抒情', '喜欢留白'],
    expression:
      '你很少把话说到十分。想一个人，你可能写“今天路过一家旧书店”；难过，就画一扇关着的门。物件和场景替你说话，读到的人各自带走各自的版本。那种一眼望到底的表达，你觉得没味道。',
    artKnowledge:
      '象征主义是19世纪末的艺术与文学思潮，反对写实与直白，主张用意象、隐喻和暗示表达内心世界和不可见的真实。象征主义作品中，具体的事物往往承载着超越自身的含义，画面充满诗意与神秘感。',
    masters: '慕夏、克里姆特、莫罗',
    masterworks: '《吻》《白日梦》',
    motto: '“懂的人，自然会懂。”',
    weekend: '一个人看一部慢电影，不跟任何人解释结局',
    palette: [
      { name: '暮金', hex: '#A8843B' },
      { name: '墨紫', hex: '#4A3B52' },
      { name: '月白', hex: '#E9E4DA' },
    ],
    bestMatch: 'SU',
    contrastMatch: 'PO',
    dailyPractice:
      '挑一件带着故事的小物件（票根、旧钥匙都行），画它或写它，但不许交代它的来历。看它自己能说出多少。',
  },
  FA: {
    code: 'FA',
    name: '野兽派',
    englishName: 'Fauvism',
    summary: '天可以是绿的，脸可以是蓝的，颜色听你的。',
    keywords: ['颜色听心情的', '敢用撞色', '拒绝灰扑扑'],
    expression:
      '你调色盘里的颜色不太服从现实。草不一定绿，海不一定蓝，心情是什么颜色，东西就可以是什么颜色。灰扑扑、老老实实的固有色让你提不起劲；亮的、冲的、敢撞在一起的，才像你要说的话。',
    artKnowledge:
      '野兽派是20世纪初的艺术流派，以大胆、自由、不写实的用色著称。艺术家们放弃了传统的光影与固有色，用强烈的、情绪化的色彩直接表达感受。“野兽”这个名字，来自当年评论家一句带刺的调侃。',
    masters: '马蒂斯、德兰',
    masterworks: '《舞蹈》《红色的和谐》',
    motto: '“颜色的事，心情说了算。”',
    weekend: '穿最大胆的颜色出门，不用考虑搭不搭',
    palette: [
      { name: '品红', hex: '#D63D82' },
      { name: '钴蓝', hex: '#2E63C8' },
      { name: '亮橙', hex: '#F28A2E' },
    ],
    bestMatch: 'AE',
    contrastMatch: 'CU',
    dailyPractice:
      '就画桌上的杯子，但不许用它本来的颜色。先问自己：我今天是什么颜色？然后用那个颜色把它画完。',
  },
  CU: {
    code: 'CU',
    name: '立体主义',
    englishName: 'Cubism',
    summary: '一件事只看一面，你总觉得不够。',
    keywords: ['爱绕到背面看', '能同时理解两边', '先拆开再说'],
    expression:
      '你很少相信“一面之词”。一个人、一件事，正面看完还想绕到侧面、背面去看看。吵起架来你甚至能同时理解两边，这有时让你显得犹豫，但你知道，只挑一个角度讲出来的故事都是残的。所以你表达时，总忍不住把几个切面都摆出来。',
    artKnowledge:
      '立体主义是20世纪初由毕加索和布拉克开创的艺术流派。艺术家们打破传统的单一透视，把物体分解成几何切面，再从多个角度同时呈现在画面上，让观者在平面中感受事物的多面性和空间感。',
    masters: '毕加索、布拉克',
    masterworks: '《亚维农少女》《格尔尼卡》',
    motto: '“换个角度，再看看。”',
    weekend: '走一条新路回家，把路过的地方画成俯视图',
    palette: [
      { name: '赭石', hex: '#B5793F' },
      { name: '灰蓝', hex: '#6E7F96' },
      { name: '暖砂', hex: '#E0C9A6' },
    ],
    bestMatch: 'PO',
    contrastMatch: 'FA',
    dailyPractice:
      '找把椅子，正面、侧面、上面各画一遍，然后拼进同一张画里。不用讲透视，看看它会变成什么怪东西。',
  },
  AE: {
    code: 'AE',
    name: '抽象表现主义',
    englishName: 'Abstract Expressionism',
    summary: '比起成品，你更迷创作时手上的那个过程。',
    keywords: ['享受动手本身', '不打草稿', '跟着手感走'],
    expression:
      '你画画有点像跳舞：手怎么动、颜料怎么淌、那一刻身体什么状态，全都留在纸上。事先想好成品再一笔笔填，对你来说像加班。你宁可什么都不计划，让材料和手感带路，走到哪儿算哪儿，惊喜通常都在路上。',
    artKnowledge:
      '抽象表现主义是20世纪中期兴起于美国的艺术运动，强调创作过程中的身体动作、即兴表达和材料的开放性。艺术家不再描绘具体事物，而是通过挥洒的笔触、流动的颜料和大幅画面，直接传达情感和能量。',
    masters: '波洛克、罗斯科',
    masterworks: '《薰衣草之雾》《橙与黄》',
    motto: '“先动起来，答案在路上。”',
    weekend: '什么都不计划地涂鸦半小时，画完不许评价',
    palette: [
      { name: '墨黑', hex: '#2B2826' },
      { name: '滴白', hex: '#F2EEE7' },
      { name: '朱红', hex: '#C8442E' },
    ],
    bestMatch: 'FA',
    contrastMatch: 'AN',
    dailyPractice:
      '准备纸笔，限时十分钟，规则只有两条：不许先想好画什么，不许评判好不好看。结束再看纸上留下了什么。',
  },
  MI: {
    code: 'MI',
    name: '极简主义',
    englishName: 'Minimalism',
    summary: '东西越少，你看得越清楚。',
    keywords: ['能删就删', '一句到位', '讨厌信息过载'],
    expression:
      '收拾房间也好，写东西也好，你的第一反应都是“这个能不能不要”。信息一多你就烦，把废话拿掉、只留最准的那一下，才舒服。别人觉得你冷、你克制，其实你只是相信：说到位的话，一句就够。',
    artKnowledge:
      '极简主义是20世纪60年代的艺术运动，主张艺术应该去除一切多余的表达，回归最基本的形式、材料和空间关系。极简主义作品常常使用简单的几何形状、单一的色彩和工业化的材料，强调客观、冷静和物自身的存在。',
    masters: '唐纳德·贾德、蒙德里安（精神前辈）',
    masterworks: '《无题（堆叠物）》《百老汇爵士乐》',
    motto: '“少即是多，不说第二遍。”',
    weekend: '断舍离一个角落，最后只留三样东西',
    palette: [
      { name: '米白', hex: '#F5F2EC' },
      { name: '水泥灰', hex: '#B8B4AC' },
      { name: '炭黑', hex: '#33312E' },
    ],
    bestMatch: 'CU',
    contrastMatch: 'EX',
    dailyPractice:
      '今天的日记只许写三句，或者只许画三个形状。写完看看，哪些东西其实根本不用存在。',
  },
  PO: {
    code: 'PO',
    name: '波普艺术',
    englishName: 'Pop Art',
    summary: '广告牌、包装纸、群聊老梗，在你手里都是素材。',
    keywords: ['万物皆可素材', '爱玩梗', '雅俗无墙'],
    expression:
      '别人刷手机是在消磨时间，你是在收集素材。包装袋、广告牌、电梯里的洗脑口号、群聊里的老梗，你都觉得好玩。把这些东西放大、复制、换个颜色重新摆，熟悉的玩意儿一下就有了新意思。高雅和通俗之间那道墙，你一直想拆。',
    artKnowledge:
      '波普艺术是20世纪50-60年代的艺术运动，起源于英国和美国。波普艺术家从大众文化、广告、漫画和商品中取材，用复制、拼贴、重复等手法，把日常的流行符号提升为艺术，模糊了高雅与通俗的界限。',
    masters: '沃霍尔、利希滕斯坦',
    masterworks: '《金宝汤罐头》《玛丽莲·梦露双联画》',
    motto: '“万物皆可玩，认真就输了。”',
    weekend: '拍 20 张重复的招牌，拼成一张海报',
    palette: [
      { name: '高饱和红', hex: '#E63946' },
      { name: '电蓝', hex: '#1D7AF0' },
      { name: '明黄', hex: '#FFD23F' },
    ],
    bestMatch: 'CU',
    contrastMatch: 'SY',
    dailyPractice:
      '剪下一个你天天见的标志或标签，重复排上一排，或者给它换个离谱的颜色。看看它会不会变成另一个东西。',
  },
  AN: {
    code: 'AN',
    name: '新艺术运动',
    englishName: 'Art Nouveau',
    summary: '好东西是一个整体，每个细节都得互相打招呼。',
    keywords: ['细节要对话', '迷恋曲线', '整体控'],
    expression:
      '一套搭配、一个房间、一张卡片，只要有哪个细节跟整体“不说话”，你立刻难受。你迷恋藤蔓那样的线条：从一个角长出去，绕一圈，又在另一个角接上。你做东西讲究的不是某个惊艳的点，而是所有部分都待得舒服。',
    artKnowledge:
      '新艺术运动是19世纪末至20世纪初的国际性装饰艺术风格，特点是流动的曲线、自然植物形态和整体化的设计理念。从建筑到家具，从插画到日用品，新艺术运动试图让艺术渗透到生活的每一个角落。',
    masters: '慕夏、吉马德',
    masterworks: '海报《吉斯蒙达》、巴黎地铁入口',
    motto: '“美，藏在每一处呼应里。”',
    weekend: '去植物园速写藤蔓，顺便把本子也装饰一遍',
    palette: [
      { name: '苔绿', hex: '#6F8A63' },
      { name: '古铜金', hex: '#B08D57' },
      { name: '象牙白', hex: '#F1EAD9' },
    ],
    bestMatch: 'SY',
    contrastMatch: 'AE',
    dailyPractice:
      '认真看一种植物五分钟：藤怎么绕，叶子怎么分叉。然后照着它生长的节奏画一张小画，让线条从这头绕到那头，刚好接得上。',
  },
  PT: {
    code: 'PT',
    name: '点彩',
    englishName: 'Pointillism',
    summary: '一个点一个点慢慢来，东西会自己长出来。',
    keywords: ['坐得住', '慢慢来比较快', '享受“长出来”'],
    expression:
      '别人嫌慢的事你坐得住。一个点、一笔、一块拼图，单看什么都不是，你却知道它们都算数。你不急着看成品，反而喜欢隔一会儿抬头，发现东西又比刚才完整了一点。这种“长出来”的过程，有时比结果还过瘾。',
    artKnowledge:
      '点彩是新印象主义的核心技法，由修拉和西涅克在19世纪末发展而来。艺术家不用调色盘混合颜色，而是把纯色的小点密集地排列在画布上，让观者的眼睛在视觉中完成颜色的混合，形成丰富而明亮的效果。',
    masters: '修拉、西涅克',
    masterworks: '《大碗岛的星期天下午》',
    motto: '“慢慢来，点会替你长出来。”',
    weekend: '用彩点填满一整页，不急着看它是什么',
    palette: [
      { name: '嫩绿', hex: '#9FC96B' },
      { name: '湖蓝', hex: '#5DA9C4' },
      { name: '樱粉', hex: '#E8A0B8' },
    ],
    bestMatch: 'IM',
    contrastMatch: 'RO',
    dailyPractice:
      '十分钟，不用线条，只用点，画一个简单形状。留意它大概从第几个点开始，忽然“像了”。',
  },
};

// 结果主视觉图编号映射：images/results/result-01-IM.webp
const resultImageIndex: Record<StyleCode, string> = {
  IM: '01', RO: '02', RE: '03', EX: '04', SU: '05', SY: '06',
  FA: '07', CU: '08', AE: '09', MI: '10', PO: '11', AN: '12', PT: '13',
};

(Object.keys(styleResults) as StyleCode[]).forEach((code) => {
  styleResults[code].imagePath = `${import.meta.env.BASE_URL}images/results/result-${resultImageIndex[code]}-${code}.webp`;
});

export default styleResults;
