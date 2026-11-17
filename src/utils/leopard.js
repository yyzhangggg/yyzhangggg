/**
 * Procedural leopard-print tile → CSS `url("data:image/svg+xml,…")`.
 * Seeded so the pattern is stable between renders; the tile wraps seamlessly.
 */
function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function leopardTile({
  size = 260,
  base = '#f7b9cd',
  center = '#e886a8',
  ring = '#2b1820',
  count = 16,
  seed = 7,
} = {}) {
  const r = rng(seed)
  const shapes = []
  const f = (n) => n.toFixed(1)

  const spots = []
  // jittered grid keeps rosettes evenly spread
  const cells = Math.ceil(Math.sqrt(count))
  const cell = size / cells
  for (let gy = 0; gy < cells; gy++) {
    for (let gx = 0; gx < cells; gx++) {
      spots.push({
        x: (gx + 0.2 + r() * 0.6) * cell,
        y: (gy + 0.2 + r() * 0.6) * cell,
        rad: cell * (0.26 + r() * 0.12),
        rot: r() * Math.PI * 2,
        squash: 0.75 + r() * 0.3,
        segs: 3 + Math.floor(r() * 3),
        seed: r(),
      })
    }
  }

  const draw = (s, ox, oy) => {
    const cx = s.x + ox, cy = s.y + oy
    const local = rng(Math.floor(s.seed * 1e9))
    // pink centre
    shapes.push(
      `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(s.rad * 0.78)}" ry="${f(s.rad * 0.78 * s.squash)}" transform="rotate(${f((s.rot * 180) / Math.PI)} ${f(cx)} ${f(cy)})" fill="${center}"/>`,
    )
    // broken dark ring
    const span = (Math.PI * 2) / s.segs
    for (let k = 0; k < s.segs; k++) {
      const a0 = s.rot + k * span + span * (0.08 + local() * 0.12)
      const a1 = s.rot + (k + 1) * span - span * (0.1 + local() * 0.15)
      const rr = s.rad * (0.95 + local() * 0.15)
      const p0x = cx + Math.cos(a0) * rr, p0y = cy + Math.sin(a0) * rr * s.squash
      const p1x = cx + Math.cos(a1) * rr, p1y = cy + Math.sin(a1) * rr * s.squash
      const w = s.rad * (0.32 + local() * 0.22)
      shapes.push(
        `<path d="M${f(p0x)} ${f(p0y)} A${f(rr)} ${f(rr * s.squash)} 0 0 1 ${f(p1x)} ${f(p1y)}" fill="none" stroke="${ring}" stroke-width="${f(w)}" stroke-linecap="round"/>`,
      )
    }
    // a couple of loose freckles
    for (let k = 0; k < 2; k++) {
      const a = local() * Math.PI * 2
      const d = s.rad * (1.6 + local() * 0.6)
      shapes.push(
        `<circle cx="${f(cx + Math.cos(a) * d)}" cy="${f(cy + Math.sin(a) * d)}" r="${f(s.rad * (0.1 + local() * 0.12))}" fill="${ring}"/>`,
      )
    }
  }

  for (const s of spots) {
    for (const ox of [-size, 0, size]) {
      for (const oy of [-size, 0, size]) {
        const reach = s.rad * 2.4
        if (s.x + ox < -reach || s.x + ox > size + reach) continue
        if (s.y + oy < -reach || s.y + oy > size + reach) continue
        draw(s, ox, oy)
      }
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${base}"/>${shapes.join('')}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}
