import { Github, Mail, type LucideIcon } from 'lucide-react';

export interface QuickLink {
  label: string;
  href: string;
  icon: LucideIcon;
  primary?: boolean;
}

export interface NowItem {
  id: string;
  label: string;
  title: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  details: string[];
  tags: string[];
  href: string;
  status: string;
  year: string;
  plan: string;
}

export interface NoteItem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
}

export interface LifeItem {
  id: string;
  title: string;
  description: string;
}

export interface StackGroup {
  title: string;
  items: string[];
}

export const quickLinks: QuickLink[] = [
  {
    label: 'Email',
    href: 'mailto:yanggq27@gmail.com',
    icon: Mail,
    primary: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Sky-Sheepfold',
    icon: Github,
  },
];

export const nowItems: NowItem[] = [
  {
    id: 'cloudcareer',
    label: '正在做',
    title: '青云职上',
    description: '把简历优化、模拟面试和求职流程管理拆成能落地的智能求职辅助平台。',
  },
  {
    id: 'decision-companion',
    label: '正在探索',
    title: 'Decision Companion',
    description: '基于 Java 与 Spring AI 做人生决策伙伴 Agent，关注长期档案和更懂人的对话。',
  },
  {
    id: 'learning',
    label: '正在学习',
    title: '后端工程与 AI Agent',
    description: '持续补 Spring AI、MCP、Redis、MySQL 和稳定服务设计里的实践细节。',
  },
  {
    id: 'internship',
    label: '当前状态',
    title: '开放实习机会',
    description: '关注 Java 后端开发与 AI 应用落地方向，希望在真实业务里继续打磨工程能力。',
  },
];

export const projects: Project[] = [
  {
    name: '青云职上',
    description: '智能求职辅助平台，聚焦简历优化、模拟面试与求职流程管理。',
    details: [
      '负责后端核心能力设计，围绕用户、简历、岗位和面试练习组织业务流程。',
      '把 AI 能力放进明确的产品链路里，避免停留在单次问答或玩具 Demo。',
      '持续打磨缓存、数据建模和接口边界，让平台具备长期迭代空间。',
    ],
    tags: ['Spring Boot', 'MySQL', 'Redis', 'AI'],
    href: 'https://cloudcareer.me/',
    status: '进行中',
    year: '2026',
    plan: '下一步会继续补齐项目截图、功能拆解和阶段复盘。',
  },
  {
    name: 'Decision Companion',
    description: '人生决策伙伴 Agent，面向人生选择、日常困惑与长期自我理解场景。',
    details: [
      '用 Java 与 Spring AI 搭建 Agent 原型，探索长期记忆、用户档案和决策上下文。',
      '关注“更懂你”的产品体验，而不是只做一次性的建议生成。',
      '把 Prompt、工具调用和后端服务边界拆开，方便后续持续实验。',
    ],
    tags: ['Java', 'Spring AI', 'Agent'],
    href: 'https://github.com/Sky-Sheepfold/decision-companion',
    status: '进行中',
    year: '2026',
    plan: '下一步会沉淀 Agent 设计笔记和关键技术取舍。',
  },
];

export const notes: NoteItem[] = [
  {
    id: 'spring-ai-agent',
    title: 'Spring AI 与 Agent 开发记录',
    category: 'AI 应用',
    description: '记录从接口调用到工具编排、上下文管理、长期记忆的实践过程。',
    status: '整理中',
  },
  {
    id: 'backend-review',
    title: '后端项目复盘笔记',
    category: '工程复盘',
    description: '把项目里的接口边界、缓存策略、数据建模和部署问题写成可回看的经验。',
    status: '持续更新',
  },
  {
    id: 'job-platform',
    title: '智能求职平台产品拆解',
    category: '项目日志',
    description: '围绕简历、岗位、面试和求职进度，记录功能设计背后的判断。',
    status: '草稿中',
  },
];

export const lifeItems: LifeItem[] = [
  {
    id: 'tools',
    title: '常用工具',
    description: '喜欢折腾能节省时间的开发工具，也会把好用的工作流慢慢沉淀下来。',
  },
  {
    id: 'reading',
    title: '最近关注',
    description: 'AI Agent、后端工程、产品设计，以及那些能把复杂问题讲清楚的文章。',
  },
  {
    id: 'motto',
    title: '一句话',
    description: '万物皆可写代码解决，但先想清楚要解决的到底是什么。',
  },
];

export const stackGroups: StackGroup[] = [
  {
    title: '后端工程',
    items: ['Java', 'Spring Boot', 'MyBatis-Plus', 'MySQL', 'Redis'],
  },
  {
    title: 'AI 应用',
    items: ['Spring AI', 'Agent', 'MCP', 'Prompt Engineering', 'AI 接口集成'],
  },
  {
    title: '开发工具',
    items: ['Git', 'Docker', 'Linux', 'Maven'],
  },
];
