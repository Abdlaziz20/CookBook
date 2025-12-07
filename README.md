# 🍳 CookBook

Une application web complète de gestion de recettes culinaires permettant aux utilisateurs de créer, consulter, modifier et partager leurs recettes favorites.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Structure du projet](#-structure-du-projet)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [API Endpoints](#-api-endpoints)
- [Auteur](#-auteur)

## ✨ Fonctionnalités

- 🔐 **Authentification utilisateur** : Inscription et connexion sécurisées avec JWT
- 📝 **Gestion de recettes** : Création, lecture, modification et suppression de recettes
- 🖼️ **Upload d'images** : Ajout d'images de couverture pour chaque recette
- ❤️ **Recettes favorites** : Sauvegarde de vos recettes préférées
- 📚 **Collection de recettes** : Consultation de toutes les recettes disponibles
- 👤 **Recettes personnelles** : Gestion de vos propres recettes

## 🛠️ Technologies utilisées

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web pour Node.js
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT (JSON Web Token)** - Authentification sécurisée
- **bcrypt** - Hachage de mots de passe
- **Multer** - Gestion de l'upload de fichiers
- **CORS** - Gestion des requêtes cross-origin

### Frontend
- **React** - Bibliothèque JavaScript pour l'interface utilisateur
- **Vite** - Outil de build et serveur de développement
- **React Router DOM** - Routage côté client
- **Axios** - Client HTTP pour les requêtes API
- **Bootstrap** - Framework CSS pour le design
- **React Icons** - Bibliothèque d'icônes

## 📁 Structure du projet

```
CookBook/
├── backend/
│   ├── config/
│   │   └── connectionDB.js      # Configuration de la connexion MongoDB
│   ├── middleware/
│   │   └── auth.js              # Middleware d'authentification JWT
│   ├── modules/
│   │   ├── recipeSchema.js      # Schéma Mongoose pour les recettes
│   │   └── usetSchema.js        # Schéma Mongoose pour les utilisateurs
│   ├── routes/
│   │   ├── recipe.js            # Routes API pour les recettes
│   │   └── user.js              # Routes API pour les utilisateurs
│   ├── public/
│   │   └── images/              # Dossier pour les images uploadées
│   ├── server.js                # Point d'entrée du serveur
│   └── package.json
│
└── frontend/
    └── recipe-app/
        ├── src/
        │   ├── components/      # Composants React réutilisables
        │   │   ├── AddRecipes.jsx
        │   │   ├── AllRecipes.jsx
        │   │   ├── MyRecipes.jsx
        │   │   ├── MyFavRecipes.jsx
        │   │   ├── Navbar.jsx
        │   │   ├── Footer.jsx
        │   │   └── ...
        │   ├── pages/           # Pages de l'application
        │   │   ├── home.jsx
        │   │   └── EditRecipe.jsx
        │   ├── assets/          # Images et ressources statiques
        │   ├── App.jsx          # Composant principal
        │   └── main.jsx         # Point d'entrée React
        ├── package.json
        └── vite.config.js
```

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 14 ou supérieure)
- **npm** ou **yarn**
- **MongoDB** (localement ou MongoDB Atlas)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone <url-du-repository>
cd CookBook
```

### 2. Installer les dépendances du backend

```bash
cd backend
npm install
```

### 3. Installer les dépendances du frontend

```bash
cd ../frontend/recipe-app
npm install
```

## ⚙️ Configuration

### Configuration du Backend

1. Créez un fichier `.env` dans le dossier `backend/` :

```env
port=3000
MONGODB_URI=mongodb://localhost:27017/cookbook
JWT_SECRET=votre_secret_jwt_super_securise
```

2. Assurez-vous que MongoDB est en cours d'exécution sur votre machine, ou utilisez une URI MongoDB Atlas.

### Configuration du Frontend

Si nécessaire, configurez l'URL de l'API dans les fichiers de composants React (généralement `http://localhost:3000`).

## 💻 Utilisation

### Démarrer le serveur backend

```bash
cd backend
npm run dev
```

Le serveur backend sera accessible sur `http://localhost:3000`

### Démarrer l'application frontend

Dans un nouveau terminal :

```bash
cd frontend/recipe-app
npm run dev
```

L'application frontend sera accessible sur `http://localhost:5173` (ou le port indiqué par Vite)

## 🔌 API Endpoints

### Routes des Recettes (`/api/recipes`)

| Méthode | Endpoint | Description | Authentification |
|---------|----------|-------------|------------------|
| GET | `/api/recipes` | Récupérer toutes les recettes | Non |
| GET | `/api/recipes/:id` | Récupérer une recette par ID | Non |
| POST | `/api/recipes` | Créer une nouvelle recette | Oui (JWT) |
| PUT | `/api/recipes/:id` | Modifier une recette | Oui |
| DELETE | `/api/recipes/:id` | Supprimer une recette | Oui |

### Routes des Utilisateurs (`/api/users`)

| Méthode | Endpoint | Description | Authentification |
|---------|----------|-------------|------------------|
| POST | `/api/users/register` | Inscription d'un nouvel utilisateur | Non |
| POST | `/api/users/login` | Connexion d'un utilisateur | Non |

### Format d'une Recette

```json
{
  "title": "Nom de la recette",
  "ingredients": ["ingrédient 1", "ingrédient 2", ...],
  "instructions": "Instructions détaillées de préparation",
  "coverImage": "nom-du-fichier-image.jpg",
  "createdBy": "ObjectId de l'utilisateur",
  "createdAT": "2024-01-01T00:00:00.000Z"
}
```

## 📝 Notes

- Les images uploadées sont stockées dans le dossier `backend/public/images/`
- L'authentification utilise JWT (JSON Web Token)
- Les mots de passe sont hachés avec bcrypt avant stockage
- Le serveur backend doit être démarré avant le frontend pour que l'application fonctionne correctement

## 👤 Auteur

Développé avec ❤️ pour partager la passion de la cuisine

---

**Bon appétit ! 🍽️**

