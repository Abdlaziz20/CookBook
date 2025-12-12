#!/bin/bash
# Script pour collecter les logs de tous les conteneurs

set -e

LOGS_DIR="./logs"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "📋 Collecte des logs des conteneurs..."

# Créer les dossiers de logs
mkdir -p "$LOGS_DIR/backend"
mkdir -p "$LOGS_DIR/frontend"
mkdir -p "$LOGS_DIR/mongo"
mkdir -p "$LOGS_DIR/all"

# Collecter les logs de chaque service
echo "Collecting backend logs..."
docker compose logs --tail=1000 backend > "$LOGS_DIR/backend/backend_${TIMESTAMP}.log" 2>&1 || true

echo "Collecting frontend logs..."
docker compose logs --tail=1000 frontend > "$LOGS_DIR/frontend/frontend_${TIMESTAMP}.log" 2>&1 || true

echo "Collecting mongo logs..."
docker compose logs --tail=1000 mongo > "$LOGS_DIR/mongo/mongo_${TIMESTAMP}.log" 2>&1 || true

# Collecter tous les logs ensemble
echo "Collecting all logs..."
docker compose logs --tail=1000 > "$LOGS_DIR/all/all_${TIMESTAMP}.log" 2>&1 || true

# Nettoyer les anciens logs (garder les 10 derniers)
find "$LOGS_DIR" -name "*.log" -type f -mtime +7 -delete 2>/dev/null || true

echo "✅ Logs collectés dans $LOGS_DIR"
echo "   - Backend: $LOGS_DIR/backend/"
echo "   - Frontend: $LOGS_DIR/frontend/"
echo "   - Mongo: $LOGS_DIR/mongo/"
echo "   - All: $LOGS_DIR/all/"

