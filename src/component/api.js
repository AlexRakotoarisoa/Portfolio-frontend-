import axios from 'axios';

// Crée une instance Axios avec la base URL de votre API
const api = axios.create({
  baseURL: 'http://localhost:8000',  // Change cette URL pour celle de ton backend
});

// Fonction pour rafraîchir le token d'accès
const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) {
    throw new Error('Pas de token de rafraîchissement trouvé');
  }

  try {
    // Requête pour obtenir un nouveau token d'accès en utilisant le refresh token
    const response = await axios.post('http://localhost:8000/auth/jwt/refresh/', {
      refresh: refresh_token,
    });

    const { access } = response.data;

    // Stocke le nouveau token d'accès dans le localStorage
    localStorage.setItem('access_token', access);

    return access; // Retourne le nouveau token pour continuer la requête
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error);
    throw error;
  }
};

// Intercepteur pour ajouter automatiquement le token d'accès dans chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer l'expiration du token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est une 401 et que la requête n'a pas encore été réessayée
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Rafraîchir le token d'accès
        const access_token = await refreshAccessToken();

        // Met à jour l'en-tête Authorization avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        // Refaire la requête originale avec le nouveau token
        return api(originalRequest);
      } catch (refreshError) {
        // Si le rafraîchissement échoue, déconnecte l'utilisateur
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/'; // Redirection vers la page de connexion
      }
    }

    return Promise.reject(error);
  }
);

export default api;
