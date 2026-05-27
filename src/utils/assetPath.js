/**
 * Prepend the Vite base URL so image/asset paths work on both
 * localhost (dev) and GitHub Pages (/my_website/).
 *
 * Usage:  <img src={asset('images/banner.jpg')} />
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
