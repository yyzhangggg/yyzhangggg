import { useState, useRef, useCallback, useEffect } from 'react'

const RAW = 'https://raw.githubusercontent.com/yyzhangggg/my_website/main/docs/images/product'

const paintings = [
  { file: '1.png',        title: 'Texture Study',        desc: 'Light purple and sandy texture with decorative butterfly motif.' },
  { file: '2.png',        title: 'Strawberry Sister I',  desc: 'Cute strawberry with needles and threads — pairs with its younger sister piece.' },
  { file: '3.png',        title: 'Strawberry Sister II', desc: 'Cute strawberry with needles and threads — pairs with its elder sister piece.' },
  { file: '4.png',        title: 'Mountain in Colour',   desc: 'A mountain landscape rich in layered, vibrant colours.' },
  { file: '5.png',        title: 'Relief',               desc: 'A visual expression of releasing worries and anxiety.' },
  { file: 'IMG_1280.JPG', title: 'BioArt',               desc: 'A glimpse of biological science through an artistic lens — bridging science and art.' },
]

const N = paintings.length          // 6
const VISIBLE = 3
// Triple the list: copy A (0–5), copy B (6–11), copy C (12–17)
// Start at copy B so we can scroll backward or forward seamlessly
const extended = [...paintings, ...paintings, ...paintings]
const START = N

function PaintingCard({ file, title, desc }) {
  const src = `${RAW}/${file}`
  return (
    <div className="paint-card">
      <div className="paint-img">
        <img src={src} alt={`Painting: ${title}`} loading="lazy" />
      </div>
      <div className="paint-info">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  )
}

export default function Products() {
  const [idx, setIdx]           = useState(START)
  const [animated, setAnimated] = useState(true)
  const intervalRef = useRef(null)
  const snapRef     = useRef(null)

  const advance = useCallback(() => {
    setIdx(prev => prev + 1)
  }, [])

  // When we slide into copy C, snap back to the same position in copy B (no visible jump)
  useEffect(() => {
    if (idx >= N * 2) {
      snapRef.current = setTimeout(() => {
        setAnimated(false)
        setIdx(N)
      }, 520) // wait for the 0.5 s CSS transition to finish
    }
    return () => clearTimeout(snapRef.current)
  }, [idx])

  // Re-enable the CSS transition after the silent snap
  useEffect(() => {
    if (!animated) {
      let r1, r2
      r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setAnimated(true))
      })
      return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2) }
    }
  }, [animated])

  const startScroll = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(advance, 1800)
  }, [advance])

  const stopScroll = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  // Cleanup on unmount
  useEffect(() => () => {
    clearInterval(intervalRef.current)
    clearTimeout(snapRef.current)
  }, [])

  // translateX is % of the track's own width; each card = 100/extended.length % of track
  const translatePct = -(idx - START) * (100 / extended.length)

  return (
    <section className="wrapper style1" id="paintings">
      <style>{`
        .carousel-outer {
          overflow: hidden;
          border-radius: 0.9em;
          cursor: default;
        }
        .carousel-track {
          display: flex;
          width: ${(extended.length / VISIBLE) * 100}%;
        }
        .carousel-slide {
          width: ${100 / extended.length}%;
          flex-shrink: 0;
          padding: 0 0.55rem;
          box-sizing: border-box;
        }
        .paint-card {
          border-radius: 0.9em;
          overflow: hidden;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          transition: transform .28s ease, box-shadow .28s ease;
        }
        .paint-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 28px rgba(0,0,0,.22);
        }
        .paint-img {
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .paint-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .4s ease;
        }
        .paint-card:hover .paint-img img {
          transform: scale(1.06);
        }
        .paint-info {
          padding: .85em 1em 1em;
        }
        .paint-info h3 {
          margin: 0 0 .3em;
          font-size: .95em;
          font-weight: 600;
        }
        .paint-info p {
          font-size: .78em;
          opacity: .7;
          margin: 0;
          line-height: 1.5;
        }
      `}</style>

      <div className="z-row z-flip">
        <div className="z-label">
          <h2>My Paintings</h2>
          <p>
            A collection of my <strong>original paintings</strong> across various
            media — oil, acrylic, pastel, and mixed media. Each piece is a
            personal exploration of colour, texture, and emotion.
          </p>
        </div>
        <div className="z-body">
          <div
            className="carousel-outer"
            onMouseEnter={startScroll}
            onMouseLeave={stopScroll}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translateX(${translatePct}%)`,
                transition: animated ? 'transform 0.5s ease' : 'none',
              }}
            >
              {extended.map((p, i) => (
                <div key={i} className="carousel-slide">
                  <PaintingCard {...p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
