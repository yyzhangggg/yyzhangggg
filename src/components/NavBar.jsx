import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Index' },
  { path: '/art', label: 'Art' },
  { path: '/photography', label: 'Photography' },
  { path: '/people', label: 'Network' },
]

export default function Navbar() {
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
          top: 0.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          gap: 0.15rem;
          padding: 0.25rem;
          border-radius: 999px;
          background: rgba(15, 18, 22, 0.6);
          backdrop-filter: blur(24px) saturate(1.8);
          -webkit-backdrop-filter: blur(24px) saturate(1.8);
          border: 1px solid rgba(244, 242, 238, 0.14);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transition: background 0.3s ease;
        }
        .capsule-nav:hover {
          background: rgba(15, 18, 22, 0.78);
        }
        .capsule-nav-indicator {
          position: absolute;
          top: 0.25rem;
          height: calc(100% - 0.5rem);
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(196, 30, 58, 0.45), rgba(74, 120, 190, 0.3));
          box-shadow: 0 0 16px rgba(196, 30, 58, 0.18);
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
          color: rgba(244, 242, 238, 0.7) !important;
          text-shadow: none;
          font-size: 0.82rem;
          font-weight: 300;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: color 0.35s ease, text-shadow 0.35s ease;
          white-space: nowrap;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          text-transform: none;
          height: auto;
          line-height: 1.4;
          box-shadow: none;
        }
        .capsule-nav-item:hover {
          color: #fff !important;
          text-shadow: none;
        }
        .capsule-nav-item.active {
          color: #fff !important;
          text-shadow: none;
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
