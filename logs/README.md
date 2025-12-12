# 📝 Logs

Ce dossier contient les logs de toutes les applications.

## 📁 Structure

```
logs/
├── backend/     # Logs du backend Node.js
├── frontend/    # Logs du frontend React
├── mongo/       # Logs de MongoDB
└── all/         # Logs combinés de tous les services
```

## 🔧 Collecte des logs

### Automatique
Les logs sont automatiquement collectés via Docker logging driver configuré dans `docker-compose.yml`.

### Manuel
Utilisez le script de collecte :

```bash
./scripts/collect-logs.sh
```

Ce script :
- Collecte les logs de tous les conteneurs
- Les sauvegarde avec timestamp
- Nettoie les anciens logs (> 7 jours)

## 📋 Visualisation

### Via Docker Compose
```bash
# Tous les logs
docker compose logs -f

# Logs d'un service spécifique
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

### Via fichiers
Les logs sont stockés dans les sous-dossiers avec format :
- `service_TIMESTAMP.log`

## ⚙️ Configuration

Les logs sont configurés dans `docker-compose.yml` avec :
- **Driver**: json-file
- **Max size**: 10MB par fichier
- **Max files**: 3 fichiers par service
- **Rotation**: Automatique

## 🧹 Nettoyage

Les anciens logs (> 7 jours) sont automatiquement supprimés par le script de collecte.

Pour nettoyer manuellement :
```bash
find logs/ -name "*.log" -mtime +7 -delete
```

