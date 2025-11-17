import { FiDownload, FiStar, FiShield } from 'react-icons/fi'
import './Hero.css'

function Hero({ release, loading }) {
  return (
    <section className="hero">
      <div className="bg-pattern"></div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <FiStar /> Nouvelle version disponible
        </div>
        
        <h1 className="hero-title">
          <span className="gradient-text">Center App</span>
          <br />
          Votre solution complète
        </h1>
        
        <p className="hero-description">
          Gérez votre entreprise, suivez vos employés, publiez du contenu et bien plus encore. 
          Tout ce dont vous avez besoin dans une seule application mobile.
        </p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{loading ? '...' : release?.version || 'N/A'}</span>
            <span className="stat-label">Version</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{loading ? '...' : release?.downloadCount || '0'}</span>
            <span className="stat-label">Téléchargements</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">Android</span>
            <span className="stat-label">{release?.minAndroidVersion || '5.0'}+</span>
          </div>
        </div>
        
        <div className="hero-actions">
          <a href="#download" className="btn btn-primary">
            <FiDownload size={20} />
            Télécharger maintenant
          </a>
          <a href="#features" className="btn btn-secondary">
            En savoir plus
          </a>
        </div>
        
        <div className="hero-trust">
          <FiShield size={16} />
          <span>100% Gratuit • Sans publicité • Open Source</span>
        </div>
      </div>
      
      <div className="hero-phone">
        <div className="phone-mockup">
          <div className="phone-screen">
            <div className="app-preview">
              <div className="preview-header">
                <div className="preview-dot"></div>
                <div className="preview-dot"></div>
                <div className="preview-dot"></div>
              </div>
              <div className="preview-content">
                <div className="preview-icon animate-float">
                  <svg viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
                    <path d="M30 50L45 65L70 35" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="100%" stopColor="#FFD700" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3>Center App</h3>
                <p>v{release?.version || '1.0.0'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
