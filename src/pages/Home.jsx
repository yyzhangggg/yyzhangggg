import { useNavigate } from 'react-router-dom'
import { asset } from '../utils/assetPath'
import TechProjects from '../components/TechProjects'
import AboutMe from '../components/AboutMe'
import Snowflake from '../components/Snowflake'

function NavCards() {
  const navigate = useNavigate()

  return (
    <section className="wrapper style1">
      <style>{`
        .nav-cards {
          display: flex;
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .nav-card {
          flex: 1;
          position: relative;
          border-radius: 1.2em;
          overflow: hidden;
          cursor: pointer;
          min-height: 280px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .nav-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.2);
        }
        .nav-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.4s ease;
        }
        .nav-card:hover .nav-card-bg {
          transform: scale(1.05);
        }
        .nav-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%);
        }
        .nav-card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2em;
          color: #fff;
        }
        .nav-card-content h3 {
          font-size: 1.4em;
          margin: 0 0 0.3em;
          color: #fff;
        }
        .nav-card-content p {
          font-size: 0.9em;
          opacity: 0.85;
          margin: 0;
          line-height: 1.5;
        }
        @media (max-width: 736px) {
          .nav-cards {
            flex-direction: column;
          }
          .nav-card {
            min-height: 200px;
          }
        }
      `}</style>

      <div className="nav-cards">
        <div className="nav-card" onClick={() => navigate('/art')}>
          <div
            className="nav-card-bg"
            style={{ backgroundImage: `url(${asset('images/banner.jpg')})` }}
          />
          <div className="nav-card-overlay" />
          <div className="nav-card-content">
            <h3>Art Portfolio</h3>
            <p>Photography, painting, and creative writing</p>
          </div>
        </div>

        <div className="nav-card" onClick={() => navigate('/marketplace')}>
          <div
            className="nav-card-bg"
            style={{ backgroundImage: `url(${asset('images/painting/0.jpg')})` }}
          />
          <div className="nav-card-overlay" />
          <div className="nav-card-content">
            <h3>Marketplace</h3>
            <p>Photography sessions and services</p>
          </div>
        </div>

        <div className="nav-card" onClick={() => navigate('/people')}>
          <div
            className="nav-card-bg"
            style={{ backgroundImage: `url(${asset('images/friends/01.jpg')})` }}
          />
          <div className="nav-card-overlay" />
          <div className="nav-card-content">
            <h3>My People</h3>
            <p>The beautiful souls who colour my world</p>
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
          <a href="#tech-projects" className="button big wide">
            View Projects
          </a>
        </div>
      </section>

      <TechProjects />
      <NavCards />
      <AboutMe />
    </div>
  )
}
