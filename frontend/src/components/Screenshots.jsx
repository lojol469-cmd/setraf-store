import './Screenshots.css'

function Screenshots({ release }) {
  const defaultScreenshots = [
    { caption: 'Tableau de bord', color: '#00D4FF' },
    { caption: 'Publications', color: '#FFD700' },
    { caption: 'Géolocalisation', color: '#00ff88' },
    { caption: 'Chat IA', color: '#ff6b6b' }
  ]

  const screenshots = release?.screenshots || defaultScreenshots

  return (
    <section className="screenshots">
      <div className="screenshots-header">
        <h2 className="section-title">
          Captures d'<span className="gradient-text">Écran</span>
        </h2>
        <p className="section-description">
          Découvrez l'interface intuitive et moderne de Center App
        </p>
      </div>

      <div className="screenshots-grid">
        {screenshots.map((screenshot, index) => (
          <div 
            key={index} 
            className="screenshot-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="screenshot-phone">
              {screenshot.url ? (
                <img src={screenshot.url} alt={screenshot.caption} />
              ) : (
                <div 
                  className="screenshot-placeholder"
                  style={{ background: `linear-gradient(135deg, ${screenshot.color}, ${screenshot.color}88)` }}
                >
                  <span>{screenshot.caption}</span>
                </div>
              )}
            </div>
            {screenshot.caption && (
              <p className="screenshot-caption">{screenshot.caption}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Screenshots
