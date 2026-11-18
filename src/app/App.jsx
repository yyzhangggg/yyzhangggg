import { HashRouter, Navigate, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ArtPortfolio from '../pages/ArtPortfolio'
import Photography from '../pages/Photography'
import MyPeople from '../pages/MyPeople'
import LoadMore from '../pages/LoadMore'
import Navbar from '../components/NavBar'
import { usePreload, useScrollReveal } from '../hooks/useScrollReveal'

function ScrollRevealManager() {
  usePreload()
  useScrollReveal()
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollRevealManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art" element={<ArtPortfolio />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/marketplace" element={<Navigate to="/photography" replace />} />
        <Route path="/people" element={<MyPeople />} />
        <Route path="/gallery/:folder" element={<LoadMore />} />
      </Routes>
    </HashRouter>
  )
}
