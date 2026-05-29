import { useState, useRef, useEffect, useCallback } from 'react'
import { asset } from '../utils/assetPath'

const IMGS = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.JPG']
const N = IMGS.length
const mod = (n, m) => ((n % m) + m) % m

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
  const [center, setCenter] = useState(0)
  const slidingRef = useRef(false)
  const hoverRef  = useRef(null)

  const slide = useCallback((dir) => {
    if (slidingRef.current) return
    slidingRef.current = true
    setCenter(c => mod(c + dir, N))
    setTimeout(() => { slidingRef.current = false }, 440)
  }, [])

  const startLeft  = useCallback(() => { slide(-1); hoverRef.current = setInterval(() => slide(-1), 1300) }, [slide])
  const startRight = useCallback(() => { slide(1);  hoverRef.current = setInterval(() => slide(1),  1300) }, [slide])
  const stopSlide  = useCallback(() => { clearInterval(hoverRef.current); hoverRef.current = null }, [])

  useEffect(() => () => clearInterval(hoverRef.current), [])

  // Compute which 5 image indices are visible and their positions
  const idxAt = (d) => mod(center + d, N)
  const posMap = {}
  for (const d of [-2, -1, 0, 1, 2]) posMap[idxAt(d)] = d

  const toRender = [...new Set([-2, -1, 0, 1, 2].map(idxAt))]

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

            {toRender.map(i => {
              const pos = posMap[i]
              const s = POS_STYLE[String(pos)]
              return (
                <div
                  key={i}
                  className="gl-item"
                  style={{ ...s, transition: TRANS }}
                >
                  <img src={asset(`images/gallery/${IMGS[i]}`)} alt={`Gallery ${i + 1}`} />
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
              {IMGS.map((_, i) => (
                <span key={i} className={`gl-dot${i === center ? ' on' : ''}`} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
