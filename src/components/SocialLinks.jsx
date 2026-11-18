import { useLanguage } from '../i18n/Language'
import { social, pageSocials } from '../content/site'

/**
 * Renders the social accounts configured for a page in site.js.
 * Accounts without a link yet render as a disabled chip tagged "TBD".
 */
export default function SocialLinks({ page, className = '', showHandle = true }) {
  const { t } = useLanguage()
  const keys = pageSocials[page] || []
  return (
    <ul className={`social-links ${className}`}>
      {keys.map((k) => {
        const s = social[k]
        if (!s) return null
        const body = (
          <>
            <i className={s.icon} aria-hidden="true" />
            <span className="social-label">{t(s.label)}</span>
            {showHandle && <span className="social-handle">{t(s.handle)}</span>}
            {(s.todo || !s.href) && <span className="tbd">{t("TBD")}</span>}
          </>
        )
        return (
          <li key={k}>
            {s.href ? (
              <a className="social-chip" href={s.href} target="_blank" rel="noreferrer">{body}</a>
            ) : (
              <span className="social-chip is-todo" title={t("Link coming soon")}>{body}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
