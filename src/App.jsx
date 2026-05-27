import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoadMore from './pages/LoadMore'

// HashRouter works on GitHub Pages without any server config:
//   /my_website/#/          → Home
//   /my_website/#/gallery/backlight  → gallery lightbox page

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery/:folder" element={<LoadMore />} />
      </Routes>
    </HashRouter>
  )
}
