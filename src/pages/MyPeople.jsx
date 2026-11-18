import { useLanguage } from '../i18n/Language'
import { useEffect, useRef } from 'react'
import Friends from '../components/Friends'

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

    const petals = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.4 + 0.3,
      type: 'petal',
    }))

    const flowers = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 14,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: Math.random() * 0.6 - 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.3 + 0.25,
      type: 'flower',
    }))

    const all = [...petals, ...flowers]

    function drawSinglePetal(cx, cy, s, angle) {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(s * 0.35, -s * 0.25, s * 0.45, -s * 0.65, s * 0.12, -s)
      ctx.lineTo(0, -s * 0.88)
      ctx.lineTo(-s * 0.12, -s)
      ctx.bezierCurveTo(-s * 0.45, -s * 0.65, -s * 0.35, -s * 0.25, 0, 0)
      ctx.fill()
      ctx.restore()
    }

    function drawItem(p) {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity

      if (p.type === 'petal') {
        const s = p.size
        ctx.fillStyle = `hsl(${340 + Math.random() * 12}, 75%, ${84 + Math.random() * 8}%)`
        drawSinglePetal(0, 0, s, 0)
      } else {
        const s = p.size * 0.55
        const petalCount = 5
        for (let i = 0; i < petalCount; i++) {
          const hue = 340 + Math.random() * 15
          const light = 82 + Math.random() * 10
          ctx.fillStyle = `hsl(${hue}, 70%, ${light}%)`
          const angle = (Math.PI * 2 / petalCount) * i
          drawSinglePetal(0, 0, s, angle)
        }
        ctx.beginPath()
        ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(45, 80%, ${75 + Math.random() * 10}%)`
        ctx.fill()
      }

      ctx.restore()
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      all.forEach(p => {
        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3
        p.rotation += p.rotSpeed
        if (p.y > canvas.height + 30) {
          p.y = -30
          p.x = Math.random() * canvas.width
        }
        drawItem(p)
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

export default function MyPeople() {
  const { t } = useLanguage()
  return (
    <div id="wrapper" className="divided" style={{ position: 'relative', minHeight: '100vh' }}>
      <style>{`
        #wrapper.divided {
          background: linear-gradient(180deg, #d1fae5 0%, #e6ffed 30%, #f0fdf4 70%, #f7fef9 100%);
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
          color: #000000;
          line-height: 1.15;
        }

        /* ── Friends section ── */
        #friends {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <SakuraFall />

      <div className="np-hero">
        <h1>{t("Network")}</h1>
      </div>

      <Friends />
    </div>
  )
}
