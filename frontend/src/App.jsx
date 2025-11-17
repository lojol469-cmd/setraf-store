import { useState, useEffect } from 'react'
import axios from 'axios'
import Hero from './components/Hero'
import Features from './components/Features'
import Download from './components/Download'
import Screenshots from './components/Screenshots'
import Stats from './components/Stats'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [latestRelease, setLatestRelease] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestRelease()
  }, [])

  const fetchLatestRelease = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
      const response = await axios.get(`${apiBaseUrl}/api/app/latest`)
      if (response.data.success) {
        setLatestRelease(response.data.release)
      }
    } catch (error) {
      console.error('Erreur chargement app:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <Hero release={latestRelease} loading={loading} />
      <Features />
      <Download release={latestRelease} loading={loading} />
      <Screenshots release={latestRelease} />
      <Stats />
      <Footer />
    </div>
  )
}

export default App
