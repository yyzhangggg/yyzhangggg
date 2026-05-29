import { asset } from '../utils/assetPath'

const items = [
  { file: '1.png' },
  { file: '2.png' },
  { file: '3.png' },
  { file: '4.png' },
  { file: '5.png' },
  { file: '6.JPG' },
]

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
            {items.map((item, idx) => {
              const src = asset(`images/gallery/${item.file}`)
              return (
                <article key={idx}>
                  <a href={src} className="image">
                    <img src={src} alt={`Gallery ${idx + 1}`} />
                  </a>
                  <div className="caption">
                    <ul className="actions fixed">
                      <li><span className="button small">View</span></li>
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
