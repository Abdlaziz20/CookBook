# CI/CD Pipeline Documentation

## Overview

This project includes a production-ready CI/CD pipeline using GitHub Actions that:

1. **CI**: Runs linting and tests on pull requests
2. **Build**: Creates optimized Docker images with multi-stage builds
3. **Push**: Publishes images to GitHub Container Registry (GHCR)
4. **Deploy**: Conditionally deploys to Kubernetes or VPS via SSH

## Workflow Structure

### Jobs

1. **ci-backend**: Lint and test backend code
2. **ci-frontend**: Lint, build frontend
3. **build-and-push-images**: Build and push Docker images to GHCR
4. **deploy**: Deploy to Kubernetes or VPS (conditional)

## Setup

### 1. GitHub Secrets

Configure the following secrets in your GitHub repository settings:

#### Required (for image pushing)
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

#### Optional (for deployment)
- `VITE_API_URL`: Frontend API URL (defaults to `http://localhost:3000`)
- `KUBECONFIG`: Base64 encoded Kubernetes config (for K8s deployment)
- `SSH_PRIVATE_KEY`: SSH private key (for VPS deployment)
- `SSH_HOST`: VPS hostname/IP (for VPS deployment)
- `SSH_USER`: SSH username (defaults to `root`)

### 2. Update Image References

Before deploying, update image references in:
- `k8s/*.yaml` files: Replace `OWNER` with your GitHub username
- `scripts/deploy-vps.sh`: Update `REPO_OWNER` variable

## Image Tags

Images are tagged with:
- Commit SHA: `ghcr.io/OWNER/cookbook-backend:${{ github.sha }}`
- Latest: `ghcr.io/OWNER/cookbook-backend:latest`
- Branch name: `ghcr.io/OWNER/cookbook-backend:main`

## Local Testing

### Test Production Builds Locally

```bash
# Build and run production stack
docker compose -f docker-compose.prod.yml up --build

# Access:
# Frontend: http://localhost
# Backend: http://localhost:3000
```

### Test Individual Images

```bash
# Backend
cd backend
docker build -f Dockerfile.prod -t cookbook-backend:test .
docker run -p 3000:3000 cookbook-backend:test

# Frontend
cd frontend/recipe-app
docker build -f Dockerfile.prod --build-arg VITE_API_URL=http://localhost:3000 -t cookbook-frontend:test .
docker run -p 80:80 cookbook-frontend:test
```

## Deployment Options

### Kubernetes Deployment

1. Create secrets:
```bash
kubectl create secret generic cookbook-secrets \
  --from-literal=jwt-secret='your-secret'

kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_USERNAME \
  --docker-password=YOUR_TOKEN
```

2. Update image references in `k8s/*.yaml`
3. Set `KUBECONFIG` secret in GitHub
4. Push to main/master branch

### VPS Deployment

1. Set SSH secrets in GitHub:
   - `SSH_PRIVATE_KEY`
   - `SSH_HOST`
   - `SSH_USER` (optional)

2. Ensure Docker is installed on VPS
3. Push to main/master branch

The deployment script will:
- Pull latest images
- Restart containers
- Clean up old images

## Troubleshooting

### Build Failures

- Check GitHub Actions logs
- Verify Dockerfile syntax
- Ensure all dependencies are in package.json

### Deployment Failures

**Kubernetes:**
```bash
kubectl get pods
kubectl logs <pod-name>
kubectl describe pod <pod-name>
```

**VPS:**
```bash
ssh user@host "docker compose -f ~/cookbook/docker-compose.prod.yml logs"
```

### Image Pull Issues

- Verify GHCR authentication
- Check image tags match commit SHA
- Ensure `ghcr-secret` is configured in K8s

## Best Practices

1. **Never commit secrets** - Use GitHub Secrets
2. **Tag images with SHA** - Ensures reproducibility
3. **Use multi-stage builds** - Smaller production images
4. **Cache dependencies** - Faster builds
5. **Health checks** - Monitor container health
6. **Non-root users** - Enhanced security

## File Structure

```
.github/workflows/
  └── ci-cd.yml              # Main CI/CD workflow

backend/
  └── Dockerfile.prod        # Production backend Dockerfile

frontend/recipe-app/
  ├── Dockerfile.prod        # Production frontend Dockerfile
  └── nginx.conf             # Nginx configuration

k8s/
  ├── backend-deployment.yaml
  ├── backend-service.yaml
  ├── frontend-deployment.yaml
  ├── frontend-service.yaml
  ├── mongo-deployment.yaml
  ├── mongo-service.yaml
  ├── uploads-pvc.yaml
  └── secrets.yaml.example

scripts/
  └── deploy-vps.sh          # VPS deployment script

docker-compose.prod.yml      # Production compose file
```

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Buildx](https://docs.docker.com/buildx/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

