import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, Github, Mail } from 'lucide-react';
import ThemeSwitcher from './components/ThemeSwitcher';
import { getAvatarUrl } from './utils/avatarService';
import { applyFavicon } from './utils/faviconService';
import { getSolarThemeSchedule, type Theme } from './utils/solarTheme';
import { getVisitorLocation, type VisitorLocation } from './utils/ipLocationService';

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
    name: 'Decision Companion',
    description: '人生决策伙伴 Agent，基于 Java 与 Spring AI，面向人生选择、日常困惑与长期自我理解场景。',
    tags: ['Java', 'Spring AI', 'Agent'],
    href: 'https://github.com/Sky-Sheepfold/decision-companion',
    status: '进行中',
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
    items: ['Git', 'Docker', 'Linux', 'Maven'],
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

type HeroScene = 'day' | 'night';

const heroVisuals: Record<HeroScene, { src: string; alt: string }> = {
  day: {
    src: '/images/hero-workspace-developer.png',
    alt: '像素风开发桌面，开发者坐在代码屏幕前，窗外是天空与城市，桌面上有 AI 工作流线索',
  },
  night: {
    src: '/images/hero-workspace-developer-night.png',
    alt: '夜间像素风开发桌面，开发者坐在代码屏幕前，窗外是月光城市，桌面上有 AI 工作流线索',
  },
};

function App() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [solarLocation, setSolarLocation] = useState<VisitorLocation | null>(null);
  const [theme, setTheme] = useState<Theme>(() => getSolarThemeSchedule().theme);
  const hasManualTheme = useRef(false);
  const heroScene = theme === 'dark' ? 'night' : 'day';
  const activeHeroVisual = heroVisuals[heroScene];

  useEffect(() => {
    applyFavicon();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (solarLocation) {
      document.documentElement.setAttribute('data-solar-location-source', solarLocation.source);
    }
  }, [solarLocation]);

  useEffect(() => {
    let isMounted = true;

    async function syncVisitorLocation() {
      const location = await getVisitorLocation();
      if (isMounted) {
        setSolarLocation(location);
      }
    }

    syncVisitorLocation();

    return () => {
      isMounted = false;
    };
  }, []);

    useEffect(() => {
    let timeoutId: number;

    const scheduleNextSolarTransition = (isBoundaryTransition = false) => {
      const schedule = getSolarThemeSchedule(new Date(), solarLocation ?? undefined);

      if (isBoundaryTransition || !hasManualTheme.current) {
        hasManualTheme.current = false;
        setTheme(schedule.theme);
      }

      const transitionDelay = Math.max(schedule.nextTransition.getTime() - Date.now() + 1000, 1000);
      timeoutId = window.setTimeout(() => scheduleNextSolarTransition(true), transitionDelay);
    };

    scheduleNextSolarTransition();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [solarLocation]);

  useEffect(() => {
    Object.values(heroVisuals).forEach((visual) => {
      const image = new Image();
      image.src = visual.src;
    });
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

  const handleThemeChange = (nextTheme: Theme) => {
    hasManualTheme.current = true;
    setTheme(nextTheme);
  };

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
          <a href="#projects">项目</a>
          <a href="#stack">技能</a>
          <a href="#contact">联系</a>
        </nav>

        <ThemeSwitcher theme={theme} onThemeChange={handleThemeChange} />
      </header>

      <section id="top" className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>软件工程在读</span>
            <span>专注 Java 后端与 AI 应用落地</span>
          </h1>
          <div className="hero-body">
            <p>
              我是码上天空，喜欢用代码把想法变成现实。最近在做智能求职辅助平台，也在探索
              AI Agent 如何成为更懂人的决策伙伴。
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

        <div className="hero-media" data-hero-scene={heroScene} aria-label={activeHeroVisual.alt}>
          {(Object.entries(heroVisuals) as Array<[HeroScene, (typeof heroVisuals)[HeroScene]]>).map(
            ([scene, visual]) => {
              const isActive = scene === heroScene;
              return (
                <img
                  key={scene}
                  className={isActive ? 'hero-image is-active' : 'hero-image'}
                  src={visual.src}
                  alt={isActive ? visual.alt : ''}
                  aria-hidden={!isActive}
                  loading="eager"
                  decoding="async"
                />
              );
            }
          )}
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
