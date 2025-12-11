#!/bin/bash
set -e

# Deploy script for VPS deployment via SSH
# Usage: ./scripts/deploy-vps.sh <SSH_HOST> <SSH_USER> <IMAGE_TAG>

SSH_HOST=${1:-"your-vps-host.com"}
SSH_USER=${2:-"root"}
IMAGE_TAG=${3:-"latest"}
REPO_OWNER=${GITHUB_REPOSITORY_OWNER:-"your-username"}

echo "🚀 Deploying CookBook to VPS..."
echo "Host: $SSH_HOST"
echo "User: $SSH_USER"
echo "Image Tag: $IMAGE_TAG"

# Create remote directory structure
ssh ${SSH_USER}@${SSH_HOST} << EOF
  set -e
  mkdir -p ~/cookbook/{backend,frontend,uploads}
  cd ~/cookbook
  
  # Create docker-compose.prod.yml
  cat > docker-compose.prod.yml << 'DOCKERCOMPOSE'
version: '3.8'

services:
  mongo:
    image: mongo:6
    container_name: cookbook-mongo-prod
    restart: unless-stopped
    volumes:
      - mongo-data-prod:/data/db
    environment:
      - MONGO_INITDB_DATABASE=cookbook
    networks:
      - cookbook-network

  backend:
    image: ghcr.io/${REPO_OWNER}/cookbook-backend:${IMAGE_TAG}
    container_name: cookbook-backend-prod
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/cookbook
      - JWT_SECRET=\${JWT_SECRET:-change_me_in_production}
      - PORT=3000
      - NODE_ENV=production
    depends_on:
      - mongo
    volumes:
      - ./uploads:/app/public/images
    networks:
      - cookbook-network

  frontend:
    image: ghcr.io/${REPO_OWNER}/cookbook-frontend:${IMAGE_TAG}
    container_name: cookbook-frontend-prod
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - cookbook-network

networks:
  cookbook-network:
    driver: bridge

volumes:
  mongo-data-prod:
    driver: local
DOCKERCOMPOSE

  # Login to GHCR if needed
  echo "\${GITHUB_TOKEN}" | docker login ghcr.io -u ${REPO_OWNER} --password-stdin || true
  
  # Pull latest images
  docker compose -f docker-compose.prod.yml pull
  
  # Stop and remove old containers
  docker compose -f docker-compose.prod.yml down || true
  
  # Start new containers
  docker compose -f docker-compose.prod.yml up -d
  
  # Clean up old images
  docker image prune -f
  
  echo "✅ Deployment completed!"
EOF

echo "🎉 CookBook deployed successfully to $SSH_HOST"

