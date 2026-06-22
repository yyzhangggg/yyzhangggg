import { useNavigate } from 'react-router-dom'
import Friends from '../components/Friends'

const socialLinks = [
  { icon: 'fab fa-linkedin-in', text: 'LinkedIn · yanying-zhang', href: 'https://www.linkedin.com/in/yanying-zhang-a61943232' },
  { icon: 'fab fa-instagram', text: 'Instagram · @my_photography', href: 'https://www.instagram.com/my_photoraphy_site?igsh=MXIxYnQ0cm9vZmRpNQ%3D%3D&utm_source=qr' },
  { icon: 'fab fa-github', text: 'GitHub · yyzhangggg', href: 'https://github.com/yyzhangggg/my_website' },
  { icon: 'fas fa-envelope', text: 'Email · product_sup_wYY', href: 'mailto:product_sup_wYY@hotmail.com' },
  { icon: 'fas fa-pen-nib', text: 'RedNote · xiaohongshu', href: 'https://xhslink.com/m/88ViesB2Tzd' },
]

function PerspectiveGrid() {
  const vx = 500, vy = 80
  const lines = []

  for (let x = -300; x <= 1300; x += 50) {
    lines.push(
      <line key={`r${x}`} x1={vx} y1={vy} x2={x} y2={900}
        stroke="rgba(244,114,182,0.06)" strokeWidth="0.5" />
    )
  }

  const ys = [160, 220, 275, 325, 372, 416, 458, 500, 542, 586, 634, 688, 750, 820, 900]
  ys.forEach((y, i) => {
    const ratio = (y - vy) / (900 - vy)
    const hw = ratio * 800
    lines.push(
      <line key={`h${i}`} x1={vx - hw} y1={y} x2={vx + hw} y2={y}
        stroke="rgba(96,165,250,0.045)" strokeWidth="0.5" />
    )
  })

  const mazeWalls = [
    [180, 350, 180, 275], [320, 500, 320, 416], [680, 500, 680, 416],
    [150, 634, 250, 634], [750, 634, 850, 634],
    [400, 325, 400, 220], [600, 325, 600, 220],
    [250, 458, 350, 458], [650, 458, 750, 458],
    [100, 750, 100, 688], [900, 750, 900, 688],
    [450, 586, 550, 586], [300, 820, 300, 750], [700, 820, 700, 750],
  ]
  mazeWalls.forEach(([x1, y1, x2, y2], i) => {
    lines.push(
      <line key={`m${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(244,114,182,0.1)" strokeWidth="1" />
    )
  })

  const dots = [
    [vx, vy], [180, 275], [320, 416], [680, 416],
    [400, 220], [600, 220], [100, 688], [900, 688],
    [300, 750], [700, 750], [450, 586], [550, 586],
  ]
  dots.forEach(([cx, cy], i) => {
    lines.push(
      <circle key={`d${i}`} cx={cx} cy={cy} r="2"
        fill="rgba(244,114,182,0.25)" />
    )
    lines.push(
      <circle key={`dg${i}`} cx={cx} cy={cy} r="4"
        fill="none" stroke="rgba(244,114,182,0.08)" strokeWidth="1" />
    )
  })

  return (
    <svg
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
      viewBox="0 0 1000 900" preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="vp-glow">
          <stop offset="0%" stopColor="rgba(244,114,182,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx={vx} cy={vy} r="60" fill="url(#vp-glow)" />
      {lines}
    </svg>
  )
}

function ScrollingTicker() {
  const all = [...socialLinks, ...socialLinks, ...socialLinks]

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {all.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="ticker-item"
          >
            <i className={link.icon} />
            <span>{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function MyPeople() {
  const navigate = useNavigate()

  return (
    <div id="wrapper" className="divided cyberpunk" style={{ position: 'relative', minHeight: '100vh' }}>
      <style>{`
        .np-hero {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 7rem 2rem 2rem;
        }
        .np-hero h1 {
          font-size: 2.8em;
          font-weight: 800;
          margin: 0 0 0.3em;
          background: linear-gradient(90deg, #f472b6, #60a5fa, #dc143c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.15;
        }
        .np-hero p {
          color: #fecdd3;
          opacity: 0.75;
          max-width: 500px;
          margin: 0 auto 1.5rem;
          line-height: 1.7;
          font-size: 0.95em;
        }
        .np-back {
          display: inline-block;
          margin-bottom: 1.5rem;
          cursor: pointer;
          font-size: 0.85em;
          color: rgba(244,114,182,0.6);
          background: none;
          border: none;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .np-back:hover { color: #f472b6; }

        /* ── Scrolling Ticker ── */
        .ticker-wrap {
          position: relative;
          z-index: 1;
          overflow: hidden;
          width: 100%;
          padding: 0.65rem 0;
          margin: 1rem 0 2rem;
          background: rgba(15, 15, 40, 0.5);
          border-top: 1px solid rgba(244,114,182,0.1);
          border-bottom: 1px solid rgba(244,114,182,0.1);
          backdrop-filter: blur(8px);
        }
        .ticker-track {
          display: flex;
          white-space: nowrap;
          animation: tickerScroll 28s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45em;
          padding: 0.25em 1.8em;
          color: rgba(255,255,255,0.45);
          font-size: 0.72rem;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .ticker-item:hover {
          color: #f472b6;
        }
        .ticker-item i {
          color: rgba(244,114,182,0.5);
          font-size: 0.9em;
          transition: color 0.2s;
        }
        .ticker-item:hover i {
          color: #f472b6;
        }
        .ticker-sep {
          color: rgba(244,114,182,0.15);
          padding: 0 0.5em;
          font-size: 0.6em;
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        /* ── Friends section override for cyberpunk ── */
        .cyberpunk #friends {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <PerspectiveGrid />

      <div className="np-hero">
        <h1>Network</h1>
        <p>
          The beautiful souls who colour my world &mdash; friends who&apos;ve walked
          alongside me through every season of life.
        </p>
      </div>

      <ScrollingTicker />
      <Friends />
    </div>
  )
}
