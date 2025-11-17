import { FiUsers, FiMapPin, FiImage, FiMessageCircle, FiBarChart, FiShield } from 'react-icons/fi'
import './Features.css'

const features = [
  {
    icon: <FiUsers />,
    title: 'Gestion des Employés',
    description: 'Suivez et gérez vos employés en temps réel avec géolocalisation et présences'
  },
  {
    icon: <FiMapPin />,
    title: 'Géolocalisation',
    description: 'Localisez vos employés sur une carte interactive en temps réel'
  },
  {
    icon: <FiImage />,
    title: 'Publications & Stories',
    description: 'Partagez des photos, vidéos et stories avec votre équipe'
  },
  {
    icon: <FiMessageCircle />,
    title: 'Chat IA Intégré',
    description: 'Assistant intelligent pour répondre à toutes vos questions'
  },
  {
    icon: <FiBarChart />,
    title: 'Statistiques',
    description: 'Tableaux de bord et analyses détaillées de votre activité'
  },
  {
    icon: <FiShield />,
    title: 'Sécurisé',
    description: 'Authentification JWT, chiffrement et protection des données'
  }
]

function Features() {
  return (
    <section id="features" className="features">
      <div className="features-header">
        <h2 className="section-title">
          Fonctionnalités <span className="gradient-text">Puissantes</span>
        </h2>
        <p className="section-description">
          Tout ce dont vous avez besoin pour gérer votre entreprise efficacement
        </p>
      </div>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
