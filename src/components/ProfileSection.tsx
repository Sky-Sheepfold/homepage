import { useState, useEffect } from 'react';
import { Code2, Brain, Sparkles, Github, Mail, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAvatarUrl } from '../utils/avatarService';

const infoCards = [
  {
    icon: Code2,
    label: '技术栈',
    value: 'Java / Spring Boot / MySQL / Redis...',
  },
  {
    icon: Brain,
    label: 'AI 方向',
    value: 'AI 应用落地 / Agent 开发',
  },
  {
    icon: Sparkles,
    label: '当前项目',
    value: '青云职上 / Decision Companion',
  },
  {
    icon: BookOpen,
    label: '身份',
    value: '双非 · 找实习中',
  },
];

const links = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Sky-Sheepfold', text: 'Sky-Sheepfold' },
  { icon: Mail, label: '邮箱', href: 'mailto:yanggq27@gmail.com', text: 'yanggq27@gmail.com' },
];

export default function ProfileSection() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    getAvatarUrl().then((url) => setAvatarUrl(url));
  }, []);

  return (
    <section className="flex flex-col items-center text-center">
      <motion.div
        className="relative mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 w-28 h-28 rounded-full bg-gradient-to-br from-[var(--theme-primary-dark)] via-[var(--theme-primary)] to-[var(--theme-primary-light)] blur-sm glow-breathe" />
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[var(--theme-primary-dark)] via-[var(--theme-primary)] to-[var(--theme-primary-light)] p-[3px]">
          {avatarUrl ? (
            <motion.img
              src={avatarUrl}
              alt="Sky-Sheepfold"
              className="w-full h-full rounded-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div className="w-full h-full rounded-full bg-[var(--theme-primary-light)] animate-pulse" />
          )}
        </div>
      </motion.div>

      <h1 className="text-3xl font-bold theme-text tracking-tight">天空</h1>
      <p className="mt-2 text-sm theme-text-muted max-w-[220px]">
        后端开发 / AI 应用 · 喜欢用代码把想法变成现实
      </p>

      <div className="mt-4 flex items-center justify-center gap-3">
        {links.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:opacity-90 transition-opacity theme-primary-dark"
            title={link.label}
          >
            <link.icon size={18} className="text-white" />
          </motion.a>
        ))}
      </div>

      <div className="mt-3 px-3 py-1 theme-primary rounded-full">
        <span className="text-xs font-mono theme-text-muted">万物皆可写代码解决</span>
      </div>

      <div className="mt-6 w-full flex flex-col gap-2">
        {infoCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ x: 4, backgroundColor: 'var(--theme-primary-light)' }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white transition-colors text-left group"
          >
            <motion.div
              className="flex-shrink-0 w-7 h-7 rounded-lg bg-[var(--theme-primary-light)] flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <card.icon size={14} className="theme-text-muted" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium theme-text-muted uppercase tracking-wider">{card.label}</p>
              <p className="text-sm font-medium theme-text">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
