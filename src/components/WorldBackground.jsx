import { useEffect, useRef } from 'react'

/**
 * Full-screen canvas: a cat above a moving perspective grid, with depth-sorted snowfall.
 *
 * Palette: cherry red, blue, white, sage green, gray.
 */
const C = {
  cherry: [196, 30, 58],
  blue: [74, 120, 190],
  white: [244, 242, 238],
  sage: [157, 180, 154],
  gray: [128, 133, 140],
}
const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`

export default function WorldBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, dpr = 1, f = 1, horizon = 0
    const camH = 2.2 // camera height above the ground plane
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      f = Math.max(w, h) * 0.75
      horizon = h * 0.6
    }

    // project world (x, y, z) → screen, camera at (px, camH, 0) looking +z
    const proj = (x, y, z) => ({
      x: w / 2 + (f * (x - pointer.x)) / z,
      y: horizon - (f * (y - camH - pointer.y)) / z,
    })

    // ── snow ────────────────────────────────────────────────────────────────
    const ZMIN = 1.5, ZMAX = 40
    const snowColors = [C.white, C.white, C.white, C.white, C.sage, C.blue, C.gray]
    function spawn(flake, anywhere) {
      flake.z = ZMIN + Math.pow(Math.random(), 0.7) * (ZMAX - ZMIN)
      const halfW = ((w / 2) * flake.z) / f * 1.3
      flake.x = (Math.random() * 2 - 1) * halfW
      const top = camH + (horizon * flake.z) / f + 0.3
      const bottom = Math.max(0, camH - ((h - horizon) * flake.z) / f)
      flake.y = anywhere ? bottom + Math.random() * (top - bottom) : top
      flake.vy = 0.12 + Math.random() * 0.18 // world units / s — slow
      flake.phase = Math.random() * Math.PI * 2
      flake.sway = 0.08 + Math.random() * 0.18
      flake.r = 0.018 + Math.random() * 0.022 // world radius
      flake.c = snowColors[(Math.random() * snowColors.length) | 0]
      return flake
    }
    let flakes = []
    function buildSnow() {
      const count = Math.round(Math.min(560, Math.max(120, (w * h) / 2100)))
      flakes = Array.from({ length: count }, () => spawn({}, true))
    }

    function drawCat(t) {
      const size = Math.min(w * 0.84, h * 0.69, 690)
      const center = proj(0, 4.2, 34)
      const bob = reduceMotion ? 0 : Math.sin(t * 0.65) * 7

      ctx.save()
      ctx.translate(center.x, horizon - size * 0.29 + bob + (center.y - horizon) * 0.15)
      ctx.scale(size / 240, size / 240)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      const halo = ctx.createRadialGradient(0, 0, 25, 0, 0, 145)
      halo.addColorStop(0, rgba(C.blue, 0.25))
      halo.addColorStop(1, rgba(C.blue, 0))
      ctx.fillStyle = halo
      ctx.fillRect(-145, -145, 290, 290)

      const fur = ctx.createLinearGradient(0, -96, 0, 68)
      fur.addColorStop(0, '#293853')
      fur.addColorStop(1, '#1b222f')

      ctx.beginPath()
      ctx.moveTo(-89, -22)
      ctx.lineTo(-91, -91)
      ctx.quadraticCurveTo(-91, -104, -80, -96)
      ctx.lineTo(-42, -66)
      ctx.quadraticCurveTo(0, -78, 42, -66)
      ctx.lineTo(80, -96)
      ctx.quadraticCurveTo(91, -104, 91, -91)
      ctx.lineTo(89, -22)
      ctx.bezierCurveTo(124, 38, 78, 68, 0, 68)
      ctx.bezierCurveTo(-78, 68, -124, 38, -89, -22)
      ctx.closePath()
      ctx.fillStyle = fur
      ctx.fill()
      ctx.strokeStyle = rgba(C.blue, 0.95)
      ctx.lineWidth = 2
      ctx.shadowColor = rgba(C.blue, 0.85)
      ctx.shadowBlur = 16
      ctx.stroke()
      ctx.shadowBlur = 0

      for (const side of [-1, 1]) {
        ctx.save()
        ctx.scale(side, 1)

        ctx.beginPath()
        ctx.moveTo(78, -78)
        ctx.lineTo(79, -38)
        ctx.lineTo(54, -60)
        ctx.closePath()
        ctx.fillStyle = rgba(C.cherry, 0.45)
        ctx.fill()

        ctx.beginPath()
        ctx.ellipse(37, -9, 19, 13, -0.15, 0, Math.PI * 2)
        ctx.fillStyle = rgba(C.sage, 0.95)
        ctx.fill()
        ctx.beginPath()
        ctx.ellipse(37, -9, 4.5, 11, -0.1, 0, Math.PI * 2)
        ctx.fillStyle = '#101317'
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(64, 19)
        ctx.lineTo(117, 9)
        ctx.moveTo(67, 28)
        ctx.lineTo(119, 30)
        ctx.moveTo(64, 36)
        ctx.lineTo(110, 50)
        ctx.strokeStyle = rgba(C.white, 0.6)
        ctx.lineWidth = 1.4
        ctx.stroke()
        ctx.restore()
      }

      ctx.beginPath()
      ctx.moveTo(0, 22)
      ctx.lineTo(0, 32)
      ctx.quadraticCurveTo(-9, 44, -19, 34)
      ctx.moveTo(0, 32)
      ctx.quadraticCurveTo(9, 44, 19, 34)
      ctx.strokeStyle = rgba(C.white, 0.7)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(-10, 16)
      ctx.quadraticCurveTo(0, 12, 10, 16)
      ctx.quadraticCurveTo(10, 19, 0, 25)
      ctx.quadraticCurveTo(-10, 19, -10, 16)
      ctx.fillStyle = '#dd8294'
      ctx.fill()
      ctx.restore()
    }

    // ── ground grid ─────────────────────────────────────────────────────────
    const SP = 2 // grid spacing
    const ZNEAR = 0.6, ZFAR = 90
    function drawGrid(t) {
      const offset = (t * 0.35) % SP
      // lines running into the distance (constant x), drawn in depth slices
      // so the fade follows real distance rather than screen length
      const zStart = Math.max(ZNEAR, (f * camH) / (h - horizon + 40))
      const STEPS = 24
      for (let s = 0; s < STEPS; s++) {
        const z0 = zStart * Math.pow(ZFAR / zStart, s / STEPS)
        const z1 = zStart * Math.pow(ZFAR / zStart, (s + 1) / STEPS)
        const fade = Math.pow(1 - s / STEPS, 1.6)
        for (let i = -40; i <= 40; i++) {
          const x = i * SP
          const major = i % 5 === 0
          const a = proj(x, 0, z0), b = proj(x, 0, z1)
          if ((a.x < -50 && b.x < -50) || (a.x > w + 50 && b.x > w + 50)) continue
          ctx.strokeStyle = rgba(major ? C.sage : C.blue, (major ? 0.6 : 0.42) * fade)
          ctx.lineWidth = major ? 1.1 : 0.8
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
      // cross lines (constant z), drifting toward the viewer
      for (let k = 0; k * SP < ZFAR; k++) {
        const z = k * SP + SP - offset
        if (z < ZNEAR) continue
        const fade = Math.pow(1 - z / ZFAR, 2.2)
        const a = proj(-80, 0, z), b = proj(80, 0, z)
        ctx.strokeStyle = rgba(C.blue, 0.5 * fade)
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
      // horizon line
      const hy = proj(0, 0, ZFAR * 4).y
      const hg = ctx.createLinearGradient(0, 0, w, 0)
      hg.addColorStop(0, rgba(C.cherry, 0))
      hg.addColorStop(0.5, rgba(C.cherry, 0.65))
      hg.addColorStop(1, rgba(C.cherry, 0))
      ctx.strokeStyle = hg
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, hy)
      ctx.lineTo(w, hy)
      ctx.stroke()
    }

    // ── frame ───────────────────────────────────────────────────────────────
    let last = performance.now()
    let raf = 0
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const t = now / 1000

      pointer.x += (pointer.tx - pointer.x) * 0.03
      pointer.y += (pointer.ty - pointer.y) * 0.03

      ctx.clearRect(0, 0, w, h)

      // sky → ground wash
      const hy = proj(0, 0, ZFAR * 4).y
      const sky = ctx.createLinearGradient(0, 0, 0, h)
      sky.addColorStop(0, '#0f1216')
      sky.addColorStop(Math.max(0, Math.min(1, hy / h)), '#1b2028')
      sky.addColorStop(1, '#101317')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, h)

      const ground = ctx.createLinearGradient(0, hy, 0, h)
      ground.addColorStop(0, 'rgba(22,26,32,0.96)')
      ground.addColorStop(1, 'rgba(14,17,21,1)')
      ctx.fillStyle = ground
      ctx.fillRect(0, hy, w, h - hy)
      drawGrid(t)
      drawCat(t)

      // snow: far → near
      flakes.sort((a, b) => b.z - a.z)
      for (const fl of flakes) {
        if (!reduceMotion) {
          fl.y -= fl.vy * dt
          fl.x += Math.sin(t * 0.6 + fl.phase) * fl.sway * dt
        }
        const groundY = proj(fl.x, 0, fl.z).y
        const p = proj(fl.x, fl.y, fl.z)
        if (fl.y < 0 || p.y > h + 10 || p.y > groundY) { spawn(fl, false); continue }
        const r = Math.max(0.5, (f * fl.r) / fl.z)
        const depth = 1 - (fl.z - ZMIN) / (ZMAX - ZMIN)
        ctx.fillStyle = rgba(fl.c, 0.25 + depth * 0.65)
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion) raf = requestAnimationFrame(frame)
    }

    function onMove(e) {
      pointer.tx = ((e.clientX / w) * 2 - 1) * 0.8
      pointer.ty = ((e.clientY / h) * 2 - 1) * -0.25
    }
    function onResize() {
      resize()
      buildSnow()
      if (reduceMotion) frame(performance.now())
    }

    resize()
    buildSnow()
    window.addEventListener('resize', onResize)
    if (!reduceMotion) window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="world-bg" aria-hidden="true" />
}
