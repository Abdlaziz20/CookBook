# GitHub Actions Workflows

Ce projet utilise deux workflows séparés pour une meilleure séparation des responsabilités :

## 🔍 CI - Continuous Integration (`ci.yml`)

**Déclenchement :**
- Sur chaque `push` vers `main`, `master`, ou `develop`
- Sur chaque `pull_request` vers ces branches

**Objectif :** Valider le code avant fusion

**Jobs :**
1. **ci-backend** : Teste le backend
   - Installation des dépendances
   - Lint (si configuré)
   - Tests (si configurés)

2. **ci-frontend** : Teste le frontend
   - Installation des dépendances
   - Lint (ESLint)
   - Build de test
   - Upload des artefacts

**Résultat :** ✅ ou ❌ sur chaque PR

---

## 🚀 CD - Continuous Deployment (`cd.yml`)

**Déclenchement :**
- Sur `push` vers `main` ou `master` uniquement
- Manuellement via `workflow_dispatch` (bouton dans GitHub)

**Objectif :** Construire et déployer en production

**Jobs :**

1. **build-and-push-images** : Construit et pousse les images Docker
   - Build backend (multi-stage)
   - Build frontend (multi-stage)
   - Push vers GHCR avec tags : SHA, latest, branch

2. **deploy-kubernetes** : Déploiement Kubernetes (conditionnel)
   - Nécessite : `KUBECONFIG` secret
   - Met à jour les déploiements avec les nouvelles images

3. **deploy-vps** : Déploiement VPS (conditionnel)
   - Nécessite : `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER` secrets
   - Exécute le script de déploiement SSH

**Résultat :** Images Docker publiées et application déployée

---

## 📊 Flux de travail

```
┌─────────────┐
│   Push PR   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  CI Workflow│  ← Tests et validation
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Merge PR   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Push to main│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ CD Workflow │  ← Build et déploiement
└──────┬──────┘
       │
       ├───► Build Images
       │
       ├───► Deploy K8s (si configuré)
       │
       └───► Deploy VPS (si configuré)
```

---

## 🔐            Secrets requis

### Pour CI (automatique)
- Aucun secret requis (utilise GITHUB_TOKEN automatiquement)

### Pour CD

**Obligatoire :**
- `GITHUB_TOKEN` : Fourni automatiquement par GitHub

**Optionnel (pour déploiement) :**
- `VITE_API_URL` : URL de l'API backend pour le frontend
- `KUBECONFIG` : Configuration Kubernetes (base64 encodée)
- `SSH_PRIVATE_KEY` : Clé SSH privée pour VPS
- `SSH_HOST` : Adresse du serveur VPS
- `SSH_USER` : Utilisateur SSH (défaut: root)

---

## 🎯 Avantages de la séparation CI/CD

1. **CI rapide** : Les tests s'exécutent sur chaque PR sans attendre le build
2. **CD contrôlé** : Le déploiement ne se fait que sur main/master
3. **Déploiement manuel** : Possibilité de déployer manuellement via workflow_dispatch
4. **Meilleure visibilité** : Séparation claire entre validation et déploiement
5. **Économie de ressources** : Pas de build Docker sur chaque PR

---

## 🛠️ Utilisation

### Déclencher CI manuellement
Le CI se déclenche automatiquement sur chaque PR. Pas d'action nécessaire.

### Déclencher CD manuellement

1. Allez dans l'onglet **Actions** sur GitHub
2. Sélectionnez **CD - Continuous Deployment**
3. Cliquez sur **Run workflow**
4. Choisissez la branche et l'environnement
5. Cliquez sur **Run workflow**

---

## 📝 Notes

- Le CI s'exécute sur toutes les branches principales
- Le CD s'exécute uniquement sur `main` ou `master`
- Les deux workflows peuvent s'exécuter en parallèle
- Le CD attend la réussite du build avant de déployer

