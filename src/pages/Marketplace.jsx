import { useNavigate } from 'react-router-dom'

export default function Marketplace() {
  const navigate = useNavigate()

  return (
    <div id="wrapper" className="divided">
      <style>{`
        .mp-container {
          max-width: 860px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }
        .mp-back {
          display: inline-block;
          margin-bottom: 2rem;
          cursor: pointer;
          font-size: 0.9em;
          color: #888;
          background: none;
          border: none;
          text-decoration: underline;
        }
        .mp-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .mp-header h1 {
          margin-bottom: 0.5em;
        }
        .mp-section {
          margin-bottom: 3rem;
        }
        .mp-section h3 {
          margin-bottom: 1em;
        }
        .mp-disclaimer {
          margin-top: 2rem;
          padding: 1.5em;
          border-radius: 0.8em;
          background: rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.08);
          font-size: 0.9em;
          line-height: 1.7;
        }
      `}</style>

      <section className="wrapper style1 align-center">
        <div className="mp-container">
          <button className="mp-back" onClick={() => navigate('/')}>
            ← Back to Main
          </button>

          <div className="mp-header">
            <h1>Marketplace</h1>
            <p>Photography sessions and creative services</p>
          </div>

          <div className="mp-section">
            <div className="inner">
              <div className="index align-left">

                {/* Price Table */}
                <section>
                  <header>
                    <h3>Price Table</h3>
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

                {/* Contact Form */}
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

          <div className="mp-disclaimer">
            All items on display for sales are guaranteed to be handmade
            by families, which means they are not industrially produced
            and may have imperfections due to manual craftsmanship. If you
            are concerned about this, please refrain from purchasing. We
            will not accept returns or provide after-sales service because
            of the perceived imperfections.
          </div>

        </div>
      </section>
    </div>
  )
}
