import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePreload() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove('is-preload')
    }, 100)
    return () => clearTimeout(timer)
  }, [])
}

export function useScrollReveal() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      const targets = document.querySelectorAll(
        '#wrapper > section, #wrapper > .wrapper, .items'
      )

      targets.forEach(el => el.classList.add('is-inactive'))

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('is-inactive')
            }
          })
        },
        { rootMargin: '-15% 0px -15% 0px', threshold: 0 }
      )

      targets.forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, 50)

    return () => clearTimeout(timer)
  }, [location.pathname])
}
