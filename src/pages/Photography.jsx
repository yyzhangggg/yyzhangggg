import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { photoSeries } from '../content/site'
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

export default function Photography() {
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
          color: #f5f5f5;
          background: #080808;
          color-scheme: dark;
        }
        .photo-page::before, .photo-page::after {
          content: '';
          position: absolute;
          inset: -12%;
          z-index: -1;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 26% 25%, #ffffff46, transparent 44%),
            radial-gradient(ellipse at 78% 62%, #ffffff30, transparent 43%),
            radial-gradient(ellipse at 42% 83%, #ffffff26, transparent 40%);
          filter: blur(48px);
          animation: photo-smoke 16s ease-in-out infinite alternate;
        }
        .photo-page::after {
          opacity: 0.65;
          animation: photo-smoke 22s ease-in-out infinite alternate-reverse;
        }
        @keyframes photo-smoke {
          0% { transform: translate(-5%, -3%) scale(1); }
          50% { transform: translate(3%, 2%) scale(1.09) rotate(5deg); }
          100% { transform: translate(6%, -4%) scale(1.14) rotate(-4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .photo-page::before, .photo-page::after { animation: none; }
        }
        .photo-page :is(h1, h2, h3, a, strong, label) { color: inherit; }
        .photo-page :is(input, select, textarea) { color: #f5f5f5; background-color: #181818; }
        .photo-page input[type="submit"] { box-shadow: inset 0 0 0 1px #aaa; }
        .photo-page tbody tr:nth-child(odd) { background-color: #ffffff12; }
        .mp-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 6rem clamp(16px, 4vw, 48px) 4rem;
        }
        .photo-glass {
          border: 1px solid #ffffff38;
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff16, #ffffff07);
          backdrop-filter: blur(18px);
          box-shadow: 0 18px 44px #0008, inset 0 1px 0 #ffffff14;
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
        .photo-jump {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem 1.5rem;
        }
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
        .photo-series-card:hover, .photo-series-card:focus-visible { border-color: #fff; }
        .photo-series-images {
          grid-area: images;
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 2px;
        }
        .photo-series-images img {
          display: block;
          width: 100%;
          height: clamp(180px, 25vw, 320px);
          object-fit: cover;
        }
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

          <div className="mp-header photo-glass">
            <h1>Photography</h1>
            <p>Portrait and couple sessions</p>
            <SocialLinks page="photography" className="photo-social" />
            <nav className="photo-jump" aria-label="Photography sections">
              <Link to="#galleries">Galleries</Link>
              <Link to="#pricing">Pricing</Link>
              <Link to="#booking">Book a Session</Link>
            </nav>
          </div>

          <section className="mp-section photo-glass" id="galleries">
            <h2>Galleries</h2>
            <div className="photo-series">
              {photoSeries.map(({ folder, title, cover }) => (
                <Link key={folder} className="photo-series-card photo-glass" to={`/gallery/${folder}`}>
                  <div className="photo-series-images">
                    <img src={asset(cover)} alt="" loading="lazy" />
                    <img src={asset(`images/${folder}/${folder === 'forest' ? 7 : 1}.jpg`)} alt="" loading="lazy" />
                  </div>
                  <div className="photo-series-copy">
                    <h3>{title}</h3>
                    <p>{seriesStories[folder]}</p>
                    <span className="photo-series-action">View gallery →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Photography Price Table ── */}
          <div className="mp-section photo-glass" id="pricing">
            <div className="inner">
              <div className="index align-left">
                <section>
                  <header>
                    <h3>Photography Pricing</h3>
                  </header>
                  <div className="content">
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr><th>Package</th><th>Description</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Solo / Portraits</td>
                            <td>1-hour session, 15+ edited photos, indoor or outdoor location of your choice.</td>
                            <td>$59.99</td>
                          </tr>
                          <tr>
                            <td>Duo / Couple</td>
                            <td>1.5-hour session, 25+ edited photos, perfect for couples, friends, or siblings.</td>
                            <td>$99.99</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* ── Book a Session ── */}
          <div className="mp-section photo-glass" id="booking">
            <div className="inner">
              <div className="index align-left">
                <section>
                  <header>
                    <h3>Book a Session</h3>
                  </header>
                  <div className="content">
                    <form method="post" action="#">
                      <div className="fields">
                        <div className="field half">
                          <label htmlFor="name">Name</label>
                          <input type="text" name="name" id="name" defaultValue="" />
                        </div>
                        <div className="field half">
                          <label htmlFor="email">Email</label>
                          <input type="email" name="email" id="email" defaultValue="" />
                        </div>
                        <div className="field">
                          <label htmlFor="package">Package</label>
                          <select name="package" id="package">
                            <option value="">- Select a package -</option>
                            <option value="solo">Solo / Portraits</option>
                            <option value="duo">Duo / Couple</option>
                            <option value="custom">Custom Request</option>
                          </select>
                        </div>
                        <div className="field">
                          <label htmlFor="message">Message</label>
                          <textarea name="message" id="message" rows="5" />
                        </div>
                      </div>
                      <ul className="actions">
                        <li>
                          <input type="submit" name="submit" value="Send Request" />
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
