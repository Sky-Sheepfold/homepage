import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, Mail } from 'lucide-react';
import ThemeSwitcher from './components/ThemeSwitcher';
import { lifeItems, notes, nowItems, projects, quickLinks, stackGroups } from './content/home';
import { getAvatarUrl } from './utils/avatarService';
import { applyFavicon } from './utils/faviconService';
import { getSolarThemeSchedule, type Theme } from './utils/solarTheme';
import { getVisitorLocation, type VisitorLocation } from './utils/ipLocationService';

type HeroScene = 'day' | 'night';

const brandRoles = ['Java 后端开发', 'AI 应用创造者', '持续记录成长'];

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

function RotatingSubtitle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIsVisible(false);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % brandRoles.length);
        setIsVisible(true);
      }, 180);
    }, 2600);

    return () => {
      window.clearInterval(intervalId);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <span className="brand-role-ticker" aria-label={brandRoles.join('，')}>
      <span className={isVisible ? 'brand-role-line is-visible' : 'brand-role-line'} aria-hidden="true">
        {brandRoles[activeIndex]}
      </span>
    </span>
  );
}

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
            <RotatingSubtitle />
          </span>
        </a>

        <nav className="nav-links" aria-label="页面导航">
          <a href="#now">近况</a>
          <a href="#projects">项目</a>
          <a href="#notes">记录</a>
          <a href="#contact">联系</a>
        </nav>

        <ThemeSwitcher theme={theme} onThemeChange={handleThemeChange} />
      </header>

      <section id="top" className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>软件工程在读</span>
            <span>持续做 Java 后端与 AI 应用项目</span>
          </h1>
          <div className="hero-body">
            <p>
              我是码上天空，喜欢用代码把想法变成现实。最近在做智能求职辅助平台，也在探索
              AI Agent 如何成为更懂人的决策伙伴。
            </p>
            <p>
              这个网站会长期记录我的项目、学习和生活：稳定的后端服务、清楚的数据流，以及能真正帮人省时间的 AI 能力。
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

          <p className="availability">开放 Java 后端 / AI 应用方向实习机会，也欢迎交流项目和想法</p>
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

      <section id="now" className="content-section section-grid" aria-labelledby="now-title">
        <div>
          <span className="section-kicker">Now</span>
          <h2 id="now-title">最近</h2>
        </div>

        <div className="now-grid">
          {nowItems.map((item) => (
            <article className="now-card" key={item.id}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="content-section section-grid" aria-labelledby="projects-title">
        <div>
          <span className="section-kicker">Selected work</span>
          <h2 id="projects-title">项目档案</h2>
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
                <ul className="project-details" aria-label={`${project.name} 项目说明`}>
                  {project.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <ul className="tag-list" aria-label={`${project.name} 技术栈`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <p className="project-plan">{project.plan}</p>
              </div>

              <div className="project-meta">
                <span>{project.year}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="notes" className="content-section section-grid" aria-labelledby="notes-title">
        <div>
          <span className="section-kicker">Notes</span>
          <h2 id="notes-title">学习与复盘</h2>
        </div>

        <div className="notes-layout">
          <div className="notes-list">
            {notes.map((note) => (
              <article className="note-row" key={note.id}>
                <div>
                  <span>{note.category}</span>
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                </div>
                <strong>{note.status}</strong>
              </article>
            ))}
          </div>

          <div className="stack-grid" aria-label="技能栈">
            {stackGroups.map((group) => (
              <div className="stack-group" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.items.join(' / ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="life" className="content-section section-grid" aria-labelledby="life-title">
        <div>
          <span className="section-kicker">Life</span>
          <h2 id="life-title">生活碎片</h2>
        </div>

        <div className="life-grid">
          {lifeItems.map((item) => (
            <article className="life-card" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
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
            如果你想聊项目、AI 应用、后端工程，或者正在寻找能快速上手业务的 Java 后端 / AI 应用方向实习生，欢迎联系我。
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
