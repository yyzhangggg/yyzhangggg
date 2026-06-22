import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/art', label: 'Art' },
  { path: '/marketplace', label: 'Market' },
  { path: '/people', label: 'Network' },
]

export default function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const [ready, setReady] = useState(false)

  const isActive = useCallback(
    (path) => {
      if (path === '/art') {
        return location.pathname === '/art' || location.pathname.startsWith('/gallery')
      }
      return location.pathname === path
    },
    [location.pathname],
  )

  useEffect(() => {
    const update = () => {
      if (!navRef.current) return
      const active = navRef.current.querySelector('.capsule-nav-item.active')
      if (active) {
        const navRect = navRef.current.getBoundingClientRect()
        const btnRect = active.getBoundingClientRect()
        setIndicator({
          left: btnRect.left - navRect.left,
          width: btnRect.width,
        })
        setReady(true)
      }
    }
    requestAnimationFrame(update)
  }, [location.pathname])

  return (
    <nav className="capsule-nav" ref={navRef}>
      <style>{`
        .capsule-nav {
          position: fixed;
          top: 1.2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          gap: 0.15rem;
          padding: 0.25rem;
          border-radius: 999px;
          background: rgba(15, 15, 40, 0.55);
          backdrop-filter: blur(24px) saturate(1.8);
          -webkit-backdrop-filter: blur(24px) saturate(1.8);
          border: 1px solid rgba(244, 114, 182, 0.18);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transition: background 0.3s ease;
        }
        .capsule-nav:hover {
          background: rgba(15, 15, 40, 0.7);
        }
        .capsule-nav-indicator {
          position: absolute;
          top: 0.25rem;
          height: calc(100% - 0.5rem);
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(244, 114, 182, 0.3), rgba(96, 165, 250, 0.2));
          box-shadow: 0 0 20px rgba(244, 114, 182, 0.15), inset 0 0 8px rgba(244, 114, 182, 0.08);
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .capsule-nav-item {
          position: relative;
          z-index: 1;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: color 0.35s ease;
          white-space: nowrap;
          font-family: inherit;
        }
        .capsule-nav-item:hover {
          color: rgba(255, 255, 255, 0.92);
        }
        .capsule-nav-item.active {
          color: #fff;
          text-shadow: 0 0 12px rgba(244, 114, 182, 0.4);
        }
        @media (max-width: 500px) {
          .capsule-nav {
            padding: 0.28rem;
            gap: 0.12rem;
          }
          .capsule-nav-item {
            padding: 0.42rem 0.8rem;
            font-size: 0.72rem;
          }
        }
      `}</style>

      {ready && (
        <div
          className="capsule-nav-indicator"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}

      {navItems.map((item) => (
        <button
          key={item.path}
          className={`capsule-nav-item${isActive(item.path) ? ' active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
