import { useState } from 'react'
import { Link } from 'react-router-dom'
import { built, code, academic } from '../content/site'
import WorldBackground from '../components/WorldBackground'
import SocialLinks from '../components/SocialLinks'
import '../styles/pages.css'
import '../styles/index-home.css'

const pad = (n) => String(n).padStart(2, '0')

const explore = [
  {
    to: '/art', title: 'Art', note: 'painting · mixed media · writing', accent: 'cherry',
    pixels: [
      '..######..',
      '.########.',
      '##.##.####',
      '##########',
      '##.####.##',
      '.#####....',
      '..####....',
      '...##.....',
    ],
  },
  {
    to: '/photography', title: 'Photography', note: 'portrait · couple sessions', accent: 'sage',
    pixels: [
      '...####...',
      '..######..',
      '##########',
      '###....###',
      '##..##..##',
      '##..##..##',
      '###....###',
      '##########',
    ],
  },
  {
    to: '/people', title: 'Network', note: 'friends & their pages', accent: 'blue',
    pixels: [
      '.##....##.',
      '.##....##.',
      '..........',
      '####..####',
      '####..####',
      '..........',
      '....##....',
      '...####...',
    ],
  },
]

function scrollTo(id) {
  return (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function ChapterHead({ numeral, title, note }) {
  return (
    <header className="idx-chapter-head">
      <span className="idx-numeral">{numeral}</span>
      <h2>{title}</h2>
      {note && <span className="idx-note">{note}</span>}
    </header>
  )
}

function Tbd() {
  return <span className="tbd">TBD</span>
}

/* I. Built — each row has its own Live / Code actions */
function BuiltRow({ n, p }) {
  return (
    <li className="idx-row idx-row-built">
      <span className="idx-n">{pad(n)}</span>
      <div className="idx-body">
        <span className="idx-name">
          {p.name}
          {p.live && <span className="idx-live">live</span>}
        </span>
        <span className="idx-desc">{p.desc}</span>
        <span className="idx-meta">{p.tech}</span>
      </div>
      <div className="idx-actions">
        {p.live && <a className="idx-chip" href={p.live} target="_blank" rel="noreferrer">Demo ↗</a>}
        {p.code && <a className="idx-chip" href={p.code} target="_blank" rel="noreferrer">Code ↗</a>}
        {!p.code && p.codePrivate && <span className="idx-chip is-muted">Private repo</span>}
        {p.todo && <Tbd />}
      </div>
    </li>
  )
}

/* II. Code — whole row is a link */
function CodeRow({ n, p }) {
  return (
    <li>
      <a className="idx-row idx-row-link" href={p.href} target="_blank" rel="noreferrer">
        <span className="idx-n">{pad(n)}</span>
        <span className="idx-name">{p.name}</span>
        <span className="idx-meta">{p.tech}</span>
        <span className="idx-arrow" aria-hidden="true">↗</span>
      </a>
    </li>
  )
}

/* III. Academic — compact sub-lists */
function AcademicBlock({ title, items }) {
  return (
    <div className="idx-acad">
      <h3>{title}</h3>
      <ul>
        {items.map((it, i) => {
          const inner = (
            <>
              <span className="idx-acad-name">{it.name}{it.todo && <Tbd />}</span>
              <span className="idx-acad-meta">{it.meta}</span>
              {it.year && <span className="idx-acad-year">{it.year}</span>}
            </>
          )
          return (
            <li key={i}>
              {it.href ? (
                <a className="idx-acad-row" href={it.href} target="_blank" rel="noreferrer">{inner}</a>
              ) : (
                <div className="idx-acad-row">{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Home() {
  const [codeGroup, setCodeGroup] = useState('All')
  const groups = ['All', ...new Set(code.map((c) => c.group))]
  const visibleCode = codeGroup === 'All' ? code : code.filter((c) => c.group === codeGroup)

  return (
    <div className="pg idx-root">
      <WorldBackground />

      <main className="idx-main">
        <header className="idx-hero">
          <p className="idx-kicker">Index — Montréal, QC</p>
          <h1>Yanying Zhang</h1>
          <p className="idx-sub">
            Full-stack developer · ML / AI · data science —
            and a photographer, painter &amp; story teller on the side.
          </p>
          <nav className="idx-jump" aria-label="Sections">
            <a href="#built" onClick={scrollTo('built')}>I. Built</a>
            <a href="#code" onClick={scrollTo('code')}>II. Code</a>
            <a href="#academic" onClick={scrollTo('academic')}>III. Academic</a>
            <a href="#explore" onClick={scrollTo('explore')}>IV. Explore</a>
          </nav>
          <SocialLinks page="home" className="idx-social" showHandle={false} />
        </header>

        <section id="built" className="idx-chapter" style={{ '--accent': 'var(--cherry)' }}>
          <ChapterHead numeral="I." title="Built" note="websites · demos · live products" />
          <ol className="idx-list">
            {built.map((p, i) => <BuiltRow key={p.name} n={i + 1} p={p} />)}
          </ol>
        </section>

        <section id="code" className="idx-chapter" style={{ '--accent': 'var(--blue)' }}>
          <ChapterHead numeral="II." title="Code" note="computer science projects · github" />
          <div className="idx-filters" role="tablist" aria-label="Filter projects">
            {groups.map((g) => (
              <button key={g} role="tab" aria-selected={codeGroup === g}
                className={`idx-filter${codeGroup === g ? ' is-on' : ''}`}
                onClick={() => setCodeGroup(g)}>
                {g}
              </button>
            ))}
          </div>
          <ol className="idx-list">
            {visibleCode.map((p, i) => <CodeRow key={p.name} n={i + 1} p={p} />)}
          </ol>
        </section>

        <section id="academic" className="idx-chapter" style={{ '--accent': 'var(--sage)' }}>
          <ChapterHead numeral="III." title="Academic" note="school · research · awards" />
          <div className="idx-acad-grid">
            <AcademicBlock title="Education" items={academic.education} />
            <AcademicBlock title="Research" items={academic.research} />
            <AcademicBlock title="Competitions" items={academic.competitions} />
            <AcademicBlock title="Certificates" items={academic.certificates} />
            <AcademicBlock title="ML on YouTube" items={academic.videos} />
          </div>
        </section>

        <section id="explore" className="idx-chapter" style={{ '--accent': 'var(--white)' }}>
          <ChapterHead numeral="IV." title="Explore" note="the other rooms of this house" />
          <div className="idx-explore">
            {explore.map((e) => (
              <Link key={e.to} to={e.to} className="idx-card" style={{ '--accent': `var(--${e.accent})` }}>
                <div className="idx-card-preview" aria-hidden="true">
                  <div className="idx-card-icon">
                    {Array.from(e.pixels.join(''), (pixel, i) => (
                      <span key={i} className={pixel === '#' ? 'idx-pixel-filled' : undefined} />
                    ))}
                  </div>
                </div>
                <div className="idx-card-body">
                  <h3>{e.title}</h3>
                  <span className="idx-card-note">{e.note}</span>
                  <span className="idx-card-arrow" aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="idx-foot">
          <span>© {new Date().getFullYear()} Yanying Zhang</span>
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
