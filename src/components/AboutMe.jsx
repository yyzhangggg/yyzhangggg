export default function AboutMe() {
  return (
    <section className="wrapper style1 align-center">
      <div className="inner">
        <h2>About Me</h2>
        <p>
          Hey, Finally you are here, thank you for being patient to have a
          glimpse of my works. Here&apos;s some complementary information that
          could help you know more about me. They might not be artistic crafts
          but have special meanings that contribute to my personality and
          characters. Hope you will enjoy this section and know more about me :D
        </p>

        <div className="index align-left">

          {/* Favourite Verses */}
          <section>
            <header>
              <h3>Fav Verses</h3>
            </header>
            <div className="content">
              <blockquote>Genuine gold fears no furnace.</blockquote>
              <blockquote>Diamond cuts diamond, faith moves mountains.</blockquote>
            </div>
          </section>

          {/* Social Media */}
          <section>
            <header>
              <h3>Social Media</h3>
            </header>
            <div className="content">
              <ul className="icons">
                <li>
                  <a
                    href="https://www.instagram.com/my_photoraphy_site?igsh=MXIxYnQ0cm9vZmRpNQ%3D%3D&utm_source=qr"
                    className="icon brands style2 fa-instagram"
                  >
                    <span className="label">Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/yanying-zhang-a61943232"
                    className="icon brands style2 fa-linkedin"
                  >
                    <span className="label">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:product_sup_wYY@hotmail.com"
                    className="icon style2 fa-envelope"
                  >
                    <span className="label">Email</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/yyzhangggg/my_website"
                    className="icon brands style2 fa-github"
                  >
                    <span className="label">Github</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://xhslink.com/m/88ViesB2Tzd"
                    className="icon brands style2 fa-rednote"
                  >
                    <span className="label">RedNotes</span>
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Form */}
          <section>
            <header>
              <h3>Contact Form</h3>
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
                    <label htmlFor="department">Requests</label>
                    <select name="department" id="department">
                      <option value="">- What&apos;s for -</option>
                      <option value="1">Cooperating</option>
                      <option value="2">Win Free Model Experience</option>
                      <option value="3">Price Chart</option>
                      <option value="4">Customer Service</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" rows="6" />
                  </div>
                  <div className="field half">
                    <input type="checkbox" id="copy" name="copy" />
                    <label htmlFor="copy">Email me a copy of this message</label>
                  </div>
                  <div className="field half">
                    <input type="checkbox" id="human" name="human" defaultChecked />
                    <label htmlFor="human">I am a human and not a robot</label>
                  </div>
                </div>
                <ul className="actions">
                  <li>
                    <input type="submit" name="submit" id="submit" value="Send Message" />
                  </li>
                </ul>
              </form>
            </div>
          </section>

        </div>
      </div>
    </section>
  )
}
