/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT + LINKS LIVE HERE.
 *  To add a project / certificate / friend / price, edit this file only.
 *
 *  Anything with `todo: true` (or an empty href) renders a "TBD" tag on the
 *  page — fill in the real link and delete `todo` when you have it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const GH = 'https://github.com/yyzhangggg/my_website/tree/main'
const REDNOTE_PROFILE = 'https://xhslink.com/m/88ViesB2Tzd'

/* ── Social accounts (shared) ─────────────────────────────────────────────── */
export const social = {
  linkedin:   { icon: 'fab fa-linkedin-in', label: 'LinkedIn',  handle: 'yanying-zhang',   href: 'https://www.linkedin.com/in/yanying-zhang-a61943232' },
  github:     { icon: 'fab fa-github',      label: 'GitHub',    handle: 'yyzhangggg',      href: 'https://github.com/yyzhangggg' },
  email:      { icon: 'fas fa-envelope',    label: 'Email',     handle: 'product_sup_wYY@hotmail.com', href: 'mailto:product_sup_wYY@hotmail.com' },
  youtube:    { icon: 'fab fa-youtube',     label: 'YouTube',   handle: 'ML projects',     href: '', todo: true },

  // photography
  photoIg:    { icon: 'fab fa-instagram',   label: 'Instagram', handle: '@dumpmylibrary',  href: 'https://www.instagram.com/dumpmylibrary/' },
  photoXhs:   { icon: 'fas fa-camera-retro', label: 'RedNote · Portrait & Photoshoot Inquiries', handle: 'yanying', href: REDNOTE_PROFILE },

  // art
  rednote:    { icon: 'fas fa-pen-nib',     label: '小红书 RedNote', handle: 'yanying',     href: REDNOTE_PROFILE },
  artIg:      { icon: 'fab fa-instagram',   label: 'Instagram · Art', handle: 'art account', href: '', todo: true },

  // market
  sweaterIg:  { icon: 'fab fa-instagram',   label: 'Instagram · Knitwear', handle: 'sweater shop', href: '', todo: true },
  wechat:     { icon: 'fab fa-weixin',      label: 'WeChat',    handle: 'ID TBD',          href: '', todo: true },
}

/** Which accounts show on which page */
export const pageSocials = {
  home:        ['linkedin', 'github', 'youtube', 'email'],
  art:         ['artIg', 'email'],
  photography: ['photoIg', 'photoXhs'],
  network:     ['linkedin', 'github', 'rednote', 'email'],
  market:      ['sweaterIg', 'rednote', 'wechat', 'email'],
}

/* ── I. Built — websites & demos ──────────────────────────────────────────── */
export const built = [
  {
    name: 'ValleyRain — Mobile Massage Booking',
    tech: 'React 19 · TypeScript · Django 5 · PostgreSQL · Stripe',
    desc: 'Bilingual (EN/FR) booking platform for in-home massage in Greater Montréal — online booking, Stripe payments, gift cards, passwordless auth, admin dashboard.',
    live: 'https://in-home-massage.vercel.app/#/',
    code: '', codePrivate: true,
  },
  {
    name: 'Ref-Free Health Test Finder',
    tech: 'Next.js · React · Vercel',
    desc: 'Pour les francophones du Québec — self-pay medical tests in Canada & the US that need no referral letter. Keyword search, filters, clinic policies.',
    live: 'https://ref-free-health.vercel.app/',
    code: '', codePrivate: true,
  },
  {
    name: 'Pet DIY Products & In-Home Pet Shower',
    tech: 'Full-stack · in production',
    desc: 'Pet product DIY service and in-home pet shower booking platform.',
    live: '', code: '', todo: true,
  },
  {
    name: 'Architecture Art Portfolio',
    tech: 'Web · portfolio',
    desc: 'Portfolio site for architecture artwork.',
    live: '', code: '', todo: true,
  },
  {
    name: 'Hiking Club — International Events',
    tech: 'Web · events',
    desc: 'Website for a hiking club running international events.',
    live: '', code: '', todo: true,
  },
  {
    name: 'TicBridge — Autofill Chrome Extension',
    tech: 'Chrome Extension · JavaScript · Google Drive API',
    desc: 'Pulls the latest uploads from Google Drive, merges video chunks and autofills creator portals (TikTok, Rednote, Bilibili) — the final "Post" stays manual.',
    live: '',
    code: 'https://github.com/yyzhangggg/TicBridge',
  },
]

