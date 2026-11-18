import { useEffect, useRef } from 'react'

/**
 * Full-screen canvas: a woven tree above a moving perspective grid, with depth-sorted snowfall.
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
      const count = Math.round(Math.min(850, Math.max(210, (w * h) / 1400)))
      flakes = Array.from({ length: count }, () => spawn({}, true))
    }

    const treeStrands = []
    const fullTurn = Math.PI * 2

    // Helical strands converge at the top, crossing in opposite directions.
    for (let strand = 0; strand < 32; strand++) {
      const direction = strand % 2 === 0 ? 1 : -1
      const start = (strand / 32) * fullTurn
      const points = Array.from({ length: 73 }, (_, index) => {
        const t = index / 72
        const tier = Math.pow(Math.sin(t * Math.PI * 4), 2)
        const radius = (1 - t) * (0.74 + tier * 0.29)
        const angle = start + direction * t * fullTurn * 1.3
        return [radius * Math.cos(angle), 0.2 + t * 1.65, radius * Math.sin(angle)]
      })
      treeStrands.push({ points, color: direction === 1 ? C.sage : C.white, crown: true })
    }

    for (let strand = 0; strand < 8; strand++) {
      const points = Array.from({ length: 25 }, (_, index) => {
        const t = index / 24
        const radius = 0.12 - t * 0.04
        const angle = (strand / 8 + t * 0.7) * fullTurn
        return [radius * Math.cos(angle), t * 0.36, radius * Math.sin(angle)]
      })
      treeStrands.push({ points, color: C.sage, crown: false })
    }

    function drawTree(t) {
      const angle = reduceMotion ? 0.3 : t * 0.17
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const size = Math.min(w * 0.5, h * 0.29, 330)
      const base = proj(0, 0, 34)

      for (const { points, color, crown } of treeStrands) {
        let previous
        ctx.lineWidth = crown ? 1 : 1.4
        for (const [x, y, z] of points) {
          const depth = z * cos - x * sin
          const scale = size / (1 + depth * 0.19)
          const px = base.x + (x * cos + z * sin) * scale
          const py = base.y - (y - depth * 0.15) * scale
          if (previous) {
            ctx.strokeStyle = rgba(color, 0.38 - depth * 0.27)
            ctx.beginPath()
            ctx.moveTo(previous.x, previous.y)
            ctx.lineTo(px, py)
            ctx.stroke()
          }
          previous = { x: px, y: py }
        }
      }
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
      drawTree(t)

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
