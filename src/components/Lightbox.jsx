import { useLanguage } from '../i18n/Language'
import { useEffect } from 'react'

/** Minimal keyboard-friendly lightbox. `className` lets each page theme it. */
export default function Lightbox({ images, index, onClose, onIndex, className = '' }) {
  const { t } = useLanguage()
  const n = images.length
  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index + 1) % n)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [index, n, onClose, onIndex])

  if (index === null || !n) return null
  return (
    <div className={`lightbox ${className}`} role="dialog" aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <button className="lb-btn lb-close" onClick={onClose} aria-label={t("Close")}>×</button>
      <button className="lb-btn lb-prev" onClick={() => onIndex((index - 1 + n) % n)} aria-label={t("Previous")}>‹</button>
      <img src={images[index]} alt={t("{number} of {count}", { number: index + 1, count: n })} />
      <button className="lb-btn lb-next" onClick={() => onIndex((index + 1) % n)} aria-label={t("Next")}>›</button>
      <span className="lb-count">{index + 1} / {n}</span>
    </div>
  )
}
