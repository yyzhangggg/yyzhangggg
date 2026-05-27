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

          {/* Why Photography */}
          <section>
            <header>
              <h3><b>Why photography?</b></h3>
            </header>
            <div className="content">
              <p>
                I was grown up with a doctor family, and for my whole life I&apos;ve
                been taught to study Bio in order to get into a med school. I
                followed the instruction and lived to fulfil the expectations of
                parents. My career in health was quite successful until I got
                admitted to Marianopolis college, which has the best private
                health program in Montreal. However, this was also where I
                encountered the greatest setback in my journey of biological
                professions, and it ended up becoming the turning point in my
                life decision.
              </p>
              <p>
                I started by being interested in Photoshop digital editing in my
                young age, then gradually got into presenting as a model and
                producing dramatic photos. Yet later on, I gradually became more
                sure of what output I wanted to produce. What I long for is more
                freedom to record and actively capture moments of beauty, rather
                than merely appreciating my own beauty. Because of this shift in
                mindset, I began studying the theory of light and shadow, and
                fell in love with the style of film.
              </p>
              <p>
                I have always believed that if a gift is not used to its
                fullest, it is wasted — and I don&apos;t like waste! In the
                future, I will continue to use the black eyes God has given me
                to search for light, and to capture with my camera the shapes of
                light and the fleeting moments of shadow and illumination.
              </p>
            </div>
          </section>

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

          {/* Price Table */}
          <section>
            <header>
              <h3>Price Table</h3>
            </header>
            <div className="content">
              <h4>Seasonal</h4>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr><th>Name</th><th>Description</th><th>Price</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Summer Pack 1</td><td>Ante turpis integer aliquet porttitor.</td><td>59.99</td></tr>
                    <tr><td>Summer Pack 2</td><td>Vis ac commodo adipiscing arcu aliquet.</td><td>84.99</td></tr>
                    <tr><td>Winter Pack 1</td><td>Morbi faucibus arcu accumsan lorem.</td><td>69.99</td></tr>
                    <tr><td>Winter Pack 2</td><td>Vitae integer tempus condimentum.</td><td>99.99</td></tr>
                  </tbody>
                </table>
              </div>

              <h4>Regular</h4>
              <div className="table-wrapper">
                <table className="alt">
                  <thead>
                    <tr><th>Name</th><th>Description</th><th>Price</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Portraits</td><td>Ante turpis integer aliquet porttitor.</td><td>59.99</td></tr>
                    <tr><td>Birthday</td><td>Vis ac commodo adipiscing arcu aliquet.</td><td>49.99</td></tr>
                    <tr><td>Couple</td><td>Morbi faucibus arcu accumsan lorem.</td><td>99.99</td></tr>
                    <tr><td>Pets</td><td>Vitae integer tempus condimentum.</td><td>29.99</td></tr>
                    <tr><td>Customize</td><td>Ante turpis integer aliquet porttitor.</td><td>79.99</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <header><h3></h3></header>
            <div className="content">
              <div className="box">
                <p>
                  All items on display for sales are guaranteed to be handmade
                  by families, which means they are not industrially produced
                  and may have imperfections due to manual craftsmanship. If you
                  are concerned about this, please refrain from purchasing. We
                  will not accept returns or provide after-sales service because
                  of the perceived imperfections.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </section>
  )
}
