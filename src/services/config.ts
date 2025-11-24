import Constants from 'expo-constants';

// Configuración dinámica de API URL basada en entorno
const getApiUrl = (): string => {
  // Obtener URL desde configuración de Expo
  const configUrl = Constants.expoConfig?.extra?.apiUrl;

  if (configUrl) {
    return configUrl;
  }

  // Fallback para desarrollo local
  if (__DEV__) {
    // Para emulador iOS
    if (Constants.platform?.ios) {
      return 'http://localhost:8080/v1/api';
    }
    // Para emulador Android
    if (Constants.platform?.android) {
      return 'http://10.0.2.2:8080/v1/api';
    }
  }

  // URL por defecto (producción)
  return 'https://api.medical-app.com/v1/api';
};

export const API_URL = getApiUrl();

// Log para debugging
console.log('🔧 API URL configurada:', API_URL);
console.log('🔧 Plataforma:', Constants.platform);
console.log('🔧 Config URL:', Constants.expoConfig?.extra?.apiUrl);

// Configuración adicional
export const CONFIG = {
  API_TIMEOUT: 30000, // 30 segundos
  TOKEN_EXPIRY_HOURS: 24,
  MAX_RETRY_ATTEMPTS: 3,
} as const;
