# Center App Store

Site web complet pour télécharger Center App (APK Android)

## 🚀 Structure du Projet

```
center-store/
├── backend/              # API Node.js + MongoDB + Cloudinary
│   ├── server.js        # Serveur Express
│   ├── upload-release.js # Script upload APK
│   ├── package.json
│   └── .env            # Variables d'environnement
│
└── frontend/            # Site React + Vite
    ├── src/
    │   ├── components/  # Composants React
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 📦 Installation

### Backend

```bash
cd backend
npm install
npm start
```

Le serveur démarre sur `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Le site web démarre sur `http://localhost:5173`

## 🔧 Configuration

### Variables d'Environnement (.env)

- **MongoDB**: Base `myDatabase14`
- **Cloudinary**: Stockage des APK et médias
- **PORT**: 5000 (backend)
- **FRONTEND_URL**: http://localhost:5173

## 📱 Fonctionnalités

### Site Web (Frontend)
- ✅ Design moderne et responsive
- ✅ Téléchargement direct de l'APK depuis Cloudinary
- ✅ Affichage des versions et changelog
- ✅ Screenshots de l'application
- ✅ Statistiques des téléchargements
- ✅ Instructions d'installation

### API Backend
- ✅ Gestion des releases (versions)
- ✅ Upload APK vers Cloudinary
- ✅ Tracking des téléchargements
- ✅ Statistiques détaillées
- ✅ MongoDB pour la persistance

## 🌐 Déploiement

Voir le fichier [DEPLOY.md](./DEPLOY.md) pour les instructions complètes de déploiement sur Render et Netlify.

## 📝 API Endpoints

```
GET  /api/health                    # Health check
GET  /api/app/latest                # Dernière version
GET  /api/app/versions              # Toutes les versions
GET  /api/app/download/:releaseId   # Télécharger APK
GET  /api/stats/downloads           # Statistiques
POST /api/admin/release             # Créer une release
DELETE /api/admin/release/:id       # Supprimer une release
```

## 🎨 Technologies

- **Frontend**: React 18 + Vite + React Icons + Framer Motion
- **Backend**: Node.js + Express + MongoDB + Cloudinary
- **Base de données**: MongoDB Atlas (`myDatabase14`)
- **Stockage**: Cloudinary (APK + Images)

## 🚀 Upload d'une Release

```bash
cd backend
node upload-release.js
```

Le script upload automatiquement votre APK vers Cloudinary et crée une entrée dans MongoDB.

## 📄 Licence

MIT © BelikanM
