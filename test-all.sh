#!/bin/bash
set +e  # Ne pas arrêter sur erreur pour compter les tests







echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           Tests Complets - CookBook Application             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Couleurs          ,,,,,
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
PASSED=0
FAILED=0

# Fonction de test
test_check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ $1${NC}"
        ((FAILED++))
    fi
}

echo "📋 1. Vérification des fichiers YAML..."
echo ""

echo "   Vérification CI workflow..."
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/ci.yml'))" > /dev/null 2>&1
test_check "CI workflow YAML valide"

echo "   Vérification CD workflow..."
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/cd.yml'))" > /dev/null 2>&1
test_check "CD workflow YAML valide"

echo "   Vérification docker-compose.prod.yml..."
docker compose -f docker-compose.prod.yml config --quiet > /dev/null 2>&1
test_check "docker-compose.prod.yml valide"

echo ""
echo "📦 2. Vérification des Dockerfiles..."
echo ""

echo "   Test build backend..."
cd backend
docker build -f Dockerfile.prod -t cookbook-backend-test:latest . > /dev/null 2>&1
test_check "Backend Dockerfile build réussi"
cd ..

echo "   Test build frontend..."
cd frontend/recipe-app
docker build -f Dockerfile.prod --build-arg VITE_API_URL=http://localhost:3000 -t cookbook-frontend-test:latest . > /dev/null 2>&1
test_check "Frontend Dockerfile build réussi"
cd ../..

echo ""
echo "🔧 3. Vérification des scripts..."
echo ""

test -x scripts/deploy-vps.sh
test_check "Script deploy-vps.sh exécutable"

echo ""
echo "☸️  4. Vérification des manifests Kubernetes..."
echo ""

K8S_FILES=$(find k8s -name "*.yaml" | wc -l)
echo "   Vérification de $K8S_FILES fichiers..."
for file in k8s/*.yaml; do
    if [ -f "$file" ]; then
        python3 -c "import yaml; list(yaml.safe_load_all(open('$file')))" > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo -e "   ${GREEN}✅ $(basename $file)${NC}"
            ((PASSED++))
        else
            echo -e "   ${RED}❌ $(basename $file)${NC}"
            ((FAILED++))
        fi
    fi
done

echo ""
echo "📁 5. Vérification de la structure..."
echo ""

[ -f "backend/Dockerfile.prod" ] && test_check "backend/Dockerfile.prod existe"
[ -f "frontend/recipe-app/Dockerfile.prod" ] && test_check "frontend/Dockerfile.prod existe"
[ -f "frontend/recipe-app/nginx.conf" ] && test_check "nginx.conf existe"
[ -f "docker-compose.prod.yml" ] && test_check "docker-compose.prod.yml existe"
[ -f "GUIDE_COMPLET.md" ] && test_check "GUIDE_COMPLET.md existe"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                      Résumé des Tests                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}✅ Tests réussis: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ Tests échoués: $FAILED${NC}"
else
    echo -e "${GREEN}❌ Tests échoués: 0${NC}"
fi
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 Tous les tests sont passés avec succès !${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Certains tests ont échoué. Veuillez vérifier les erreurs ci-dessus.${NC}"
    exit 1
fi

