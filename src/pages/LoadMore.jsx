import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { asset } from '../utils/assetPath'

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP']
const MAX_TRY    = 500
const FAIL_LIMIT = 5

/**
 * Try to load image at `folder/index.ext` for each extension.
 * Resolves with the confirmed src string, rejects if all extensions fail.
 */
function tryLoadImage(folder, index) {
  return new Promise((resolve, reject) => {
    let extIdx = 0
    function tryNext() {
      if (extIdx >= EXTENSIONS.length) { reject(); return }
      const src = asset(`images/${folder}/${index}.${EXTENSIONS[extIdx]}`)
      const img = new Image()
      img.onload  = () => resolve(src)
      img.onerror = () => { extIdx++; tryNext() }
      img.src = src
    }
    tryNext()
  })
}

export default function LoadMore() {
  const { folder } = useParams()
  const navigate   = useNavigate()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setImages([])
    setLoading(true)

    async function load() {
      let idx       = 0
      let failCount = 0
      const loaded  = []

      while (idx <= MAX_TRY && failCount < FAIL_LIMIT) {
        if (cancelled) return
        try {
          const src = await tryLoadImage(folder, idx)
          loaded.push(src)
          setImages([...loaded])   // stream images in one by one
          setLoading(false)
          failCount = 0
        } catch {
          failCount++
        }
        idx++
      }
      if (!cancelled) setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [folder])

  const title = folder
    ? folder.charAt(0).toUpperCase() + folder.slice(1)
    : 'Gallery'

  return (
    <>
      {/* Inline styles matching load_more.html exactly */}
      <style>{`
        body { background: #fdf5f9; }
        .lm-header {
          text-align: center; margin-bottom: 30px; padding: 20px;
          background: white; border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,.1);
        }
        .lm-header h1 { color: #333; text-transform: capitalize; }
        .lm-back {
          display: inline-block; margin-top: 8px; cursor: pointer;
          font-size: .9em; color: #888; background: none; border: none;
          text-decoration: underline;
        }
        .masonry {
          column-count: 4; column-gap: 15px;
          padding: 20px; max-width: 1200px; margin: auto;
        }
        .masonry img {
          width: 100%; border-radius: 12px; margin-bottom: 15px;
          break-inside: avoid; cursor: pointer;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .masonry img:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,.2); }
        @media (max-width:1200px) { .masonry { column-count:3; } }
        @media (max-width:800px)  { .masonry { column-count:2; } }
        @media (max-width:500px)  { .masonry { column-count:1; } }
        .lm-loader {
          display: flex; align-items: center; justify-content: center;
          padding: 60px; font-size: 1.1em; color: #999;
        }
        .lm-loader::after {
          content: ''; width: 40px; height: 40px; margin-left: 16px;
          border: 4px solid #f3f3f3; border-top: 4px solid #ff6b9d;
          border-radius: 50%; animation: lm-spin 1s linear infinite;
        }
        @keyframes lm-spin { to { transform: rotate(360deg); } }
        .lm-empty { text-align: center; padding: 40px; color: #666; }
      `}</style>

      <div style={{ padding: '20px' }}>
        <div className="lm-header">
          <h1>{title}</h1>
          <button className="lm-back" onClick={() => navigate('/')}>
            ← Back to main page
          </button>
        </div>

        {loading && images.length === 0 && (
          <div className="lm-loader">Loading images</div>
        )}

        {!loading && images.length === 0 && (
          <p className="lm-empty">No images found in this category.</p>
        )}

        <div className="masonry">
          {images.map((src, i) => (
            <img key={i} src={src} alt={`${title} ${i}`} loading="lazy" />
          ))}
        </div>
      </div>
    </>
  )
}
