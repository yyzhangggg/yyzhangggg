import { useNavigate } from 'react-router-dom'
import { asset } from '../utils/assetPath'
import TechProjects from '../components/TechProjects'
import AboutMe from '../components/AboutMe'
import Snowflake from '../components/Snowflake'

function ArtHero() {
  const navigate = useNavigate()

  return (
    <section className="wrapper style1">
      <style>{`
        .art-hero-wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .art-hero-card {
          position: relative;
          border-radius: 1.5em;
          overflow: hidden;
          cursor: pointer;
          height: 380px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .art-hero-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .art-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.55s ease;
        }
        .art-hero-card:hover .art-hero-bg {
          transform: scale(1.04);
        }
        .art-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,10,26,0.82) 0%,
            rgba(10,10,26,0.2) 100%
          );
        }
        .art-hero-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2.5em 3em;
          color: #fff;
        }
        .art-hero-content h3 {
          font-size: 1.8em;
          margin: 0 0 0.3em;
          color: #fff;
          text-shadow: 0 0 20px rgba(244,114,182,0.4);
        }
        .art-hero-content p {
          font-size: 1em;
          opacity: 0.85;
          margin: 0;
          line-height: 1.6;
          max-width: 500px;
          color: #fecdd3;
        }
        @media (max-width: 736px) {
          .art-hero-card { height: 260px; }
          .art-hero-content { padding: 2em; }
          .art-hero-content h3 { font-size: 1.4em; }
        }
      `}</style>

      <div className="art-hero-wrap">
        <div className="art-hero-card" onClick={() => navigate('/art')}>
          <div
            className="art-hero-bg"
            style={{ backgroundImage: `url(${asset('images/banner.jpg')})` }}
          />
          <div className="art-hero-overlay" />
          <div className="art-hero-content">
            <h3>Art Portfolio</h3>
            <p>Photography, painting, and creative writing — explore my artistic journey</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div id="wrapper" className="divided cyberpunk">
      <Snowflake />

      <section className="cyber-hero">
        <div className="cyber-hero-content">
          <h1 className="cyber-hero-title">Yanying Zhang</h1>
          <p className="cyber-hero-subtitle">
            Full-Stack Developer · ML/AI · Data Science
          </p>
          <p className="cyber-hero-desc">
            Building bilingual web platforms, training neural networks, and
            turning data into insight. Explore my technical projects below,
            or check out my art portfolio and marketplace.
          </p>
          <img
            src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fmy-website-yanying.vercel.app&label=visitors&countColor=%23f472b6&style=flat-square&labelColor=0a0a1a"
            alt="Visitors"
            style={{ display: 'block', margin: '1.5rem auto 0', height: '20px', opacity: 0.75 }}
          />
        </div>
      </section>

      <TechProjects />
      <ArtHero />
      <AboutMe />
    </div>
  )
}
