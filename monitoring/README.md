# 📊 Monitoring - Prometheus & Grafana

## 🚀 Démarrage rapide

```bash
# Démarrer le monitoring
cd monitoring
docker compose up -d

# Accéder aux services
# Grafana: http://localhost:3001 (admin/admin)
# Prometheus: http://localhost:9090
# Node Exporter: http://localhost:9100/metrics
# cAdvisor: http://localhost:8080/metrics
```

## 📋 Services inclus

### Prometheus
- **Port**: 9090
- **Rôle**: Collecte et stocke les métriques
- **Rétention**: 30 jours

### Grafana
- **Port**: 3001
- **User**: admin
- **Password**: admin
- **Rôle**: Visualisation des métriques

### Node Exporter
- **Port**: 9100
- **Rôle**: Métriques système (CPU, RAM, disque, réseau)

### cAdvisor
- **Port**: 8080
- **Rôle**: Métriques des conteneurs Docker

## 📊 Métriques collectées

- **Système**: CPU, RAM, Disque, Réseau
- **Conteneurs**: CPU, Mémoire, Réseau par conteneur
- **Application**: Métriques backend/frontend (si configurées)

## 🔧 Configuration

### Prometheus
Le fichier `prometheus.yml` configure les targets à surveiller :
- Prometheus lui-même
- Node Exporter
- cAdvisor
- Backend (port 3000)
- Frontend (port 80)

### Grafana
- Datasource Prometheus configuré automatiquement
- Dashboards dans `grafana/dashboards/`

## 📝 Commandes utiles

```bash
# Démarrer
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter
docker compose down

# Redémarrer
docker compose restart
```

## 🔍 Vérification

```bash
# Vérifier que Prometheus collecte les métriques
curl http://localhost:9090/api/v1/targets

# Vérifier les métriques d'un conteneur
curl http://localhost:8080/metrics
```

