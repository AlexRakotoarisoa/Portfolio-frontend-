import axios from 'axios';

// Configurer l'instance Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/', // Remplacez par l'URL de votre API
});

// Intercepteur pour ajouter le access_token d'authentification
apiClient.interceptors.request.use((config) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
