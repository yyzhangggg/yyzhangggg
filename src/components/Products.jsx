const RAW = 'https://raw.githubusercontent.com/yyzhangggg/my_website/main/docs/images/product'

const paintings = [
  { file: '1.png',        title: 'Texture Study',        desc: 'Light purple and sandy texture with decorative butterfly motif.' },
  { file: '2.png',        title: 'Strawberry Sister I',  desc: 'Cute strawberry with needles and threads — pairs with its younger sister piece.' },
  { file: '3.png',        title: 'Strawberry Sister II', desc: 'Cute strawberry with needles and threads — pairs with its elder sister piece.' },
  { file: '4.png',        title: 'Mountain in Colour',   desc: 'A mountain landscape rich in layered, vibrant colours.' },
  { file: '5.png',        title: 'Relief',               desc: 'A visual expression of releasing worries and anxiety.' },
  { file: 'IMG_1280.JPG', title: 'BioArt',              desc: 'A glimpse of biological science through an artistic lens — bridging science and art.' },
]

function PaintingCard({ file, title, desc }) {
  const src = `${RAW}/${file}`
  return (
    <section
      className="product-preview"
      style={{ backgroundImage: `url('${src}')` }}
    >
      <span className="icon solid style2 major fa-paint-brush" />
      <h3>{title}</h3>
      <p>{desc}</p>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        className="hover-view"
        src={src}
        alt={`Painting: ${title}`}
      />
    </section>
  )
}

export default function Products() {
  return (
    <section className="wrapper style1 align-center">
      <div className="inner">
        <h2>My Paintings</h2>
        <p>
          A collection of my <strong>original paintings</strong> across various media —
          oil, acrylic, pastel, and mixed media. Each piece is a personal exploration
          of colour, texture, and emotion.
        </p>
        <div className="items style3 medium onscroll-fade-in">
          {paintings.map((p, i) => (
            <PaintingCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
