import Banner        from '../components/Banner'
import SpotlightSection from '../components/SpotlightSection'
import GallerySection  from '../components/GallerySection'
import Products        from '../components/Products'
import AboutMe         from '../components/AboutMe'
import TechProjects    from '../components/TechProjects'
import Friends         from '../components/Friends'

// All six spotlight rows defined as data to keep JSX clean
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
    id: '7th',
    orient: 'left',
    folder: 'painting',
    previewImg: 'images/painting/0.jpg',
    title: 'Painting w/ mixed multi-media',
    body: `I have a deep love for oil painting, acrylics, pastel, and watercolor.
           Impressionism is one of the art movements I admire most, and I enjoy adding
           my own unique artistic touches to this style. Rather than replicating
           real-life scenes, I prefer creating dreamlike landscapes.`,
  },
]

export default function Home() {
  return (
    <div id="wrapper" className="divided">
      <Banner />

      {spotlights.map((s) => (
        <SpotlightSection key={s.id} {...s} />
      ))}

      <GallerySection />
      <Products />
      <AboutMe />
      <TechProjects />
      <Friends />
    </div>
  )
}
