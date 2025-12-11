# Kubernetes Deployment Guide

## Prerequisites

- Kubernetes cluster (v1.20+)
- kubectl configured
- GitHub Container Registry access

## Setup

### 1. Create Secrets

```bash
# Create JWT secret
kubectl create secret generic cookbook-secrets \
  --from-literal=jwt-secret='your-super-secret-jwt-key-here'

# Create GHCR secret for pulling images
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_TOKEN \
  --docker-email=YOUR_EMAIL
```

### 2. Update Image References

Replace `OWNER` in the deployment files with your GitHub username:

```bash
sed -i 's/OWNER/your-github-username/g' *.yaml
```

### 3. Deploy

```bash
# Deploy all resources
kubectl apply -f .

# Check status
kubectl get pods
kubectl get services
kubectl get pvc
```

### 4. Update Deployments

To update to a new image tag:

```bash
kubectl set image deployment/cookbook-backend backend=ghcr.io/OWNER/cookbook-backend:SHA
kubectl set image deployment/cookbook-frontend frontend=ghcr.io/OWNER/cookbook-frontend:SHA
kubectl rollout status deployment/cookbook-backend
kubectl rollout status deployment/cookbook-frontend
```

## Access

- Frontend: Access via LoadBalancer service (check `kubectl get svc cookbook-frontend`)
- Backend: Internal service at `cookbook-backend:3000`

## Troubleshooting

```bash
# View logs
kubectl logs -f deployment/cookbook-backend
kubectl logs -f deployment/cookbook-frontend

# Describe resources
kubectl describe deployment cookbook-backend
kubectl describe pod <pod-name>

# Port forward for testing
kubectl port-forward service/cookbook-frontend 8080:80
```

