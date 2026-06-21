import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ArtPortfolio from './pages/ArtPortfolio'
import Marketplace from './pages/Marketplace'
import MyPeople from './pages/MyPeople'
import LoadMore from './pages/LoadMore'
import { usePreload, useScrollReveal } from './hooks/useScrollReveal'

function ScrollRevealManager() {
  usePreload()
  useScrollReveal()
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollRevealManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art" element={<ArtPortfolio />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/people" element={<MyPeople />} />
        <Route path="/gallery/:folder" element={<LoadMore />} />
      </Routes>
    </HashRouter>
  )
}
