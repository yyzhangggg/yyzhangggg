const RAW = 'https://raw.githubusercontent.com/yyzhangggg/my_website/main/docs/images/product'

const paintings = [
  { file: '1.png',        title: 'Texture Study',        desc: 'Light purple and sandy texture with decorative butterfly motif.' },
  { file: '2.png',        title: 'Strawberry Sister I',  desc: 'Cute strawberry with needles and threads — pairs with its younger sister piece.' },
  { file: '3.png',        title: 'Strawberry Sister II', desc: 'Cute strawberry with needles and threads — pairs with its elder sister piece.' },
  { file: '4.png',        title: 'Mountain in Colour',   desc: 'A mountain landscape rich in layered, vibrant colours.' },
  { file: '5.png',        title: 'Relief',               desc: 'A visual expression of releasing worries and anxiety.' },
  { file: 'IMG_1280.JPG', title: 'BioArt',               desc: 'A glimpse of biological science through an artistic lens — bridging science and art.' },
]

function PaintingCard({ file, title, desc }) {
  const src = `${RAW}/${file}`
  return (
    <div className="paint-card">
      <div className="paint-img">
        <img src={src} alt={`Painting: ${title}`} loading="lazy" />
      </div>
      <div className="paint-info">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <section className="wrapper style1" id="paintings">
      <style>{`
        .paint-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        @media (max-width: 1280px) { .paint-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 736px)  { .paint-grid { grid-template-columns: 1fr; } }

        .paint-card {
          border-radius: 0.9em;
          overflow: hidden;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          transition: transform .28s ease, box-shadow .28s ease;
        }
        .paint-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 28px rgba(0,0,0,.22);
        }
        .paint-img {
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .paint-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .4s ease;
          display: block;
        }
        .paint-card:hover .paint-img img {
          transform: scale(1.06);
        }
        .paint-info {
          padding: .85em 1em 1em;
        }
        .paint-info h3 {
          margin: 0 0 .3em;
          font-size: .95em;
          font-weight: 600;
        }
        .paint-info p {
          font-size: .78em;
          opacity: .7;
          margin: 0;
          line-height: 1.5;
        }
      `}</style>

      <div className="z-row z-flip">
        <div className="z-label">
          <h2>My Paintings</h2>
          <p>
            A collection of my <strong>original paintings</strong> across various
            media — oil, acrylic, pastel, and mixed media. Each piece is a
            personal exploration of colour, texture, and emotion.
          </p>
        </div>
        <div className="z-body">
          <div className="paint-grid">
            {paintings.map((p, i) => (
              <PaintingCard key={i} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
