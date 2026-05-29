import { asset } from '../utils/assetPath'

const items = Array.from({ length: 12 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0')
  return {
    full: asset(`images/gallery/fulls/${num}.jpg`),
    thumb: asset(`images/gallery/thumbs/${num}.jpg`),
  }
})

export default function GallerySection() {
  return (
    <section className="wrapper style1">
      <div className="z-row">
        <div className="z-label">
          <h2>Gallery</h2>
          <p>
            There&apos;s some works that I took for fun without a theme. Enjoy a
            dive into the colors and world by my &ldquo;vision&rdquo;!
          </p>
        </div>
        <div className="z-body">
          <div className="gallery style2 medium lightbox onscroll-fade-in">
            {items.map((item, idx) => (
              <article key={idx}>
                <a href={item.full} className="image">
                  <img src={item.thumb} alt={`Gallery ${idx + 1}`} />
                </a>
                <div className="caption">
                  <h3>Title</h3>
                  <p>Lorem ipsum dolor amet, consectetur magna etiam elit. Etiam sed ultrices.</p>
                  <ul className="actions fixed">
                    <li><span className="button small">Details</span></li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
