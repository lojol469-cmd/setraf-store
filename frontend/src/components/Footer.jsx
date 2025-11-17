import { FiGithub, FiMail, FiHeart } from 'react-icons/fi'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Center App Store</h3>
          <p>Votre solution complète pour la gestion d'entreprise</p>
        </div>

        <div className="footer-section">
          <h4>Liens Rapides</h4>
          <ul>
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#download">Télécharger</a></li>
            <li><a href="#screenshots">Screenshots</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="mailto:nyundumathryme@gmail.com">
              <FiMail /> Contact
            </a></li>
            <li><a href="https://github.com/BelikanM" target="_blank" rel="noopener noreferrer">
              <FiGithub /> GitHub
            </a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Fait avec <FiHeart className="heart" /> par BelikanM
        </p>
        <p>© 2025 Center App. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer
