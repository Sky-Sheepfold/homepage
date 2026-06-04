import { useEffect, useState } from 'react';
import { ArrowUpRight, FileText, Github, Mail } from 'lucide-react';
import ThemeSwitcher from './components/ThemeSwitcher';
import { getAvatarUrl } from './utils/avatarService';
import { applyFavicon } from './utils/faviconService';

const projects = [
  {
    name: '青云职上',
    description: '智能求职辅助平台，聚焦简历优化、模拟面试与求职流程管理。',
    tags: ['Spring Boot', 'MySQL', 'Redis', 'AI'],
    href: 'https://cloudcareer.me/',
    status: '进行中',
    year: '2026',
  },
  {
    name: 'AI Workspace Agent',
    description: '探索 AI Agent 在个人开发工作流中的任务调度、信息整理与协作能力。',
    tags: ['Spring AI', 'Agent', 'MCP'],
    href: 'https://github.com/Sky-Sheepfold/Personal-AI-Workspace-Agent/tree/develop',
    status: '研究中',
    year: '2026',
  },
];

const stackGroups = [
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
    items: ['Git', 'Docker', 'Linux', 'React', 'TypeScript'],
  },
];

const quickLinks = [
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
  {
    label: 'Resume',
    href: '#contact',
    icon: FileText,
  },
];

function App() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    applyFavicon();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function syncAvatar() {
      const url = await getAvatarUrl();
      if (isMounted) {
        setAvatarUrl(url);
      }
    }

    syncAvatar();
    const intervalId = window.setInterval(syncAvatar, 10 * 60 * 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="site-shell">
      <header className="site-header" aria-label="主导航">
        <a className="brand" href="#top" aria-label="码上天空首页">
          <span className="brand-avatar" aria-hidden="true">
            {avatarUrl ? <img src={avatarUrl} alt="" /> : <span>码</span>}
          </span>
          <span>
            <span className="brand-name">码上天空</span>
            <span className="brand-role-ticker" aria-label="Java 后端开发，AI 应用落地，正在寻找实习机会">
              <span className="brand-role-track" aria-hidden="true">
                <span>Java 后端开发</span>
                <span>AI 应用落地</span>
                <span>正在寻找实习机会</span>
                <span>Java 后端开发</span>
              </span>
            </span>
          </span>
        </a>

        <nav className="nav-links" aria-label="页面导航">
          <a href="#projects">Projects</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </nav>

        <ThemeSwitcher />
      </header>

      <section id="top" className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>软件工程在读，专注</span>
            <span>Java 后端与 AI 应用落地。</span>
          </h1>
          <div className="hero-body">
            <p>
              我是天空，喜欢用代码把想法变成现实。最近在做智能求职辅助平台，也在探索
              AI Agent 如何进入真实开发工作流。
            </p>
            <p>
              我更在意把技术拆到可执行的产品里：稳定的后端服务、清楚的数据流，以及能真正帮人省时间的 AI 能力。
            </p>
          </div>

          <div className="hero-actions" aria-label="快速联系">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                className={link.primary ? 'button button-primary' : 'button button-secondary'}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <link.icon size={16} aria-hidden="true" />
                <span>{link.label}</span>
                {link.href.startsWith('http') && <ArrowUpRight size={14} aria-hidden="true" />}
              </a>
            ))}
          </div>

          <p className="availability">正在寻找 Java 后端 / AI 应用方向实习机会</p>
        </div>

        <div className="hero-media" aria-label="像素风开发桌面">
          <img src="/images/hero-workspace.png" alt="像素风开发桌面，窗外是天空，桌面上有代码屏幕和 AI 工作流线索" />
        </div>
      </section>

      <section id="projects" className="content-section section-grid" aria-labelledby="projects-title">
        <div>
          <span className="section-kicker">Selected work</span>
          <h2 id="projects-title">项目</h2>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <a
              key={project.name}
              className="project-row"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="project-main">
                <div className="project-heading">
                  <h3>{project.name}</h3>
                  <span>{project.status}</span>
                </div>
                <p>{project.description}</p>
                <ul className="tag-list" aria-label={`${project.name} 技术栈`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <div className="project-meta">
                <span>{project.year}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="stack" className="content-section section-grid" aria-labelledby="stack-title">
        <div>
          <span className="section-kicker">Capabilities</span>
          <h2 id="stack-title">技能</h2>
        </div>

        <div className="stack-grid">
          {stackGroups.map((group) => (
            <div className="stack-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.items.join(' / ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="content-section section-grid contact-section" aria-labelledby="contact-title">
        <div>
          <span className="section-kicker">Contact</span>
          <h2 id="contact-title">联系</h2>
        </div>

        <div className="contact-copy">
          <p>
            如果你正在寻找能快速上手业务、愿意把 AI 能力落到真实产品里的实习生，欢迎联系我。
          </p>
          <div className="contact-links">
            <a href="mailto:yanggq27@gmail.com">
              <Mail size={16} aria-hidden="true" />
              yanggq27@gmail.com
            </a>
            <a href="https://github.com/Sky-Sheepfold" target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden="true" />
              Sky-Sheepfold
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">Designed & built by 码上天空</footer>
    </main>
  );
}

export default App;
