import { useState } from 'react'
import axios from 'axios'
import { FiDownload, FiPackage, FiCheck, FiAlertCircle } from 'react-icons/fi'
import './Download.css'

function Download({ release, loading }) {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = async () => {
    if (!release) return

    setDownloading(true)
    
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
      const response = await axios.get(`${apiBaseUrl}/api/app/download/${release._id}`)
      
      if (response.data.success) {
        // Ouvrir le lien de téléchargement Cloudinary
        window.open(response.data.downloadUrl, '_blank')
        setDownloaded(true)
        
        setTimeout(() => {
          setDownloaded(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Erreur téléchargement:', error)
      alert('Erreur lors du téléchargement. Veuillez réessayer.')
    } finally {
      setDownloading(false)
    }
  }

  const formatSize = (bytes) => {
    if (!bytes) return 'N/A'
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(2)} MB`
  }

  return (
    <section id="download" className="download">
      <div className="download-container">
        <div className="download-content">
          <h2 className="section-title">
            Téléchargez <span className="gradient-text">Maintenant</span>
          </h2>
          <p className="section-description">
            Installation simple et rapide. Profitez de toutes les fonctionnalités en quelques minutes.
          </p>

          {loading ? (
            <div className="spinner"></div>
          ) : release ? (
            <>
              <div className="download-info">
                <div className="info-item">
                  <FiPackage size={24} />
                  <div>
                    <span className="info-label">Version</span>
                    <span className="info-value">{release.version}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FiPackage size={24} />
                  <div>
                    <span className="info-label">Taille</span>
                    <span className="info-value">{formatSize(release.apkSize)}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FiCheck size={24} />
                  <div>
                    <span className="info-label">Android</span>
                    <span className="info-value">{release.minAndroidVersion}+</span>
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-download"
                onClick={handleDownload}
                disabled={downloading || downloaded}
              >
                {downloading ? (
                  <>
                    <div className="spinner"></div>
                    Téléchargement...
                  </>
                ) : downloaded ? (
                  <>
                    <FiCheck size={20} />
                    Téléchargé !
                  </>
                ) : (
                  <>
                    <FiDownload size={20} />
                    Télécharger APK ({formatSize(release.apkSize)})
                  </>
                )}
              </button>

              {release.changelog && release.changelog.length > 0 && (
                <div className="changelog">
                  <h3>Nouveautés de cette version</h3>
                  <ul>
                    {release.changelog.map((change, index) => (
                      <li key={index}>
                        <FiCheck />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="no-release">
              <FiAlertCircle size={48} />
              <p>Aucune version disponible pour le moment</p>
            </div>
          )}
        </div>

        <div className="download-steps">
          <h3>Comment installer ?</h3>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Télécharger l'APK</h4>
                <p>Cliquez sur le bouton de téléchargement ci-dessus</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Autoriser les sources inconnues</h4>
                <p>Paramètres → Sécurité → Sources inconnues</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Installer l'application</h4>
                <p>Ouvrez le fichier APK et suivez les instructions</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Profitez !</h4>
                <p>Lancez Center App et commencez à l'utiliser</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download
