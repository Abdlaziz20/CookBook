# 🚀 Guide d'exécution rapide - CookBook

## Prérequis

- Docker et Docker Compose installés
- Vérifier avec : `docker --version` et `docker compose version`

## Exécution en 3 étapes

### 1. Cloner le projet (si ce n'est pas déjà fait)

```bash
git clone <url-du-repository>
cd full-stack-mern
```

### 2. Démarrer l'application

```bash
docker compose up --build
```

### 3. Accéder à l'application

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3000

## Commandes essentielles

```bash
# Démarrer en arrière-plan
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter l'application
docker compose down

# Redémarrer un service
docker compose restart backend
```

## Structure des services

- **MongoDB** : Base de données (port 27017)
- **Backend** : API Node.js/Express (port 3000)
- **Frontend** : Application React/Vite (port 5173)

## Dépannage rapide

**Les conteneurs ne démarrent pas ?**
```bash
docker compose logs
```

**Port déjà utilisé ?**
Modifiez les ports dans `docker-compose.yml`

**Réinitialiser complètement ?**
```bash
docker compose down -v
docker compose up --build
```

---

Pour plus de détails, consultez le [README.md](README.md)

