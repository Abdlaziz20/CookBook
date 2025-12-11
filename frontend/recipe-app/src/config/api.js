// Configuration de l'URL de l'API
// En développement local, utilise localhost:3000
// En production (Docker), utilise l'URL du service backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default API_URL;

