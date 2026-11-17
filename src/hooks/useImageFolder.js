import { useEffect, useState } from 'react'
import { asset } from '../utils/assetPath'

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP']

function probe(folder, index) {
  return Promise.any(
    EXTENSIONS.map((ext) => new Promise((resolve, reject) => {
      const src = asset(`images/${folder}/${index}.${ext}`)
      const img = new Image()
      img.onload = () => resolve(src)
      img.onerror = reject
      img.src = src
    })),
  )
}

/**
 * Discover numbered images (0.jpg, 1.png, …) in public/images/<folder>.
 * Probes in batches and stops after `failLimit` consecutive misses.
 */
export default function useImageFolder(folder, { start = 0, failLimit = 4, max = 400 } = {}) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setImages([])
    setLoading(true)

    async function run() {
      const found = []
      let misses = 0
      const BATCH = 6
      for (let i = start; i <= max && misses < failLimit; i += BATCH) {
        const idx = Array.from({ length: BATCH }, (_, k) => i + k)
        const res = await Promise.allSettled(idx.map((n) => probe(folder, n)))
        if (cancelled) return
        for (const r of res) {
          if (r.status === 'fulfilled') { found.push(r.value); misses = 0 } else misses++
        }
        setImages([...found])
      }
      if (!cancelled) setLoading(false)
    }
    if (folder) run()
    return () => { cancelled = true }
  }, [folder, start, failLimit, max])

  return { images, loading }
}
