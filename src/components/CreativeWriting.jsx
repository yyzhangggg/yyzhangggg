import { useState } from 'react'
import { asset } from '../utils/assetPath'
import writings from '../data/writings'

/* ── Modal overlay ─────────────────────────────────────────── */
function Modal({ piece, onClose }) {
  return (
    <div className="cw-backdrop" onClick={onClose}>
      <div className="cw-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cw-close" onClick={onClose} aria-label="Close">✕</button>
        <p className="cw-modal-genre">{piece.genre}</p>
        <h2 className="cw-modal-title">{piece.title}</h2>
        <p className="cw-modal-setting">{piece.setting}</p>
        <hr className="cw-divider" />
        {piece.parts.map((part, i) => (
          <div key={i} className="cw-part">
            <h3 className="cw-part-heading">{part.heading}</h3>
            {part.body.split('\n\n').map((para, j) =>
              para.trim() ? (
                <p key={j} className="cw-para">{para.trim()}</p>
              ) : null
            )}
          </div>
        ))}
        {piece.docxPath && (
          <a
            href={asset(piece.docxPath)}
            download
            className="button small cw-download"
          >
            ↓ Download .docx
          </a>
        )}
      </div>
    </div>
  )
}

/* ── Preview card ──────────────────────────────────────────── */
function WritingCard({ piece, onRead }) {
  return (
    <div className="cw-card">
      <span className="cw-genre-badge">{piece.genre}</span>
      <h3 className="cw-card-title">{piece.title}</h3>
      <p className="cw-card-setting">📍 {piece.setting}</p>
      <p className="cw-card-excerpt">&ldquo;{piece.excerpt}&rdquo;</p>
      <button className="button small cw-read-btn" onClick={() => onRead(piece)}>
        Read More →
      </button>
    </div>
  )
}

/* ── Section ───────────────────────────────────────────────── */
export default function CreativeWriting() {
  const [active, setActive] = useState(null)

  return (
    <section className="wrapper style1 align-center" id="creative-writing">
      <style>{`
        /* ── Section layout ── */
        #creative-writing .inner { margin-bottom: 2em; }
        .cw-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 2em;
          justify-content: center;
          padding: 0 2em 3em;
        }

        /* ── Preview card ── */
        .cw-card {
          width: 340px;
          text-align: left;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 1.2em;
          padding: 2em 1.8em 1.6em;
          display: flex;
          flex-direction: column;
          gap: 0.6em;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cw-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.18);
        }
        .cw-genre-badge {
          font-size: 0.68em;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.12);
          padding: 0.25em 0.8em;
          border-radius: 2em;
          align-self: flex-start;
        }
        .cw-card-title {
          font-size: 1.1em;
          font-weight: 700;
          margin: 0.2em 0 0;
        }
        .cw-card-setting {
          font-size: 0.78em;
          opacity: 0.6;
          margin: 0;
        }
        .cw-card-excerpt {
          font-size: 0.88em;
          line-height: 1.65;
          opacity: 0.8;
          font-style: italic;
          margin: 0.4em 0 0.8em;
          flex: 1;
        }
        .cw-read-btn { align-self: flex-start; }

        /* ── Modal backdrop ── */
        .cw-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.72);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5em;
          backdrop-filter: blur(4px);
          animation: cw-fade-in 0.2s ease;
        }
        @keyframes cw-fade-in { from { opacity: 0 } to { opacity: 1 } }

        /* ── Modal box ── */
        .cw-modal {
          background: #1a1a2e;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1.4em;
          padding: 2.8em 3em;
          max-width: 680px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.2) transparent;
          animation: cw-slide-up 0.25s ease;
        }
        @keyframes cw-slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .cw-close {
          position: sticky;
          float: right;
          top: 0;
          background: rgba(255,255,255,0.08);
          border: none;
          border-radius: 50%;
          width: 2em;
          height: 2em;
          font-size: 1em;
          cursor: pointer;
          color: inherit;
          line-height: 2em;
          text-align: center;
          transition: background 0.2s;
        }
        .cw-close:hover { background: rgba(255,255,255,0.2); }
        .cw-modal-genre {
          font-size: 0.7em;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.55;
          margin: 0 0 0.5em;
        }
        .cw-modal-title {
          font-size: 1.6em;
          font-weight: 700;
          margin: 0 0 0.2em;
          line-height: 1.3;
        }
        .cw-modal-setting {
          font-size: 0.82em;
          opacity: 0.55;
          margin: 0 0 1.2em;
        }
        .cw-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin: 1em 0 1.8em;
        }
        .cw-part { margin-bottom: 2em; }
        .cw-part-heading {
          font-size: 0.8em;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.5;
          margin: 0 0 1em;
          font-weight: 600;
        }
        .cw-para {
          font-size: 0.95em;
          line-height: 1.85;
          margin: 0 0 1em;
          opacity: 0.9;
        }
        .cw-download {
          display: inline-block;
          margin-top: 1em;
        }

        @media (max-width: 600px) {
          .cw-modal { padding: 2em 1.4em; }
          .cw-card  { width: 100%; }
        }
      `}</style>

      <div className="inner">
        <h2>Creative Writing ✍️</h2>
        <p>
          Stories I write for fun — character studies, slice-of-life fiction,
          and scenes that live in my head until I put them down.
        </p>
      </div>

      <div className="cw-grid">
        {writings.map((piece, i) => (
          <WritingCard key={i} piece={piece} onRead={setActive} />
        ))}
      </div>

      {active && <Modal piece={active} onClose={() => setActive(null)} />}
    </section>
  )
}
