import { useNavigate } from 'react-router-dom'
import { asset } from '../utils/assetPath'

/**
 * Reusable spotlight row used for Backlight, Architecture, Colours, etc.
 *
 * Props:
 *   id        – section id string
 *   orient    – 'left' | 'right'  (image side)
 *   title     – heading text
 *   body      – paragraph text (can be empty string)
 *   folder    – image folder name (e.g. 'backlight')
 *   previewImg – relative path to the preview image  (e.g. 'images/backlight/0.jpg')
 */
export default function SpotlightSection({
  id,
  orient = 'right',
  title,
  body,
  folder,
  previewImg,
}) {
  const navigate = useNavigate()
  const orientClass = orient === 'left' ? 'orient-left' : 'orient-right'

  return (
    <section
      className={`spotlight style1 ${orientClass} content-align-left image-position-center onscroll-image-fade-in`}
      id={id}
    >
      <div className="content">
        <h2>{title}</h2>
        {body && <p>{body}</p>}
        <ul className="actions stacked">
          <button onClick={() => navigate(`/gallery/${folder}`)}>
            Load More
          </button>
        </ul>
      </div>
      <div className="image">
        <img src={asset(previewImg)} alt={`${title} preview`} />
      </div>
    </section>
  )
}
