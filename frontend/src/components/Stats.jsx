import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiDownload, FiUsers, FiTrendingUp } from 'react-icons/fi'
import './Stats.css'

function Stats() {
  const [stats, setStats] = useState(null)

  const fetchStats = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
      const response = await axios.get(`${apiBaseUrl}/api/stats/downloads`)
      if (response.data.success) {
        setStats(response.data.stats)
      }
    } catch (error) {
      console.error('Erreur chargement stats:', error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <section className="stats">
      <div className="stats-container">
        <div className="stat-box">
          <div className="stat-icon">
            <FiDownload />
          </div>
          <div className="stat-content">
            <h3>{stats?.total || '0'}</h3>
            <p>Téléchargements</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>2+</h3>
            <p>Utilisateurs Actifs</p>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">
            <FiTrendingUp />
          </div>
          <div className="stat-content">
            <h3>4.9/5</h3>
            <p>Note Moyenne</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
