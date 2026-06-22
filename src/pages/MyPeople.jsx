import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Friends from '../components/Friends'

const socialLinks = [
  { icon: 'fab fa-linkedin-in', text: 'LinkedIn · yanying-zhang', href: 'https://www.linkedin.com/in/yanying-zhang-a61943232' },
  { icon: 'fab fa-instagram', text: 'Instagram · @my_photography', href: 'https://www.instagram.com/my_photoraphy_site?igsh=MXIxYnQ0cm9vZmRpNQ%3D%3D&utm_source=qr' },
  { icon: 'fab fa-github', text: 'GitHub · yyzhangggg', href: 'https://github.com/yyzhangggg/my_website' },
  { icon: 'fas fa-envelope', text: 'Email · product_sup_wYY', href: 'mailto:product_sup_wYY@hotmail.com' },
  { icon: 'fas fa-pen-nib', text: 'RedNote · xiaohongshu', href: 'https://xhslink.com/m/88ViesB2Tzd' },
]

function SakuraFall() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const petals = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.4 + 0.3,
    }))

    function drawPetal(p) {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size)
      ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0)
      ctx.fillStyle = `hsl(${340 + Math.random() * 10}, 80%, ${82 + Math.random() * 8}%)`
      ctx.fill()
      ctx.restore()
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petals.forEach(p => {
        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3
        p.rotation += p.rotSpeed
        if (p.y > canvas.height + 20) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
        drawPetal(p)
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 2,
      }}
    />
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
    <div id="wrapper" className="divided" style={{ position: 'relative', minHeight: '100vh' }}>
      <style>{`
        #wrapper.divided {
          background: linear-gradient(180deg, #fff5f9 0%, #fdf2f8 30%, #fce7f3 70%, #fbcfe8 100%);
        }
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
          background: linear-gradient(90deg, #f472b6, #ec4899, #db2777);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.15;
        }
        .np-hero p {
          color: #6b4c6a;
          max-width: 500px;
          margin: 0 auto 1.5rem;
          line-height: 1.7;
          font-size: 0.95em;
        }

        /* ── Scrolling Ticker ── */
        .ticker-wrap {
          position: relative;
          z-index: 1;
          overflow: hidden;
          width: 100%;
          padding: 0.65rem 0;
          margin: 1rem 0 2rem;
          background: rgba(255, 255, 255, 0.6);
          border-top: 1px solid rgba(244,114,182,0.15);
          border-bottom: 1px solid rgba(244,114,182,0.15);
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
          color: #7c5a7a;
          font-size: 0.72rem;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .ticker-item:hover {
          color: #db2777;
        }
        .ticker-item i {
          color: #f472b6;
          font-size: 0.9em;
          transition: color 0.2s;
        }
        .ticker-item:hover i {
          color: #db2777;
        }
        .ticker-sep {
          color: rgba(244,114,182,0.2);
          padding: 0 0.5em;
          font-size: 0.6em;
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        /* ── Friends section ── */
        #friends {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <SakuraFall />

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
