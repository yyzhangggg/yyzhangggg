import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { asset } from '../utils/assetPath'

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP']
const FAIL_LIMIT = 3

function tryLoadImage(folder, index) {
  return new Promise((resolve, reject) => {
    let extIdx = 0
    function tryNext() {
      if (extIdx >= EXTENSIONS.length) { reject(); return }
      const src = asset(`images/${folder}/${index}.${EXTENSIONS[extIdx]}`)
      const img = new Image()
      img.onload = () => resolve(src)
      img.onerror = () => { extIdx++; tryNext() }
      img.src = src
    }
    tryNext()
  })
}

export default function Marketplace() {
  const navigate = useNavigate()
  const [paintings, setPaintings] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      let idx = 0, failCount = 0
      const loaded = []
      while (idx <= 50 && failCount < FAIL_LIMIT) {
        if (cancelled) return
        try {
          const src = await tryLoadImage('painting', idx)
          loaded.push(src)
          failCount = 0
        } catch { failCount++ }
        idx++
      }
      if (!cancelled) setPaintings(loaded)
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div id="wrapper" className="divided">
      <style>{`
        .mp-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
        }
        .mp-back {
          display: inline-block;
          margin-bottom: 2rem;
          cursor: pointer;
          font-size: 0.9em;
          color: #888;
          background: none;
          border: none;
          text-decoration: underline;
        }
        .mp-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .mp-header h1 { margin-bottom: 0.5em; }
        .mp-section { margin-bottom: 3rem; }
        .mp-section h3 { margin-bottom: 1em; }

        /* ── Painting Gallery ── */
        .painting-section-title {
          text-align: center;
          margin: 3rem 0 1.5rem;
          font-size: 1.4em;
          font-weight: 600;
        }
        .painting-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 0.75rem;
          margin-bottom: 3rem;
        }
        .painting-card {
          position: relative;
          border-radius: 0.6em;
          overflow: hidden;
          cursor: pointer;
          background: #f9f5f7;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .painting-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 24px rgba(0,0,0,0.14);
        }
        .painting-card img {
          width: 100%;
          display: block;
          aspect-ratio: 1;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .painting-card:hover img {
          transform: scale(1.05);
        }
        .painting-card-num {
          position: absolute;
          bottom: 0.4em;
          right: 0.5em;
          font-size: 0.65em;
          color: rgba(255,255,255,0.7);
          background: rgba(0,0,0,0.3);
          padding: 0.15em 0.5em;
          border-radius: 999px;
          backdrop-filter: blur(4px);
        }

        /* ── Lightbox ── */
        .painting-lightbox {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: lbFadeIn 0.25s ease;
        }
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .painting-lightbox img {
          max-width: 85vw;
          max-height: 85vh;
          border-radius: 0.6em;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          object-fit: contain;
        }
        .painting-lb-close {
          position: absolute;
          top: 1.2rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          font-size: 1.6rem;
          cursor: pointer;
          transition: color 0.2s;
          line-height: 1;
        }
        .painting-lb-close:hover { color: #fff; }
        .painting-lb-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.8);
          font-size: 1.6rem;
          padding: 0.5em 0.65em;
          cursor: pointer;
          border-radius: 0.5em;
          transition: background 0.2s, color 0.2s;
          line-height: 1;
        }
        .painting-lb-arrow:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }
        .painting-lb-prev { left: 1.2rem; }
        .painting-lb-next { right: 1.2rem; }
        .painting-lb-counter {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.5);
          font-size: 0.85em;
        }

        .mp-disclaimer {
          margin-top: 2rem;
          padding: 1.5em;
          border-radius: 0.8em;
          background: rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.08);
          font-size: 0.9em;
          line-height: 1.7;
        }
        @media (max-width: 600px) {
          .painting-grid {
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 0.5rem;
          }
        }
      `}</style>

      <section className="wrapper style1 align-center">
        <div className="mp-container">
          <button className="mp-back" onClick={() => navigate('/')}>
            &larr; Back to Main
          </button>

          <div className="mp-header">
            <h1>Marketplace</h1>
            <p>Photography sessions &amp; original paintings</p>
          </div>

          {/* ── Photography Price Table ── */}
          <div className="mp-section">
            <div className="inner">
              <div className="index align-left">
                <section>
                  <header>
                    <h3>Photography Pricing</h3>
                  </header>
                  <div className="content">
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr><th>Package</th><th>Description</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Solo / Portraits</td>
                            <td>1-hour session, 15+ edited photos, indoor or outdoor location of your choice.</td>
                            <td>$59.99</td>
                          </tr>
                          <tr>
                            <td>Duo / Couple</td>
                            <td>1.5-hour session, 25+ edited photos, perfect for couples, friends, or siblings.</td>
                            <td>$99.99</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* ── Painting Gallery ── */}
          <h3 className="painting-section-title">Original Paintings</h3>
          <div className="painting-grid">
            {paintings.map((src, i) => (
              <div
                key={i}
                className="painting-card"
                onClick={() => setSelected(i)}
              >
                <img src={src} alt={`Painting ${i + 1}`} loading="lazy" />
                <span className="painting-card-num">{i + 1}</span>
              </div>
            ))}
          </div>

          {/* ── Book a Session ── */}
          <div className="mp-section">
            <div className="inner">
              <div className="index align-left">
                <section>
                  <header>
                    <h3>Book a Session</h3>
                  </header>
                  <div className="content">
                    <form method="post" action="#">
                      <div className="fields">
                        <div className="field half">
                          <label htmlFor="name">Name</label>
                          <input type="text" name="name" id="name" defaultValue="" />
                        </div>
                        <div className="field half">
                          <label htmlFor="email">Email</label>
                          <input type="email" name="email" id="email" defaultValue="" />
                        </div>
                        <div className="field">
                          <label htmlFor="package">Package</label>
                          <select name="package" id="package">
                            <option value="">- Select a package -</option>
                            <option value="solo">Solo / Portraits</option>
                            <option value="duo">Duo / Couple</option>
                            <option value="painting">Purchase a Painting</option>
                            <option value="custom">Custom Request</option>
                          </select>
                        </div>
                        <div className="field">
                          <label htmlFor="message">Message</label>
                          <textarea name="message" id="message" rows="5" />
                        </div>
                      </div>
                      <ul className="actions">
                        <li>
                          <input type="submit" name="submit" value="Send Request" />
                        </li>
                      </ul>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="mp-disclaimer">
            All items on display for sales are guaranteed to be handmade
            by families, which means they are not industrially produced
            and may have imperfections due to manual craftsmanship. If you
            are concerned about this, please refrain from purchasing. We
            will not accept returns or provide after-sales service because
            of the perceived imperfections.
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {selected !== null && (
        <div
          className="painting-lightbox"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}
        >
          <button className="painting-lb-close" onClick={() => setSelected(null)}>
            &times;
          </button>
          <button
            className="painting-lb-arrow painting-lb-prev"
            onClick={() => setSelected((selected - 1 + paintings.length) % paintings.length)}
          >
            &#8249;
          </button>
          <img src={paintings[selected]} alt={`Painting ${selected + 1}`} />
          <button
            className="painting-lb-arrow painting-lb-next"
            onClick={() => setSelected((selected + 1) % paintings.length)}
          >
            &#8250;
          </button>
          <span className="painting-lb-counter">
            {selected + 1} / {paintings.length}
          </span>
        </div>
      )}
    </div>
  )
}
