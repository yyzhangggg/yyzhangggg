import { useState, useRef, useEffect, useCallback } from 'react'
import { asset } from '../utils/assetPath'

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP']
const MAX_INDEX  = 30
const mod = (n, m) => ((n % m) + m) % m

function probeImage(idx) {
  return Promise.any(
    EXTENSIONS.map(ext => {
      const src = asset(`images/gallery/${idx}.${ext}`)
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload  = () => resolve(src)
        img.onerror = reject
        img.src = src
      })
    })
  )
}

async function discoverGallery() {
  const results = await Promise.allSettled(
    Array.from({ length: MAX_INDEX }, (_, i) => probeImage(i + 1))
  )
  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)
}

// Layout: [side 22%] [1% gap] [center 54%] [1% gap] [side 22%]
const TRANS = 'left 0.42s ease, width 0.42s ease, opacity 0.42s ease'
const POS_STYLE = {
  '-2': { left: '-22%', width: '22%', opacity: 0,    zIndex: 1 },
  '-1': { left:   '0%', width: '22%', opacity: 0.62, zIndex: 2 },
   '0': { left:  '23%', width: '54%', opacity: 1,    zIndex: 3 },
   '1': { left:  '78%', width: '22%', opacity: 0.62, zIndex: 2 },
   '2': { left: '100%', width: '22%', opacity: 0,    zIndex: 1 },
}

export default function GallerySection() {
  const [imgs,   setImgs]   = useState([])
  const [center, setCenter] = useState(0)
  const slidingRef = useRef(false)
  const hoverRef   = useRef(null)

  useEffect(() => {
    let cancelled = false
    discoverGallery().then(found => { if (!cancelled) setImgs(found) })
    return () => { cancelled = true }
  }, [])

  const N = imgs.length

  const slide = useCallback((dir) => {
    if (slidingRef.current || N < 2) return
    slidingRef.current = true
    setCenter(c => mod(c + dir, N))
    setTimeout(() => { slidingRef.current = false }, 440)
  }, [N])

  const startLeft  = useCallback(() => { slide(-1); hoverRef.current = setInterval(() => slide(-1), 1300) }, [slide])
  const startRight = useCallback(() => { slide(1);  hoverRef.current = setInterval(() => slide(1),  1300) }, [slide])
  const stopSlide  = useCallback(() => { clearInterval(hoverRef.current); hoverRef.current = null }, [])

  useEffect(() => () => clearInterval(hoverRef.current), [])

  // Compute which 5 image indices are visible and their positions
  const idxAt    = (d) => mod(center + d, N)
  const posMap   = {}
  for (const d of [-2, -1, 0, 1, 2]) posMap[idxAt(d)] = d
  const toRender = N > 0 ? [...new Set([-2, -1, 0, 1, 2].map(idxAt))] : []

  return (
    <section className="wrapper style1">
      <style>{`
        .gl-outer {
          position: relative;
          width: 100%;
          aspect-ratio: 3/2;
          overflow: hidden;
          border-radius: 0.6rem;
          background: #0a0a0a;
          user-select: none;
        }
        .gl-item {
          position: absolute;
          top: 0;
          height: 100%;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .gl-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }
        .gl-zone {
          position: absolute;
          top: 0;
          height: 100%;
          width: 23%;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.22s;
        }
        .gl-zone-left  { left: 0;  cursor: w-resize; }
        .gl-zone-right { right: 0; cursor: e-resize; }
        .gl-zone-left:hover  { background: linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 100%); }
        .gl-zone-right:hover { background: linear-gradient(to left,  rgba(0,0,0,0.35) 0%, transparent 100%); }
        .gl-arrow {
          font-size: 2.2rem;
          font-weight: 300;
          color: rgba(255,255,255,0.85);
          opacity: 0;
          transition: opacity 0.18s;
          pointer-events: none;
          line-height: 1;
        }
        .gl-zone:hover .gl-arrow { opacity: 1; }
        .gl-dots {
          position: absolute;
          bottom: 0.9rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.45rem;
          z-index: 11;
          pointer-events: none;
        }
        .gl-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          transition: background 0.3s, transform 0.3s;
        }
        .gl-dot.on { background: #fff; transform: scale(1.3); }
        .gl-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #666;
          font-size: 0.95em;
        }
      `}</style>

      <div className="z-row">
        <div className="z-label">
          <h2>Gallery</h2>
          <p>
            There&apos;s some works that I took for fun without a theme. Enjoy a
            dive into the colors and world by my &ldquo;vision&rdquo;!
          </p>
        </div>
        <div className="z-body">
          <div className="gl-outer">

            {N === 0 ? (
              <div className="gl-loading">Loading…</div>
            ) : (
              <>
                {toRender.map(i => {
                  const pos = posMap[i]
                  const s = POS_STYLE[String(pos)]
                  return (
                    <div
                      key={i}
                      className="gl-item"
                      style={{ ...s, transition: TRANS }}
                    >
                      <img src={imgs[i]} alt={`Gallery ${i + 1}`} loading="lazy" />
                    </div>
                  )
                })}

                <div className="gl-zone gl-zone-left"  onMouseEnter={startLeft}  onMouseLeave={stopSlide}>
                  <span className="gl-arrow">‹</span>
                </div>
                <div className="gl-zone gl-zone-right" onMouseEnter={startRight} onMouseLeave={stopSlide}>
                  <span className="gl-arrow">›</span>
                </div>

                <div className="gl-dots">
                  {imgs.map((_, i) => (
                    <span key={i} className={`gl-dot${i === center ? ' on' : ''}`} />
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
