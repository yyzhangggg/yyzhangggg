import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

export const languages = { en: 'English', 'zh-CN': '简体中文', fr: 'Français' }
const LanguageContext = createContext(null)
const storageKey = 'portfolio-language'

function initialLanguage() {
  try {
    const saved = localStorage.getItem(storageKey)
    if (Object.hasOwn(languages, saved)) return saved
  } catch {
    // Language switching still works when browser storage is unavailable.
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    try {
      localStorage.setItem(storageKey, language)
    } catch {
      // Keep the language for the current visit.
    }
  }, [language])

  function t(message, values = {}) {
    const translated = translations.get(message)?.[language] ?? message
    return translated.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
