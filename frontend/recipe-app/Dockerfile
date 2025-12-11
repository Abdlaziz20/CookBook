# frontend/recipe-app/Dockerfile
# 1. Choisir l'image de base
FROM node:20

# 2. Définir le répertoire de travail
WORKDIR /app

# 3. Copier package.json et package-lock.json
COPY package*.json ./

# 4. Installer les dépendances
RUN npm install

# 5. Copier le reste du code
COPY . .

# 6. Exposer le port du frontend (Vite)
EXPOSE 5173

# 7. Lancer le serveur Vite (écouter sur 0.0.0.0 pour être accessible depuis l'extérieur)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
