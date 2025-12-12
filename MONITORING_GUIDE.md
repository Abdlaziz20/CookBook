# 📊 Guide de Monitoring et Logs - CookBook

## 🚀 Démarrage rapide

### 1. Démarrer l'application avec monitoring

```bash
# Démarrer l'application principale
docker compose up -d

# Démarrer le monitoring
cd monitoring
docker compose up -d
cd ..
```

### 2. Accéder aux services

- **Application Frontend**: http://localhost:5173
- **Application Backend**: http://localhost:3000
- **Grafana Dashboard**: http://localhost:3001
  - User: `admin`
  - Password: `admin`
- **Prometheus**: http://localhost:9090
- **Node Exporter**: http://localhost:9100/metrics
- **cAdvisor**: http://localhost:8080/metrics

## 📊 Services de Monitoring

### Prometheus
Collecte et stocke les métriques de :
- Système (CPU, RAM, Disque)
- Conteneurs Docker
- Applications (Backend, Frontend)

### Grafana
Visualisation des métriques avec dashboards pré-configurés.

### Node Exporter
Expose les métriques système du serveur.

### cAdvisor
Expose les métriques de tous les conteneurs Docker.

## 📝 Logs

### Structure des logs
```
logs/
├── backend/     # Logs backend
├── frontend/    # Logs frontend
├── mongo/       # Logs MongoDB
└── all/         # Logs combinés
```

### Collecte manuelle
```bash
./scripts/collect-logs.sh
```

### Visualisation en temps réel
```bash
# Tous les logs
docker compose logs -f

# Logs spécifiques
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

## 🔧 Configuration

### Ajouter des métriques personnalisées

Pour exposer des métriques depuis le backend :

1. Installer `prom-client` :
```bash
cd backend
npm install prom-client
```

2. Exposer un endpoint `/metrics` dans `server.js` :
```javascript
const client = require('prom-client');
const register = new client.Registry();

// Métriques par défaut
client.collectDefaultMetrics({ register });

// Métrique personnalisée
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

// Endpoint metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

3. Prometheus collectera automatiquement depuis `backend:3000/metrics`

## 📈 Dashboards Grafana

### Dashboard par défaut
Un dashboard de base est fourni dans `monitoring/grafana/dashboards/`.

### Créer un dashboard personnalisé

1. Accéder à Grafana : http://localhost:3001
2. Se connecter (admin/admin)
3. Créer → Dashboard
4. Ajouter des panels avec des requêtes PromQL

### Exemples de requêtes PromQL

```promql
# CPU usage par conteneur
rate(container_cpu_usage_seconds_total{name=~"cookbook.*"}[5m])

# Mémoire utilisée
container_memory_usage_bytes{name=~"cookbook.*"}

# Requêtes HTTP par seconde
rate(http_requests_total[5m])

# Load average système
node_load1
```

## 🧹 Maintenance

### Nettoyer les anciens logs
```bash
find logs/ -name "*.log" -mtime +7 -delete
```

### Nettoyer les données Prometheus
```bash
cd monitoring
docker compose down -v  # Supprime les volumes
docker compose up -d
```

## 🔍 Dépannage

### Prometheus ne collecte pas de métriques
```bash
# Vérifier les targets
curl http://localhost:9090/api/v1/targets

# Vérifier la configuration
docker compose -f monitoring/docker-compose.yml logs prometheus
```

### Grafana ne se connecte pas à Prometheus
- Vérifier que Prometheus est démarré
- Vérifier la configuration dans `monitoring/grafana/provisioning/datasources/`

### Logs manquants
```bash
# Vérifier la configuration Docker logging
docker inspect cookbook-backend | grep -A 10 LogConfig

# Forcer la collecte
./scripts/collect-logs.sh
```

## 📚 Ressources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [PromQL Guide](https://prometheus.io/docs/prometheus/latest/querying/basics/)

