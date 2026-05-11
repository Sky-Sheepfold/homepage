import { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const KNOWLEDGE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['你好', '嗨', 'hi', 'hello', '你是谁', '介绍'],
    answer:
      '你好！我是天空的数字分身，可以帮你了解天空的信息。你可以问我关于他的技术栈、项目经历、求职方向等问题～',
  },
  {
    keywords: ['做什么', '在做什么', '最近', '当前', '现在'],
    answer:
      '天空目前主要在做两件事：\n1. 「青云职上」— 一个智能求职辅助平台，帮助求职者优化简历、模拟面试等\n2. Personal AI Workspace Agent — 研究 AI Agent 在个人工作流中的应用',
  },
  {
    keywords: ['联系', '邮箱', 'email', '微信', '怎么找你'],
    answer:
      '你可以通过邮箱 sky@example.com 联系天空，也可以在 GitHub 上找到他。欢迎交流！',
  },
  {
    keywords: ['技术栈', '技术', '会什么', '擅长', '技能', 'stack'],
    answer:
      '天空的主要技术栈：\n• 后端：Java / Spring Boot / MyBatis-Plus\n• 数据库：MySQL / Redis\n• AI 应用：LangChain4j / Prompt Engineering\n• 工具：Git / Docker / Linux\n• 前端基础：React / TypeScript',
  },
  {
    keywords: ['青云', '求职', '平台', '项目', 'qingyun'],
    answer:
      '「青云职上」是天空主导开发的智能求职辅助平台，核心功能包括：\n• AI 简历优化 — 根据岗位 JD 智能调整简历\n• 模拟面试 — AI 驱动的面试练习\n• 求职进度管理 — 追踪投递和面试状态\n技术栈：Spring Boot + MySQL + Redis + AI 接口集成',
  },
  {
    keywords: ['实习', '找工作', '求职方向', '方向', '岗位'],
    answer:
      '天空正在寻找 Java 后端开发 或 AI 应用方向 的实习机会。他目前是重庆某高校软件工程专业大三学生，可以尽快到岗。',
  },
  {
    keywords: ['学校', '大学', '学历', '教育', '哪里人'],
    answer:
      '天空是重庆某高校软件工程专业大三在读学生，对后端开发和 AI 应用有浓厚兴趣和实战经验。',
  },
  {
    keywords: ['agent', 'ai', '智能体', 'workspace'],
    answer:
      '天空在研究 AI Agent 的实际应用，特别是 Personal AI Workspace Agent — 让 AI Agent 帮助管理日常开发工作流，比如自动化任务调度、信息整理、代码辅助等。他相信 AI Agent 是未来开发者的标配工具。',
  },
  {
    keywords: ['兴趣', '爱好', '喜欢', '平时'],
    answer:
      '天空的兴趣：\n• AI 应用开发 — 把 AI 能力融入实际产品\n• 折腾新技术 — 什么都想试试\n• 记录生活 — 用代码和文字留下痕迹\n他的座右铭：万物皆可写代码解决',
  },
];

const SUGGESTIONS = ['你现在在做什么？', '你的技术栈是什么？', '青云职上是什么项目？', '你在找什么方向的实习？'];

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const item of KNOWLEDGE) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return item.answer;
    }
  }
  return '这个问题我暂时还不太确定怎么回答，你可以换个方式问问，或者直接联系天空本人哦～';
}

function TypingDots() {
  return (
    <span className="inline-flex gap-0.5">
      <span className="w-1.5 h-1.5 theme-primary-dark rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 theme-primary-dark rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 theme-primary-dark rounded-full animate-bounce [animation-delay:300ms]" />
    </span>
  );
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: '你好！我是天空的数字分身，有什么想了解的可以直接问我～',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput('');

    const userMsg: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const reply = getReply(content);
      setMessages((prev) => [...prev, { role: 'bot', content: reply }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <img src="/avatars/mark-grayson-291814.png" alt="数字分身" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-sm font-semibold theme-text">数字分身</h2>
          <p className="text-[10px] theme-text-muted">在线</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'bot' && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden">
                <img src="/avatars/mark-grayson-291814.png" alt="Bot" className="w-full h-full object-cover" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed border ${msg.role === 'bot'
                ? 'bg-white theme-text theme-border rounded-tl-sm'
                : 'theme-primary-dark text-white rounded-tr-sm border-transparent'
                }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full theme-primary-dark flex items-center justify-center mt-0.5">
                <User size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden">
              <img src="/avatars/mark-grayson-291814.png" alt="Bot" className="w-full h-full object-cover" />
            </div>
            <div className="px-4 py-3 bg-white border theme-border rounded-2xl rounded-tl-sm">
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="px-3 py-1.5 text-xs font-medium theme-text bg-white border theme-border rounded-full hover:theme-primary transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="问点什么..."
          className="flex-1 px-4 py-2.5 text-sm bg-white border theme-border rounded-full theme-text placeholder:theme-text-muted focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary-dark)] transition-all"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="flex-shrink-0 w-10 h-10 rounded-full theme-primary-dark flex items-center justify-center hover:opacity-90 disabled:opacity-30 disabled:hover:opacity-30 transition-opacity"
        >
          <Send size={16} className="text-white" />
        </button>
      </div>
    </section>
  );
}
