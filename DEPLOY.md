# Guide de Déploiement - Center App Store

## 📋 Prérequis

- Compte [Render](https://render.com) (gratuit)
- Compte [Netlify](https://netlify.com) ou [Vercel](https://vercel.com) (gratuit)
- Compte [MongoDB Atlas](https://mongodb.com/atlas) (gratuit)
- Compte [Cloudinary](https://cloudinary.com) (gratuit)

## 🚀 Étape 1: Déployer le Backend sur Render

### 1.1 Préparer le projet

```bash
cd center-store/backend
```

Créer un fichier `.gitignore`:
```
node_modules/
.env
*.log
```

### 1.2 Push sur GitHub

```bash
git init
git add .
git commit -m "Backend Center App Store"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/center-store-backend.git
git push -u origin main
```

### 1.3 Déployer sur Render

1. Aller sur [render.com](https://render.com)
2. Cliquer "New +" → "Web Service"
3. Connecter votre repo GitHub
4. Configuration:
   - **Name**: `center-store-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Variables d'environnement** (Add Environment Variables):
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://SETRAF:Dieu19961991%3F%3F%21%3F%3F%21@cluster0.5tjz9v0.mongodb.net/myDatabase14?retryWrites=true&w=majority&appName=Cluster0
   MONGO_USER=SETRAF
   MONGO_PASSWORD=Dieu19961991??!??!
   MONGO_DB_NAME=myDatabase14
   JWT_SECRET=Dieu19961991??!??!
   CLOUDINARY_CLOUD_NAME=dddkmikpf
   CLOUDINARY_API_KEY=848997274359864
   CLOUDINARY_API_SECRET=5TZZdDTf7gmAFk_eVpJWeKgilb8
   FRONTEND_URL=https://VOTRE-SITE.netlify.app
   ```

6. Cliquer "Create Web Service"

7. Attendre le déploiement (2-3 minutes)

8. **Noter l'URL**: `https://center-store-backend.onrender.com`

## 🌐 Étape 2: Déployer le Frontend sur Netlify

### 2.1 Configurer l'API

Modifier `frontend/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://center-store-backend.onrender.com', // ← Votre URL Render
        changeOrigin: true
      }
    }
  }
})
```

Créer `frontend/.env.production`:
```
VITE_API_URL=https://center-store-backend.onrender.com
```

### 2.2 Build local pour tester

```bash
cd frontend
npm run build
npm run preview
```

Vérifier que tout fonctionne sur `http://localhost:4173`

### 2.3 Push sur GitHub

```bash
cd frontend
git init
git add .
git commit -m "Frontend Center App Store"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/center-store-frontend.git
git push -u origin main
```

### 2.4 Déployer sur Netlify

**Option A: Interface Web**

1. Aller sur [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Connecter GitHub
4. Configuration:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. **Environment variables**:
   ```
   VITE_API_URL=https://center-store-backend.onrender.com
   ```
6. "Deploy site"

**Option B: Netlify CLI**

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 📱 Étape 3: Uploader votre APK

### 3.1 Compiler votre APK

```bash
cd CENTER
flutter clean
flutter build apk --release
```

L'APK sera dans: `CENTER/build/app/outputs/flutter-apk/app-release.apk`

### 3.2 Uploader vers Cloudinary

```bash
cd center-store/backend
node upload-release.js
```

Le script va:
- Uploader l'APK sur Cloudinary
- Créer une entrée dans MongoDB
- Afficher l'URL de téléchargement

### 3.3 Vérifier sur le site

Aller sur votre site: `https://VOTRE-SITE.netlify.app`

Le bouton de téléchargement devrait maintenant fonctionner!

## 🔄 Mettre à jour l'APK

### Option 1: Script automatique

Modifier `backend/upload-release.js` avec la nouvelle version:

```javascript
const releaseData = {
  version: '1.0.1',  // ← Nouvelle version
  versionCode: 2,    // ← Incrémenter
  changelog: [
    'Correction de bugs',
    'Amélioration des performances',
    'Nouvelle fonctionnalité X'
  ]
};
```

Puis:
```bash
cd backend
node upload-release.js
```

### Option 2: API REST

```bash
curl -X POST https://center-store-backend.onrender.com/api/admin/release \
  -H "Content-Type: application/json" \
  -d '{
    "version": "1.0.1",
    "versionCode": 2,
    "apkUrl": "https://res.cloudinary.com/...",
    "apkCloudinaryId": "center-app/releases/...",
    "apkSize": 45000000,
    "changelog": ["Bug fixes", "Performance improvements"]
  }'
```

## 🔍 Tester la production

```bash
# Backend health check
curl https://center-store-backend.onrender.com/api/health

# Dernière version
curl https://center-store-backend.onrender.com/api/app/latest

# Statistiques
curl https://center-store-backend.onrender.com/api/stats/downloads
```

## 🎉 C'est terminé!

Votre App Store est maintenant en ligne:

- 🌐 **Site web**: `https://VOTRE-SITE.netlify.app`
- 🔌 **API**: `https://center-store-backend.onrender.com`
- ☁️ **APK**: Stocké sur Cloudinary
- 💾 **Base de données**: MongoDB Atlas

Les utilisateurs peuvent télécharger votre APK directement depuis le site!

## 🚨 Important

### Sécurité

Pour la production, ajoutez une authentification admin:

```javascript
// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
```

Protéger les routes admin:
```javascript
const auth = require('./middleware/auth');

app.post('/api/admin/release', auth, async (req, res) => {
  // ... code existant
});

app.delete('/api/admin/release/:id', auth, async (req, res) => {
  // ... code existant
});
```

### CORS Production

Mettre à jour le CORS dans `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'https://VOTRE-SITE.netlify.app',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

## 📊 Monitoring

Render offre des logs gratuits:
- Dashboard → "Logs"
- Voir les requêtes en temps réel
- Erreurs et warnings

## 💡 Astuces

1. **Custom Domain**: Connecter votre propre domaine sur Netlify
2. **Analytics**: Ajouter Google Analytics au site
3. **SEO**: Optimiser les meta tags dans `index.html`
4. **CDN**: Netlify utilise automatiquement un CDN global
5. **Auto-deploy**: Push sur GitHub = déploiement automatique!
