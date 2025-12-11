# 📚 Guide Complet - CookBook Application

Guide complet pour l'exécution, le développement et le déploiement de l'application CookBook.

---

## 📋 Table des matières

1. [Démarrage rapide](#-démarrage-rapide)
2. [Exécution locale avec Docker](#-exécution-locale-avec-docker)
3. [Exécution en production](#-exécution-en-production)
4. [CI/CD Pipeline](#-cicd-pipeline)
5. [Déploiement](#-déploiement)
6. [Dépannage](#-dépannage)

---

## 🚀 Démarrage rapide

### Prérequis

- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)

Vérifier l'installation :
```bash
docker --version
docker compose version
```

### Exécution en 3 étapes

```bash
# 1. Cloner le projet
git clone <url-du-repository>
cd full-stack-mern

# 2. Démarrer l'application
docker compose up --build

# 3. Accéder à l'application
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

---

## 🐳 Exécution locale avec Docker

### Développement (avec hot-reload)

```bash
docker compose up --build
```

**Services disponibles :**
- Frontend : http://localhost:5173 (Vite dev server)
- Backend : http://localhost:3000 (Express avec nodemon)
- MongoDB : localhost:27017

**Commandes utiles :**

```bash
# Démarrer en arrière-plan
docker compose up -d

# Voir les logs
docker compose logs -f
docker compose logs backend
docker compose logs frontend

# Arrêter l'application
docker compose down

# Redémarrer un service
docker compose restart backend

# Réinitialiser complètement (supprime les volumes)
docker compose down -v
docker compose up --build
```

### Production locale (test)

```bash
docker compose -f docker-compose.prod.yml up --build
```

**Services disponibles :**
- Frontend : http://localhost (Nginx)
- Backend : http://localhost:3000
- MongoDB : localhost:27017

**Différences avec le mode dev :**
- Frontend servi par Nginx (pas de hot-reload)
- Images optimisées (multi-stage builds)
- Health checks activés
- Volumes persistants pour les données

---

## 🏭 Exécution en production

### Option 1 : Docker Compose sur serveur

```bash
# Sur le serveur
git clone <repository>
cd full-stack-mern

# Configurer les variables d'environnement
export JWT_SECRET="votre-secret-jwt-super-securise"
export VITE_API_URL="https://api.votre-domaine.com"

# Démarrer en production
docker compose -f docker-compose.prod.yml up -d

# Vérifier le statut
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

### Option 2 : Kubernetes

Voir la section [Déploiement Kubernetes](#déploiement-kubernetes)

### Option 3 : VPS avec script automatique

Voir la section [Déploiement VPS](#déploiement-vps)

---

## 🔄 CI/CD Pipeline

Le projet utilise **deux workflows séparés** pour une meilleure organisation :

### 🔍 CI - Continuous Integration

**Fichier :** `.github/workflows/ci.yml`

**Déclenchement :**
- Automatique sur chaque `push` et `pull_request`
- Branches : `main`, `master`, `develop`

**Jobs :**
1. **ci-backend** : Tests backend
   - Installation dépendances
   - Lint (si configuré)
   - Tests (si configurés)

2. **ci-frontend** : Tests frontend
   - Installation dépendances
   - Lint (ESLint)
   - Build de test
   - Upload artefacts

**Durée :** ~2-3 minutes

**Secrets requis :** Aucun

### 🚀 CD - Continuous Deployment

**Fichier :** `.github/workflows/cd.yml`

**Déclenchement :**
- Automatique sur `push` vers `main`/`master`
- Manuel via `workflow_dispatch` (bouton GitHub Actions)

**Jobs :**
1. **build-and-push-images** : Build et push Docker
   - Build backend (multi-stage)
   - Build frontend (multi-stage)
   - Push vers GHCR avec tags : SHA, latest, branch

2. **deploy-kubernetes** : Déploiement K8s (conditionnel)
   - Nécessite : `KUBECONFIG` secret
   - Met à jour les déploiements

3. **deploy-vps** : Déploiement VPS (conditionnel)
   - Nécessite : `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`
   - Exécute le script de déploiement

**Durée :** ~10-15 minutes

**Secrets requis :**
- `GITHUB_TOKEN` : Auto-fourni
- `VITE_API_URL` : Optionnel
- `KUBECONFIG` : Pour K8s (optionnel)
- `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER` : Pour VPS (optionnel)

### 📊 Flux de travail

```
Push PR → CI Workflow (tests) → Merge PR → Push main → CD Workflow (build + deploy)
```

### 🎯 Avantages

- ✅ CI rapide (pas de build Docker sur chaque PR)
- ✅ CD contrôlé (uniquement sur main/master)
- ✅ Déploiement manuel possible
- ✅ Séparation claire des responsabilités

---

## 🚢 Déploiement

### Déploiement Kubernetes

#### 1. Préparer les secrets

```bash
# Secret JWT
kubectl create secret generic cookbook-secrets \
  --from-literal=jwt-secret='votre-secret-jwt'

# Secret GHCR (pour pull images)
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=VOTRE_USERNAME \
  --docker-password=VOTRE_GITHUB_TOKEN \
  --docker-email=VOTRE_EMAIL
```

#### 2. Mettre à jour les références d'images

Dans les fichiers `k8s/*.yaml`, remplacer `OWNER` par votre username GitHub :

```bash
sed -i 's/OWNER/votre-username/g' k8s/*.yaml
```

#### 3. Configurer GitHub Secrets

Dans GitHub → Settings → Secrets :
- `KUBECONFIG` : Configuration Kubernetes encodée en base64

```bash
cat ~/.kube/config | base64 -w 0
```

#### 4. Déployer

```bash
# Déploiement manuel
kubectl apply -f k8s/

# Ou via GitHub Actions (automatique sur push main)
```

#### 5. Vérifier

```bash
kubectl get pods
kubectl get services
kubectl get pvc

# Logs
kubectl logs -f deployment/cookbook-backend
kubectl logs -f deployment/cookbook-frontend
```

### Déploiement VPS

#### 1. Préparer le serveur

```bash
# Sur le VPS
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
```

#### 2. Configurer GitHub Secrets

Dans GitHub → Settings → Secrets :
- `SSH_PRIVATE_KEY` : Votre clé SSH privée
- `SSH_HOST` : Adresse IP ou domaine du serveur
- `SSH_USER` : Utilisateur SSH (défaut: root)

#### 3. Déployer

Le déploiement se fait automatiquement sur push vers `main`, ou manuellement :

1. GitHub → Actions → CD - Continuous Deployment
2. Run workflow → Choisir la branche
3. Run workflow

#### 4. Vérifier

```bash
ssh user@host "docker compose -f ~/cookbook/docker-compose.prod.yml ps"
ssh user@host "docker compose -f ~/cookbook/docker-compose.prod.yml logs"
```

---

## 🔧 Dépannage

### Problèmes Docker

**Les conteneurs ne démarrent pas :**
```bash
docker compose logs
docker compose ps
```

**Port déjà utilisé :**
Modifier les ports dans `docker-compose.yml` ou `docker-compose.prod.yml`

**Erreur de build :**
```bash
docker compose down
docker compose up --build --no-cache
```

**Problèmes de permissions :**
```bash
sudo docker compose up
# Ou ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER
```

### Problèmes CI/CD

**CI échoue :**
- Vérifier les logs GitHub Actions
- Vérifier que les dépendances sont à jour
- Vérifier les scripts npm (lint, test)

**CD échoue :**
- Vérifier les secrets GitHub
- Vérifier les permissions du repository
- Vérifier les logs de build Docker

**Images non trouvées :**
- Vérifier que les images sont bien poussées sur GHCR
- Vérifier les tags d'images
- Vérifier l'authentification GHCR

### Problèmes Kubernetes

```bash
# Vérifier les pods
kubectl get pods
kubectl describe pod <pod-name>

# Vérifier les logs
kubectl logs <pod-name>
kubectl logs -f deployment/cookbook-backend

# Vérifier les services
kubectl get services
kubectl describe service cookbook-frontend

# Vérifier les secrets
kubectl get secrets
kubectl describe secret cookbook-secrets
```

### Problèmes VPS

```bash
# Vérifier Docker
ssh user@host "docker ps"
ssh user@host "docker compose -f ~/cookbook/docker-compose.prod.yml ps"

# Vérifier les logs
ssh user@host "docker compose -f ~/cookbook/docker-compose.prod.yml logs"

# Vérifier l'espace disque
ssh user@host "df -h"
ssh user@host "docker system df"
```

---

## 📁 Structure du projet

```
full-stack-mern/
├── backend/
│   ├── Dockerfile              # Dev Dockerfile
│   ├── Dockerfile.prod         # Production Dockerfile
│   ├── server.js
│   └── ...
├── frontend/recipe-app/
│   ├── Dockerfile              # Dev Dockerfile
│   ├── Dockerfile.prod         # Production Dockerfile
│   ├── nginx.conf              # Configuration Nginx
│   └── ...
├── k8s/                        # Manifests Kubernetes
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── ...
├── scripts/
│   └── deploy-vps.sh          # Script déploiement VPS
├── .github/workflows/
│   ├── ci.yml                 # Workflow CI
│   └── cd.yml                 # Workflow CD
├── docker-compose.yml         # Dev compose
├── docker-compose.prod.yml    # Production compose
└── GUIDE_COMPLET.md           # Ce guide
```

---

## 🔐 Variables d'environnement

### Backend

- `PORT` : Port du serveur (défaut: 3000)
- `MONGODB_URI` : URI de connexion MongoDB
- `JWT_SECRET` : Secret pour les tokens JWT
- `NODE_ENV` : Environnement (production/development)

### Frontend

- `VITE_API_URL` : URL de l'API backend

### Exemple .env (backend)

```env
PORT=3000
MONGODB_URI=mongodb://mongo:27017/cookbook
JWT_SECRET=votre_secret_jwt_super_securise
NODE_ENV=production
```

---

## 📚 Ressources supplémentaires

- [Documentation Docker](https://docs.docker.com/)
- [Documentation Docker Compose](https://docs.docker.com/compose/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Kubernetes](https://kubernetes.io/docs/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)

---

## ✅ Checklist de déploiement

### Avant le déploiement

- [ ] Variables d'environnement configurées
- [ ] Secrets GitHub configurés (si nécessaire)
- [ ] Images Docker testées localement
- [ ] Tests CI passent
- [ ] Documentation à jour

### Déploiement Kubernetes

- [ ] Secrets Kubernetes créés
- [ ] Images références mises à jour
- [ ] KUBECONFIG secret configuré dans GitHub
- [ ] Manifests appliqués
- [ ] Pods en cours d'exécution
- [ ] Services accessibles

### Déploiement VPS

- [ ] Docker installé sur le serveur
- [ ] Secrets SSH configurés dans GitHub
- [ ] Script de déploiement testé
- [ ] Conteneurs démarrés
- [ ] Application accessible

---

**Bon développement ! 🚀**

