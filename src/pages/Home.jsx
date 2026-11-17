import { useState } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/assetPath'
import { projects } from '../components/TechProjects'
import WorldBackground from '../components/WorldBackground'
import '../styles/index-home.css'

const socialLinks = [
  { icon: 'fab fa-linkedin-in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/yanying-zhang-a61943232' },
  { icon: 'fab fa-github', label: 'GitHub', href: 'https://github.com/yyzhangggg/my_website' },
  { icon: 'fab fa-instagram', label: 'Instagram', href: 'https://www.instagram.com/dumpmylibrary/' },
  { icon: 'fas fa-pen-nib', label: 'Rednote', href: 'https://xhslink.com/m/88ViesB2Tzd' },
  { icon: 'fas fa-envelope', label: 'Email', href: 'mailto:product_sup_wYY@hotmail.com' },
]

const artLinks = [
  { name: 'Art Portfolio', meta: 'overview · statement', to: '/art', img: 'images/banner.jpg' },
  { name: 'Painting w/ mixed media', meta: 'oil · acrylic · pastel · watercolour', to: '/gallery/painting', img: 'images/painting/0.jpg' },
  { name: 'Creative Writing', meta: 'essays · verses', to: '/art', img: 'images/flowers/0.jpg' },
]

const photoLinks = [
  { name: 'Back Light', meta: 'series', to: '/gallery/backlight', img: 'images/backlight/0.jpg' },
  { name: 'Architecture', meta: 'series', to: '/gallery/arch', img: 'images/arch/0.jpg' },
  { name: 'Colours', meta: 'flora', to: '/gallery/flowers', img: 'images/flowers/0.jpg' },
  { name: 'Nature', meta: 'national parks', to: '/gallery/nature', img: 'images/nature/0.jpg' },
  { name: 'City Walk', meta: 'street', to: '/gallery/city', img: 'images/city/0.jpg' },
  { name: 'Forest', meta: 'series', to: '/gallery/forest', img: 'images/forest/4.jpg' },
  { name: 'Instagram', meta: '@dumpmylibrary ↗', href: 'https://www.instagram.com/dumpmylibrary/' },
]

const elsewhere = [
  { name: 'Marketplace', meta: 'shop', to: '/marketplace' },
  { name: 'Network', meta: 'my people', to: '/people' },
]

function Row({ n, item, onHover }) {
  const inner = (
    <>
      <span className="idx-n">{String(n).padStart(2, '0')}</span>
      <span className="idx-name">
        {item.name}
        {item.live && <span className="idx-live">live</span>}
      </span>
      <span className="idx-meta">{item.meta}</span>
      <span className="idx-arrow" aria-hidden="true">{item.href ? '↗' : '→'}</span>
    </>
  )
  const handlers = item.img
    ? { onMouseEnter: () => onHover(item.img), onMouseLeave: () => onHover(null), onFocus: () => onHover(item.img), onBlur: () => onHover(null) }
    : {}
  return (
    <li>
      {item.to ? (
        <Link className="idx-row" to={item.to} {...handlers}>{inner}</Link>
      ) : (
        <a className="idx-row" href={item.href} target="_blank" rel="noreferrer" {...handlers}>{inner}</a>
      )}
    </li>
  )
}

function Chapter({ numeral, title, note, accent, items, onHover }) {
  return (
    <section className="idx-chapter" style={{ '--accent': `var(--${accent})` }}>
      <header className="idx-chapter-head">
        <span className="idx-numeral">{numeral}</span>
        <h2>{title}</h2>
        <span className="idx-note">{note}</span>
      </header>
      <ol className="idx-list">
        {items.map((item, i) => (
          <Row key={item.name} n={i + 1} item={item} onHover={onHover} />
        ))}
      </ol>
    </section>
  )
}

export default function Home() {
  const [preview, setPreview] = useState(null)

  const techItems = projects.map((p) => ({
    name: p.name,
    meta: p.tech,
    href: p.href,
    live: p.live,
  }))

  return (
    <div className="idx-root">
      <WorldBackground />

      <div className={`idx-preview${preview ? ' show' : ''}`} aria-hidden="true">
        {preview && <img src={asset(preview)} alt="" />}
      </div>

      <main className="idx-main">
        <header className="idx-hero">
          <p className="idx-kicker">Index — Montréal, QC</p>
          <h1>Yanying Zhang</h1>
          <p className="idx-sub">
            Full-stack developer · ML / AI · data science —
            and a photographer &amp; painter on the side.
          </p>
          <nav className="idx-jump" aria-label="Sections">
            <a href="#tech" onClick={(e) => { e.preventDefault(); document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' }) }}>I. Technical</a>
            <a href="#art" onClick={(e) => { e.preventDefault(); document.getElementById('art')?.scrollIntoView({ behavior: 'smooth' }) }}>II. Art</a>
            <a href="#photo" onClick={(e) => { e.preventDefault(); document.getElementById('photo')?.scrollIntoView({ behavior: 'smooth' }) }}>III. Photography</a>
          </nav>
          <ul className="idx-social">
            {socialLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" aria-label={l.label} title={l.label}>
                  <i className={l.icon} />
                </a>
              </li>
            ))}
          </ul>
        </header>

        <div id="tech">
          <Chapter numeral="I." title="Technical" note="web · ml · data · systems" accent="blue" items={techItems} onHover={setPreview} />
        </div>
        <div id="art">
          <Chapter numeral="II." title="Art Portfolio" note="painting · writing" accent="cherry" items={artLinks} onHover={setPreview} />
        </div>
        <div id="photo">
          <Chapter numeral="III." title="Photography" note="film · light · nature" accent="sage" items={photoLinks} onHover={setPreview} />
        </div>
        <Chapter numeral="IV." title="Elsewhere" note="" accent="gray" items={elsewhere} onHover={setPreview} />

        <footer className="idx-foot">
          <div>
            <span className="idx-foot-label">Education</span>
            <p>McGill University — B.Sc. Computer Science, Minor in Mathematics · 2020–2025</p>
            <p>Marianopolis College — Health Science &amp; Pure and Applied Mathematics · 2018–2019</p>
          </div>
          <img
            className="idx-visitors"
            src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fmy-website-yanying.vercel.app&label=visitors&countColor=%23c41e3a&style=flat-square&labelColor=1b2028"
            alt="Visitor count"
          />
        </footer>
      </main>
    </div>
  )
}
