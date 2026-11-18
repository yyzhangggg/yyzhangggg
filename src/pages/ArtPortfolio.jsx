import { useMemo, useState } from 'react'
import { social } from '../content/site'
import { asset } from '../utils/assetPath'
import { leopardTile } from '../utils/leopard'
import useImageFolder from '../hooks/useImageFolder'
import Lightbox from '../components/Lightbox'
import SocialLinks from '../components/SocialLinks'
import writings from '../content/writings'
import '../styles/pages.css'
import '../styles/art.css'

function WritingModal({ piece, onClose }) {
  if (!piece) return null
  return (
    <div className="art-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <article className="art-modal" onClick={(e) => e.stopPropagation()}>
        <button className="art-modal-close" onClick={onClose} aria-label="Close">×</button>
        <p className="art-eyebrow">{piece.genre}</p>
        <h2>{piece.title}</h2>
        <p className="art-modal-setting">{piece.setting}</p>
        {piece.parts.map((part, i) => (
          <section key={i} className="art-modal-part">
            <h3>{part.heading}</h3>
            {part.body.split('\n\n').map((para, j) => <p key={j}>{para.trim()}</p>)}
          </section>
        ))}
        {piece.docxPath && (
          <a className="art-btn" href={asset(piece.docxPath)} download>Download .docx</a>
        )}
      </article>
    </div>
  )
}

export default function ArtPortfolio() {
  const { images, loading } = useImageFolder('painting')
  const [open, setOpen] = useState(null)
  const [reading, setReading] = useState(null)

  const leopard = useMemo(() => leopardTile({ seed: 11 }), [])
  const leopardDark = useMemo(
    () => leopardTile({ seed: 23, base: '#2b1820', center: '#5a2c3c', ring: '#ff5c9d', size: 220 }),
    [],
  )

  return (
    <div className="pg art-root" style={{ '--leopard': leopard, '--leopard-dark': leopardDark }}>
      {/* Hero */}
      <header className="art-hero">
        <div className="art-hero-card">
          <p className="art-eyebrow">Portfolio · Painting &amp; Writing</p>
          <h1><span className="art-title-initial">A</span>rt{' '}<span className="art-title-initial">G</span>allery</h1>
          <p className="art-lede">
            Oil, acrylic, pastel and watercolour. I admire Impressionism and add my own
            touches to it — rather than replicating real scenes, I prefer to paint
            dreamlike landscapes.
          </p>
          <SocialLinks page="art" className="art-social" />
        </div>
      </header>

      {/* The wall */}
      <section className="art-section">
        <div className="art-section-head">
          <span className="art-num">01</span>
          <h2>The Wall</h2>
          <span className="art-count">{images.length ? `${images.length} works` : ''}</span>
        </div>
        {loading && !images.length && <p className="art-loading">Hanging the paintings…</p>}
        <div className="art-wall">
          {images.map((src, i) => (
            <button key={src} className="art-frame" onClick={() => setOpen(i)} aria-label={`Open painting ${i + 1}`}>
              <img src={src} alt={`Painting ${i + 1}`} loading="lazy" />
              <span className="art-frame-tag">No. {String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
        <p className="art-buy">
          Originals available — <a href={social.email.href}>inquire by email →</a>
        </p>
      </section>

      <div className="art-strip" aria-hidden="true" />

      {/* Writing */}
      <section className="art-section">
        <div className="art-section-head">
          <span className="art-num">02</span>
          <h2>Creative Writing</h2>
        </div>
        <div className="art-writing">
          {writings.map((w) => (
            <article key={w.title} className="art-card">
              <p className="art-eyebrow">{w.genre}</p>
              <h3>{w.title}</h3>
              <p className="art-card-setting">{w.setting}</p>
              <p className="art-card-excerpt">“{w.excerpt}”</p>
              <button className="art-btn" onClick={() => setReading(w)}>Read</button>
            </article>
          ))}
        </div>
      </section>

      <footer className="art-foot">
        <h2>Follow the studio</h2>
        <SocialLinks page="art" className="art-social" />
      </footer>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} className="art-lightbox" />
      <WritingModal piece={reading} onClose={() => setReading(null)} />
    </div>
  )
}
