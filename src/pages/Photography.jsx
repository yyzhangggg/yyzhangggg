import { useLanguage } from '../i18n/Language'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { photographyAddOns, photographyPackages, photoSeries } from '../content/site'
import { asset } from '../utils/assetPath'
import SocialLinks from '../components/SocialLinks'
import '../styles/pages.css'

const seriesStories = {
  backlight: 'When the sun sits behind a subject, ordinary edges start to glow. This series follows the colours that appear in that thin band of light.',
  arch: 'A facade becomes a pattern when you look at it long enough. Repeated lines set the rhythm, and shadows tell you where to pause.',
  flowers: 'The flowers draw the eye first, but the leaves hold their own colours. Up close, the greens are as varied as the petals.',
  nature: 'On a walk through a national park, the view changes with each step. These frames collect the quiet shifts between one view and the next.',
  city: 'An afternoon walk makes room for small scenes between destinations. These photographs notice streets, passing strangers, and the spaces they share.',
  forest: 'Under the canopy, light comes through in patches. The trees give those bright openings the stillness of a cathedral.',
}

function SeriesPreview({ folder, title, cover }) {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  const extraPhotos = folder === 'forest' ? [7, 8] : [1, 2]
  const photos = [cover, ...extraPhotos.map((number) => `images/${folder}/${number}.jpg`)]

  function scrub(event) {
    if (event.pointerType !== 'mouse') return
    const { left, width } = event.currentTarget.getBoundingClientRect()
    setIndex(Math.min(photos.length - 1, Math.max(0, Math.floor((event.clientX - left) / width * photos.length))))
  }

  return (
    <div className="photo-series-images">
      <div className="photo-preview-window" onPointerMove={scrub}>
        <div className="photo-preview-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {photos.map((src, i) => (
            <img key={src} src={asset(src)} alt={t("{title} preview {number}", { title, number: i + 1 })} aria-hidden={i !== index} loading="lazy" />
          ))}
        </div>
      </div>
      <button type="button" className="photo-preview-prev" aria-label={t("Previous {title} photo", { title })}
        onClick={() => setIndex((index + photos.length - 1) % photos.length)}>‹</button>
      <button type="button" className="photo-preview-next" aria-label={t("Next {title} photo", { title })}
        onClick={() => setIndex((index + 1) % photos.length)}>›</button>
    </div>
  )
}

