import { useState, useRef, useEffect } from 'react'
import { asset } from '../utils/assetPath'

const items = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.JPG']

export default function GallerySection() {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef(null)

  const startCycle = () => {
    timerRef.current = setInterval(() => {
      setIdx(i => (i + 1) % items.length)
    }, 1200)
  }

  const stopCycle = () => {
    clearInterval(timerRef.current)
    timerRef.current = null
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  return (
    <section className="wrapper style1">
      <style>{`
        .gl-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 0.75rem;
          overflow: hidden;
          cursor: crosshair;
          background: #111;
        }
        .gl-wrap img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: gl-fade 0.4s ease;
        }
        @keyframes gl-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .gl-dots {
          position: absolute;
          bottom: 0.9rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.45rem;
          z-index: 2;
        }
        .gl-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          transition: background 0.3s, transform 0.3s;
        }
        .gl-dot.on {
          background: #fff;
          transform: scale(1.3);
        }
        .gl-hint {
          position: absolute;
          bottom: 2.6rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.5);
          pointer-events: none;
          opacity: 1;
          transition: opacity 0.3s;
          white-space: nowrap;
          text-transform: uppercase;
        }
        .gl-wrap:hover .gl-hint { opacity: 0; }
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
          <div
            className="gl-wrap"
            onMouseEnter={startCycle}
            onMouseLeave={stopCycle}
          >
            <img
              key={idx}
              src={asset(`images/gallery/${items[idx]}`)}
              alt={`Gallery ${idx + 1}`}
            />
            <span className="gl-hint">hover to browse</span>
            <div className="gl-dots">
              {items.map((_, i) => (
                <span key={i} className={`gl-dot${i === idx ? ' on' : ''}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
