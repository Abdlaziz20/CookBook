# backend/Dockerfile
# 1. Choisir l'image de base
FROM node:18

# 2. Définir le répertoire de travail
WORKDIR /app

# 3. Copier package.json et package-lock.json
COPY package*.json ./

# 4. Installer les dépendances
RUN npm install

# 5. Copier le reste du code
COPY . .

# 6. Exposer le port du backend
EXPOSE 3000

# 7. Lancer le serveur
CMD ["npm", "run", "dev"]