export default function Photography() {
  const { t } = useLanguage()
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
    <main className="photo-page">
      <style>{`
        .photo-page {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 100vh;
          color: #191919;
          background: #fff;
          color-scheme: light;
        }
        .photo-page :is(h1, h2, h3, a, strong, label) { color: inherit; }
        .photo-page :is(input, select, textarea) { color: #191919; background-color: #fff; }
        .photo-page input[type="submit"] { box-shadow: inset 0 0 0 1px #aaa; }
        .photo-page tbody tr:nth-child(odd) { background-color: #fff; }
        .mp-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 6rem clamp(16px, 4vw, 48px) 4rem;
        }
        .photo-panel {
          border: 1px solid #dedede;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 12px 30px #0000000f;
        }
        .mp-header, .mp-section {
          padding: clamp(16px, 4vw, 42px);
        }
        .mp-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .mp-header h1 { margin-bottom: 0.5em; }
        .photo-social { justify-content: center; margin-bottom: 1.5rem; }
        .mp-section { margin-bottom: 3rem; scroll-margin-top: 5rem; }
        .mp-section h3 { margin-bottom: 1em; }
        .photo-series {
          display: grid;
          gap: clamp(18px, 4vw, 42px);
        }
        .photo-series-card {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
          grid-template-areas: 'images copy';
          align-items: center;
          overflow: hidden;
          text-align: left;
          text-decoration: none;
        }
        .photo-series-card:nth-child(even) {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
          grid-template-areas: 'copy images';
        }
        .photo-series-card:hover, .photo-series-card:focus-within { border-color: #545454; }
        .photo-series-images {
          grid-area: images;
          position: relative;
          min-width: 0;
        }
        .photo-preview-window { overflow: hidden; }
        .photo-preview-track {
          display: flex;
          transition: transform 240ms ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .photo-preview-track { transition: none; }
        }
        .photo-series-images img {
          display: block;
          flex: 0 0 100%;
          min-width: 0;
          width: 100%;
          height: clamp(180px, 25vw, 320px);
          object-fit: cover;
        }
        .photo-series-images button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          padding: 0;
          line-height: 1;
          font-size: 24px;
          border-radius: 50%;
          color: #fff !important;
          background: #000b;
        }
        .photo-preview-prev { left: 8px; }
        .photo-preview-next { right: 8px; }
        .photo-series-copy { grid-area: copy; padding: clamp(16px, 3vw, 32px); }
        .photo-series-copy h3 { margin-bottom: 0.35rem; }
        .photo-series-copy p { margin: 0 0 0.75rem; }
        .photo-series-action { text-decoration: underline; text-underline-offset: 0.2em; }
        @media (max-width: 700px) {
          .photo-series-card, .photo-series-card:nth-child(even) {
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: 'images' 'copy';
          }
        }
      `}</style>

      <section className="align-center">
        <div className="mp-container">

          <div className="mp-header">
            <h1>{t("Photography")}</h1>
            <SocialLinks page="photography" className="photo-social" />
          </div>

          <section className="mp-section photo-panel" id="galleries">
            <h2>{t("Galleries")}</h2>
            <div className="photo-series">
              {photoSeries.map(({ folder, title, cover }) => (
                <article key={folder} className="photo-series-card photo-panel">
                  <SeriesPreview folder={folder} title={t(title)} cover={cover} />
                  <div className="photo-series-copy">
                    <h3>{t(title)}</h3>
                    <p>{t(seriesStories[folder])}</p>
                    <Link className="photo-series-action" to={`/gallery/${folder}`} aria-label={t("View {title} gallery", { title: t(title) })}>{t("View gallery →")}</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── Photography Price Table ── */}
          <div className="mp-section photo-panel" id="pricing">
            <div className="inner">
              <div className="index align-left">
                <section>
                  <header>
                    <h3>{t("Photography Pricing")}</h3>
                  </header>
                  <div className="content">
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr><th>{t("Package")}</th><th>{t("Description")}</th><th>{t("Price")}</th></tr>
                        </thead>
                        <tbody>
                          {[...photographyPackages, ...photographyAddOns].map(({ item, detail, price }) => (
                            <tr key={item}>
                              <td>{t(item)}</td>
                              <td>{t(detail)}</td>
                              <td>{t(price)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* ── Book a Session ── */}
          <div className="mp-section photo-panel" id="booking">
            <div className="inner">
              <div className="index align-left">
                <section>
                  <header>
                    <h3>{t("Book a Session")}</h3>
                  </header>
                  <div className="content">
                    <form method="post" action="#">
                      <div className="fields">
                        <div className="field half">
                          <label htmlFor="name">{t("Name")}</label>
                          <input type="text" name="name" id="name" defaultValue="" />
                        </div>
                        <div className="field half">
                          <label htmlFor="email">{t("Email")}</label>
                          <input type="email" name="email" id="email" defaultValue="" />
                        </div>
                        <div className="field">
                          <label htmlFor="package">{t("Package")}</label>
                          <select name="package" id="package">
                            <option value="">{t("- Select a package -")}</option>
                            {photographyPackages.map(({ id, item }) => (
                              <option key={id} value={id}>{t(item)}</option>
                            ))}
                            <option value="custom">{t("Custom Request")}</option>
                          </select>
                        </div>
                        <div className="field">
                          <label htmlFor="message">{t("Message")}</label>
                          <textarea name="message" id="message" rows="5" />
                        </div>
                      </div>
                      <ul className="actions">
                        <li>
                          <input type="submit" name="submit" value={t("Send Request")} />
                        </li>
                      </ul>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