/* ── II. Code — computer science projects ─────────────────────────────────── */
export const code = [
  { group: 'ML / AI', name: 'CNN Image Classifier', tech: 'PyTorch · TensorFlow', href: `${GH}/ml-ai-projects/PyTorch_Tensorflow_CNN` },
  { group: 'ML / AI', name: 'NLP: Naive Bayes vs BERT', tech: 'Python · BERT', href: `${GH}/ml-ai-projects/Native_Bayes_BERT` },
  { group: 'ML / AI', name: 'Power Plant Output Prediction', tech: 'scikit-learn · RF vs LR', href: `${GH}/ml-ai-projects/ML_modeling_predict_electrical_energy` },
  { group: 'ML / AI', name: 'Qualitative Bankruptcy Regression', tech: 'Python · regression', href: `${GH}/ml-ai-projects/QualitativeBankruptcy_RregressionAnalysis` },
  { group: 'ML / AI', name: 'ML Planning Project', tech: 'planning · search', href: `${GH}/ml-ai-projects/ML%20planning%20project` },
  { group: 'Data', name: 'Insurance Data Analytics', tech: 'R · SQL · Python · 70k rows', href: `${GH}/data-analysis/insurance%20textual%20data%20analytics` },
  { group: 'Data', name: 'Numerical Methods Labs', tech: 'Python · Jupyter', href: `${GH}/data-analysis/numerical-method` },
  { group: 'Systems', name: 'OS Process Scheduler', tech: 'C · pthreads · FCFS/SJF/RR/Aging', href: `${GH}/os-projects-c/P1-Multi_Process_Scheduling` },
  { group: 'Systems', name: 'Shell Memory Management', tech: 'C · paging · shell', href: `${GH}/os-projects-c/P2-Shell_Memory_Management` },
  { group: 'Java', name: 'Chess Sudoku Solver', tech: 'Java · constraints · GUI', href: `${GH}/java-projects/chess-sudoku-solver` },
  { group: 'Java', name: 'Decision Tree Classifier', tech: 'Java', href: `${GH}/java-projects/decision-tree-classifier` },
  { group: 'Java', name: 'Solitaire Cipher', tech: 'Java · cryptography', href: `${GH}/java-projects/solitaire-cipher` },
]

/* ── III. Academic ────────────────────────────────────────────────────────── */
export const academic = {
  education: [
    { name: 'McGill University', meta: 'B.Sc. Computer Science, Minor in Mathematics', year: '2020 – 2025' },
    { name: 'Marianopolis College', meta: 'Health Science & Pure and Applied Mathematics', year: '2018 – 2019' },
  ],
  research: [
    { name: 'Research project', meta: 'lab / supervisor', year: '', href: '', todo: true },
  ],
  competitions: [
    { name: 'Competition', meta: 'award', year: '', href: '', todo: true },
  ],
  certificates: [
    { name: 'Certificate', meta: 'issuer', year: '', href: '', todo: true },
  ],
  videos: [
    { name: 'ML project walkthrough', meta: 'YouTube', year: '', href: '', todo: true },
  ],
}

/* ── Photography ──────────────────────────────────────────────────────────── */
export const photoSeries = [
  { folder: 'backlight', title: 'Back Light', cover: 'images/backlight/0.jpg',
    note: 'Everything reflects some special colour when the sunlight is on its back.' },
  { folder: 'arch', title: 'Architecture', cover: 'images/arch/0.jpg',
    note: 'Lines, rhythm and shadow in built space.' },
  { folder: 'flowers', title: 'Colours', cover: 'images/flowers/0.jpg',
    note: 'The flowers are pretty, but the leaves are prettier.' },
  { folder: 'nature', title: 'Nature', cover: 'images/nature/0.jpg',
    note: '“Changing scenery with each step” — walking through national parks.' },
  { folder: 'city', title: 'City Walk', cover: 'images/city/0.jpg',
    note: 'Streets, strangers, afternoons.' },
  { folder: 'forest', title: 'Forest', cover: 'images/forest/4.jpg',
    note: 'A cathedral where light filters through canopies.' },
]

/* ── Network — friends ────────────────────────────────────────────────────── */
export const friends = [
  { name: 'Luxi', tag: 'Friend', img: 'images/friendships/LUXI.JPG', note: 'A line about Luxi.', href: '', todo: true },
  { name: 'Eno', tag: 'Friend', img: 'images/friendships/eno.jpeg', note: 'A line about Eno.', href: '', todo: true },
]

/* ── Market — price chart ─────────────────────────────────────────────────── */
export const priceChart = [
  {
    category: 'Hand-knit Sweaters',
    rows: [
      { item: 'Classic pullover', detail: 'Hand-knit, made to order', price: 'TBD', todo: true },
      { item: 'Cardigan', detail: 'Hand-knit, made to order', price: 'TBD', todo: true },
      { item: 'Custom colour / size', detail: 'Message on Instagram', price: 'Quote' },
    ],
  },
  {
    category: 'Photography Sessions',
    rows: [
      { item: 'Solo / Portraits', detail: '1 h · 15+ edited photos · indoor or outdoor', price: '$59.99' },
      { item: 'Duo / Couple', detail: '1.5 h · 25+ edited photos', price: '$99.99' },
    ],
  },
  {
    category: 'Original Paintings',
    rows: [
      { item: 'Original works', detail: 'Oil · acrylic · pastel · watercolour — see Art', price: 'Inquire' },
    ],
  },
]

export const marketNote =
  'All items are handmade by families — not industrially produced — and may carry small imperfections from manual craftsmanship. Returns are not accepted for perceived imperfections.'
