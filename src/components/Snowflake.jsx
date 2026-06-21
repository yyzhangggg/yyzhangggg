import { useEffect, useRef } from 'react'

export default function Snowflake() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const COLORS = [
      [255, 255, 255],
      [255, 248, 220],
      [255, 240, 200],
      [255, 230, 180],
    ]

    class Flake {
      constructor(randomY) {
        this.x = Math.random() * canvas.width
        this.y = randomY ? Math.random() * canvas.height : canvas.height + 10
        this.size = Math.random() * 2.5 + 0.8
        this.speedY = -(Math.random() * 0.6 + 0.15)
        this.speedX = (Math.random() - 0.5) * 0.3
        this.alpha = Math.random() * 0.5 + 0.3
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 10
        this.size = Math.random() * 2.5 + 0.8
        this.speedY = -(Math.random() * 0.6 + 0.15)
        this.speedX = (Math.random() - 0.5) * 0.3
        this.alpha = Math.random() * 0.5 + 0.3
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
      }
      update() {
        this.y += this.speedY
        this.x += this.speedX
        if (this.y < -10) this.reset()
      }
      draw() {
        const [r, g, b] = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`
        ctx.shadowBlur = 6
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const flakes = Array.from({ length: 120 }, () => new Flake(true))

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      flakes.forEach(f => { f.update(); f.draw() })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}
