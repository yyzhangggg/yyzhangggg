import { asset } from '../utils/assetPath'
import SpotlightSection from '../components/SpotlightSection'
import GallerySection from '../components/GallerySection'
import CreativeWriting from '../components/CreativeWriting'
import { useNavigate } from 'react-router-dom'

const spotlights = [
  {
    id: 'first',
    orient: 'right',
    folder: 'backlight',
    previewImg: 'images/backlight/0.jpg',
    title: 'Back Light',
    body: `Everything reflects some special colour when the sunlight is on its back.
           I love how the creator of the universe designed human eyes that see vivid
           colours even with strong light on the back. The best digital camera won't
           capture the same amount of colour resolution as our bare eyes.`,
  },
  {
    id: 'second',
    orient: 'left',
    folder: 'arch',
    previewImg: 'images/arch/0.jpg',
    title: 'Architecture',
    body: '',
  },
  {
    id: '3rd',
    orient: 'right',
    folder: 'flowers',
    previewImg: 'images/flowers/0.jpg',
    title: 'Colours',
    body: `And yes, this is another section of nature. I was attracted by the abundant
           variety in plants, trees and nature. Even though they don't work to buy new
           clothes, they have the most pure colour that the luxury brands of fashion can
           never mimic. The flowers are pretty, but the leaves are prettier!`,
  },
  {
    id: '4th',
    orient: 'left',
    folder: 'nature',
    previewImg: 'images/nature/0.jpg',
    title: 'Nature',
    body: `Influenced by the Asian concept of "changing scenery with each step," I often
           find myself encountering nature's own canvas while walking through national
           parks — a symphony composed of living and dead trees, shrubs, and creeks.
           The entire sky seems to proclaim the glory and design of the Creator.`,
  },
  {
    id: '5th',
    orient: 'right',
    folder: 'city',
    previewImg: 'images/city/0.jpg',
    title: 'City Walk',
    body: '',
  },
  {
    id: '6th',
    orient: 'left',
    folder: 'forest',
    previewImg: 'images/forest/4.jpg',
    title: 'Forest',
    body: `Forests hold a mysterious quiet that no city can replicate. Walking through
           a forest feels like entering a cathedral built by the Creator himself —
           where light filters through canopies, every shadow tells a story of growth,
           and the silence is alive with the sound of leaves and distant water.`,
  },
  {
    id: '7th',
    orient: 'right',
    folder: 'painting',
    previewImg: 'images/painting/0.jpg',
    title: 'Painting w/ mixed multi-media',
    body: `I have a deep love for oil painting, acrylics, pastel, and watercolor.
           Impressionism is one of the art movements I admire most, and I enjoy adding
           my own unique artistic touches to this style. Rather than replicating
           real-life scenes, I prefer creating dreamlike landscapes.`,
  },
]

export default function ArtPortfolio() {
  const navigate = useNavigate()

  return (
    <div id="wrapper" className="divided">
      {/* Art Banner */}
      <section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
        <div className="content">
          <h1>Art Portfolio</h1>
          <p className="major">
            Photography, painting, and creative writing — a collection of my
            artistic explorations across different media and styles.
          </p>
          <p>
            I primarily focus on nature photography, capturing colours, special
            spices of plantes, and expressing beauty and imagination through my
            lens. I also enjoy painting about landscapes and architecture.
          </p>
          <ul className="actions stacked">
          </ul>
        </div>
        <div className="image">
          <img src={asset('images/banner.jpg')} alt="Art Portfolio" />
        </div>
      </section>

      {/* Why Photography */}
      <section className="wrapper style1 align-center">
        <div className="inner">
          <div className="index align-left">
            <section>
              <header>
                <h3><b>Why photography?</b></h3>
              </header>
              <div className="content">
                <p>
                  I was grown up with a doctor family, and for my whole life I&apos;ve
                  been taught to study Bio in order to get into a med school. I
                  followed the instruction and lived to fulfil the expectations of
                  parents. My career in health was quite successful until I got
                  admitted to Marianopolis college, which has the best private
                  health program in Montreal. However, this was also where I
                  encountered the greatest setback in my journey of biological
                  professions, and it ended up becoming the turning point in my
                  life decision.
                </p>
                <p>
                  I started by being interested in Photoshop digital editing in my
                  young age, then gradually got into presenting as a model and
                  producing dramatic photos. Yet later on, I gradually became more
                  sure of what output I wanted to produce. What I long for is more
                  freedom to record and actively capture moments of beauty, rather
                  than merely appreciating my own beauty. Because of this shift in
                  mindset, I began studying the theory of light and shadow, and
                  fell in love with the style of film.
                </p>
                <p>
                  I have always believed that if a gift is not used to its
                  fullest, it is wasted — and I don&apos;t like waste! In the
                  future, I will continue to use the black eyes God has given me
                  to search for light, and to capture with my camera the shapes of
                  light and the fleeting moments of shadow and illumination.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      {spotlights.map((s) => (
        <SpotlightSection key={s.id} {...s} />
      ))}

      <GallerySection />
      <CreativeWriting />
    </div>
  )
}
