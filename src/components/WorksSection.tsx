import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const works = [
  {
    name: '青云职上',
    description: '智能求职辅助平台，AI 简历分析 + 简历分析 + 模拟面试',
    tags: ['Spring Boot', 'MySQL', 'Redis', 'AI'],
    link: 'https://cloudcareer.me/',
    stats: '进行中',
    year: '2026',
  },
  {
    name: 'AI Workspace Agent',
    description: '研究 AI Agent 在个人工作流中的实际应用，探索智能体协作的可能性',
    tags: ['Spring AI', 'Agent', 'MCP'],
    link: 'https://github.com/Sky-Sheepfold/Personal-AI-Workspace-Agent/tree/develop',
    stats: '研究中',
    year: '2026',
  },
];

export default function WorksSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold theme-text">作品展示</h2>
        <span className="text-xs font-mono theme-text-muted">{works.length} projects</span>
      </div>

      <div className="space-y-3">
        {works.map((work) => (
          <motion.a
            key={work.name}
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="group theme-bg-card rounded-xl p-5 block"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold theme-text group-hover:opacity-80 transition-opacity">
                  {work.name}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-medium theme-primary rounded-full">
                  {work.stats}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono theme-text-muted">{work.year}</span>
                <motion.div
                  animate={{ x: 0, y: 0 }}
                  whileHover={{ x: 2, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight
                    size={16}
                    className="theme-text-muted group-hover:theme-primary transition-colors"
                  />
                </motion.div>
              </div>
            </div>

            <p className="text-sm theme-text-muted mb-4 leading-relaxed">{work.description}</p>

            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="px-2.5 py-1 text-[11px] font-medium theme-bg rounded-lg"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
