// Raw GitHub URL prefix for product images (hosted on GitHub)
const RAW = 'https://raw.githubusercontent.com/yyzhangggg/my_website/main/docs/images/product'

// Products with a background/hover preview image
const paintingItems = [
  { file: '1.png',        desc: 'Light purple and sandy texture w/ decorative butterfly.' },
  { file: '2.png',        desc: "Cute Strawberry w/ needles and threads, could pair with its' younger sister piece." },
  { file: '3.png',        desc: "Cute Strawberry w/ needles and threads, could pair with its' elder sister piece." },
  { file: '4.png',        desc: 'Mountain rich in colours.' },
  { file: '5.png',        desc: 'A relief of worries and anxiety.' },
  { file: 'IMG_1280.JPG', desc: 'Glimpse of Bio science in artistic view, bridge the gap of science and art.' },
]

// Simple items without preview image
const simpleItems = [
  {
    icon: 'fa-gem',
    solid: false,
    name: 'Beading Flower Bracelet',
    desc: 'Inspired by endogenous beading, the vitality of daisies is expressed through springtime hues.',
  },
  {
    icon: 'fa-save',
    solid: true,
    name: 'Scrunchies',
    desc: 'Handmade Italian lace scrunchies in a girlish style, featuring a square design.',
  },
  ...['purple', 'green', 'mix', 'fading'].map((colour) => ({
    icon: 'fa-leaf',
    solid: true,
    name: 'Grape Soap',
    desc: `Pure and 100% nature grape scent come with ${colour} grape colours, get your most recent INS popular styled life.`,
  })),
]

function ProductPreview({ file, desc }) {
  const src = `${RAW}/${file}`
  return (
    <section
      className="product-preview"
      style={{ backgroundImage: `url('${src}')` }}
    >
      <span className="icon solid style2 major fa-leaf" />
      <h3>Decorative painting</h3>
      <p>{desc}</p>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        className="hover-view"
        src={src}
        alt="Decorative painting preview"
      />
    </section>
  )
}

function SimpleItem({ icon, solid, name, desc }) {
  const iconClass = `icon ${solid ? 'solid ' : ''}style2 major ${icon}`
  return (
    <section>
      <span className={iconClass} />
      <h3>{name}</h3>
      <p>{desc}</p>
    </section>
  )
}

export default function Products() {
  return (
    <section className="wrapper style1 align-center">
      <div className="inner">
        <h2>Products</h2>
        <p>
          This is a mini-market place for <strong>Hand-made</strong> products,
          and it&apos;s 100% distinct. With limited productivity, we cannot take
          any large amount orders. If you <strong>cannot</strong> see the items,
          it means it has already been sold.
        </p>
        <div className="items style3 medium onscroll-fade-in">
          {/* Simple items first (bracelet, scrunchies) */}
          {simpleItems.slice(0, 2).map((item, i) => (
            <SimpleItem key={i} {...item} />
          ))}

          {/* Painting items with preview */}
          {paintingItems.map((p, i) => (
            <ProductPreview key={i} {...p} />
          ))}

          {/* Soap items */}
          {simpleItems.slice(2).map((item, i) => (
            <SimpleItem key={i + 2} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
