import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Command,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Shield,
  Sun,
  X,
} from 'lucide-react'
import { education, profile, projects, services, skills } from './data'

const navItems = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Journey', '#journey'],
  ['Contact', '#contact'],
] as const

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <div className="section-heading__row">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  )
}

function Header({
  theme,
  onToggleTheme,
}: {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label={`${profile.name}, home`}>
        <span className="wordmark__mark"><Command size={17} strokeWidth={2.2} /></span>
        <span>uqail<span className="wordmark__period">.</span></span>
      </a>

      <nav id="mobile-navigation" className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <div className="mobile-theme">
          <span>Appearance</span>
          <ThemeButton theme={theme} onToggle={onToggleTheme} />
        </div>
      </nav>

      <div className="header-actions">
        <ThemeButton theme={theme} onToggle={onToggleTheme} />
        <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

function ThemeButton({
  theme,
  onToggle,
}: {
  theme: 'light' | 'dark'
  onToggle: () => void
}) {
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  )
}

function Hero() {
  return (
    <section className="hero page-shell" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <Reveal>
          <div className="availability"><span /> Open to learning & opportunities</div>
          <p className="hero-kicker">CYBERSECURITY <span>·</span> SOFTWARE <span>·</span> CURIOSITY</p>
          <h1 id="hero-title">Security-minded.<br /> <span>Always curious.</span></h1>
          <p className="hero-intro">
            Hey, I’m <strong>{profile.name.split(' ')[0]}</strong> — a cybersecurity undergraduate and former technology student, interested in making the digital world a little more thoughtful and a lot more secure.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a>
            <a className="button button--quiet" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-socials" aria-label="Social links">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a>
            <span className="social-divider" />
            <span className="hero-location">{profile.location}</span>
          </div>
        </Reveal>
      </div>

      <Reveal className="hero-art" delay={0.12}>
        <div className="hero-art__frame">
          <img src="/profile-placeholder.svg" alt="Uqail Shakir portrait" />
          <div className="hero-art__corner hero-art__corner--tl" />
          <div className="hero-art__corner hero-art__corner--br" />
          <div className="portrait-label"><span>PROFILE / 001</span><span>CYBERSEC // DEV</span></div>
          <div className="hero-note">
            <span className="hero-note__icon"><Shield size={17} /></span>
            <span><strong>Learn. Build. Secure.</strong><small>A work in progress, by design.</small></span>
          </div>
          <span className="hero-index">01 — 04</span>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span>SECURITY IS A PRACTICE · NOT A PRODUCT · </span></div>
      </Reveal>
      <a href="#about" className="scroll-cue"><ArrowDown size={15} /> SCROLL TO EXPLORE</a>
    </section>
  )
}

function About() {
  return (
    <section className="section page-shell about-section" id="about">
      <Reveal><SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Curious by nature.<br /><span>Security by choice.</span></>} intro="I like understanding how things work — especially the parts most people never see." /></Reveal>
      <div className="about-grid">
        <Reveal className="about-note">
          <span className="mono-label">THE SHORT VERSION</span>
          <p>I’m studying cybersecurity after exploring the wider world of technology. That change in perspective taught me to look beyond what software does — and ask what it protects, who it serves, and how it could be better.</p>
          <p>Today, I’m building my foundations across digital security and software development, one deliberate project and one good question at a time.</p>
          <a className="text-link" href="#contact">A little more about my path <ArrowRight size={15} /></a>
        </Reveal>
        <Reveal className="about-aside" delay={0.08}>
          <div className="about-aside__index">A / 01</div>
          <h3>What keeps me<br />asking questions?</h3>
          <div className="interest-list">
            <span>How systems fail — and recover</span>
            <span>Making complex ideas feel clear</span>
            <span>Building things people can trust</span>
          </div>
          <p className="about-goal"><span>LOOKING AHEAD</span> Grow into a thoughtful security professional who builds with empathy, rigor, and a healthy dose of curiosity.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section page-shell skills-section" id="skills">
      <Reveal><SectionHeading eyebrow="CURRENT TOOLKIT" title={<>Foundations first.<br /><span>Always learning.</span></>} intro="A snapshot of what I’m learning and working with right now. This list will keep evolving." /></Reveal>
      <div className="skills-grid">
        {skills.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.07} className="skill-card">
            <div className="skill-card__top"><span>{group.number} / 03</span><ArrowUpRight size={17} /></div>
            <h3>{group.category}</h3>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </Reveal>
        ))}
      </div>
      <p className="skills-footnote"><span /> Listed as learning areas, not professional certifications.</p>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="project-card">
      <a className={`project-visual ${project.visual}`} href={project.demo} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} demo`}>
        <div className="project-visual__top"><span>{project.type}</span><ArrowUpRight size={17} /></div>
        {project.visual.includes('shield') ? (
          <div className="shield-art" aria-hidden="true">
            <div className="shield-art__ring shield-art__ring--outer" />
            <div className="shield-art__ring shield-art__ring--inner" />
            <div className="shield-art__symbol"><Shield size={48} strokeWidth={1.1} /></div>
            <span className="shield-art__caption">TRUST / BY / DESIGN</span>
          </div>
        ) : (
          <div className="signal-art" aria-hidden="true">
            <div className="signal-art__line"><span /><span /><span /><span /><span /><span /><span /></div>
            <div className="signal-art__readout"><span>01 / SIGNAL</span><span>●●●○○</span></div>
            <div className="signal-art__readout"><span>02 / RESPONSE</span><span>●●●●○</span></div>
            <span className="signal-art__mark">S / N</span>
          </div>
        )}
        <span className="project-visual__hint">SAMPLE CONCEPT — REPLACE WITH YOUR PROJECT</span>
      </a>
      <div className="project-card__body">
        <div className="project-title-row"><span className="project-number">{project.number}</span><h3>{project.title}</h3><ArrowDownRight size={18} /></div>
        <p>{project.description}</p>
        <div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer"><Github size={15} /> Source code <ArrowUpRight size={13} /></a>
          <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section className="section page-shell projects-section" id="projects">
      <Reveal><SectionHeading eyebrow="SELECTED WORK" title={<>Ideas made<br /><span>a little more real.</span></>} intro="A starting point for the work you’ll want to share. These sample cards are placeholders — swap in your real projects when you’re ready." /></Reveal>
      <div className="projects-grid">{projects.map((project, index) => <Reveal key={project.number} delay={index * 0.1}><ProjectCard project={project} /></Reveal>)}</div>
      <div className="projects-footer"><span>MORE TO COME, ONE GOOD IDEA AT A TIME.</span><a href={profile.github} target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={15} /></a></div>
    </section>
  )
}

function Journey() {
  return (
    <section className="section page-shell journey-section" id="journey">
      <Reveal><SectionHeading eyebrow="THE JOURNEY SO FAR" title={<>A path shaped by<br /><span>good questions.</span></>} intro="Every next step starts with what came before. The details here are placeholders to make your timeline easy to personalize." /></Reveal>
      <div className="journey-grid">
        <div className="timeline">
          {education.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.09} className={`timeline-item${item.current ? ' timeline-item--current' : ''}`}>
              <div className="timeline-marker"><span /></div>
              <span className="timeline-period">{item.period}</span>
              <h3>{item.title}</h3>
              <span className="timeline-detail">{item.detail}</span>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="journey-card">
          <span className="mono-label">A NOTE TO FUTURE ME</span>
          <div className="journey-card__icon"><Shield size={23} /></div>
          <blockquote>“Stay curious enough to ask why, and patient enough to find out.”</blockquote>
          <span className="journey-card__caption">A GOOD PRINCIPLE TO KEEP CLOSE</span>
          <div className="journey-card__line" />
        </Reveal>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section page-shell services-section" id="services">
      <Reveal><SectionHeading eyebrow="WAYS I CAN HELP" title={<>Good work starts<br /><span>with a conversation.</span></>} intro="A few areas I’m interested in contributing to. Reach out and we can figure out whether it’s a fit." /></Reveal>
      <div className="services-list">
        {services.map((service, index) => (
          <Reveal key={service.number} delay={index * 0.06} className="service-row">
            <span className="service-number">{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href="#contact" aria-label={`Ask about ${service.title}`}><ArrowUpRight size={19} /></a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Portfolio hello from ${name}`)
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="section page-shell contact-section" id="contact">
      <Reveal><SectionHeading eyebrow="LET’S CONNECT" title={<>Have a good one<br /><span>in mind?</span></>} intro="A project, an opportunity, or a question about something I’m learning — I’d love to hear from you." /></Reveal>
      <div className="contact-grid">
        <Reveal className="contact-aside">
          <span className="mono-label">THE INBOX IS OPEN</span>
          <p>Drop a note, tell me what you’re working on, and let’s see where the conversation goes.</p>
          <button className="email-copy" type="button" onClick={copyEmail}>
            <Mail size={17} /><span>{profile.email}</span>{copied ? <Check size={15} /> : <ArrowUpRight size={15} />}
          </button>
          <div className="contact-socials">
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a>
          </div>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={0.08}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" type="text" placeholder="What should I call you?" autoComplete="name" required />
            <label htmlFor="contact-email">Email address</label>
            <input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            <label htmlFor="contact-message">A little about your note</label>
            <textarea id="contact-message" name="message" placeholder="What's on your mind?" rows={4} required />
            <div className="form-bottom">
              <p>{sent ? 'Your email app should open with your message ready to send.' : 'This form opens your email app — no data is stored here.'}</p>
              <button type="submit" className="button button--primary">Say hello <ArrowUpRight size={16} /></button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer page-shell">
      <a className="wordmark" href="#home"><span className="wordmark__mark"><Command size={16} /></span><span>uqail<span className="wordmark__period">.</span></span></a>
      <span className="footer-note">Made with curiosity, and a little care.</span>
      <nav aria-label="Footer navigation">{navItems.slice(0, 4).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <span className="footer-copyright">© {new Date().getFullYear()} {profile.name}. All good things reserved.</span>
      <a className="back-top" href="#home">Back to top <ArrowUpRight size={14} /></a>
    </footer>
  )
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light')

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Services />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>
        <motion.div className="ambient-glow" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} />
      </AnimatePresence>
    </div>
  )
}

export default App
