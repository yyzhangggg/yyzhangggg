import { asset } from '../utils/assetPath'

export default function Banner() {
  return (
    <section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
      <div className="content">
        <h1>Story</h1>
        <p className="major">
          Content-creating has been a meaningful part of my life outside of my
          professional background. In my spare time, I work on poster,
          multi-media painting and photography.
        </p>
        <p>
          I primarily focus on nature photography, capturing colours, special
          spices of plantes, and expressing beauty and imagination through my
          lens. I also enjoy shooting/painting about landscapes and architecture
          — I find inspiration in both people and the world around them.
        </p>
      </div>
      <div className="image">
        <img src={asset('images/banner.jpg')} alt="Banner" />
      </div>
    </section>
  )
}
