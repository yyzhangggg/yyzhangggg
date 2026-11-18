import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { photoSeries } from '../content/site'
import SocialLinks from '../components/SocialLinks'
import '../styles/pages.css'

export default function Photography() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  return (
    <div id="wrapper" className="divided">
      <style>{`
        .mp-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem;
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
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
          gap: 1rem;
        }
        .photo-series a {
          display: block;
          padding: 1rem;
          border: 1px solid currentColor;
          text-align: left;
        }
        .photo-series strong, .photo-series span { display: block; }
      `}</style>

      <section className="wrapper style1 align-center">
        <div className="mp-container">

          <div className="mp-header">
            <h1>Photography</h1>
            <p>Portrait and couple sessions</p>
            <SocialLinks page="photography" className="photo-social" />
            <nav className="photo-jump" aria-label="Photography sections">
              <Link to="#galleries">Galleries</Link>
              <Link to="#pricing">Pricing</Link>
              <Link to="#booking">Book a Session</Link>
            </nav>
          </div>

          <section className="mp-section" id="galleries">
            <h2>Galleries</h2>
            <div className="photo-series">
              {photoSeries.map(({ folder, title, note }) => (
                <Link key={folder} to={`/gallery/${folder}`}>
                  <strong>{title}</strong>
                  <span>{note}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Photography Price Table ── */}
          <div className="mp-section" id="pricing">
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
          <div className="mp-section" id="booking">
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
    </div>
  )
}
