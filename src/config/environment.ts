// Environment configuration for different deployment stages
export const config = {
  // API Base URL - will be different for frontend and backend deployments
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // Frontend URL for email verification links
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // Feature flags
  features: {
    emailVerification: true,
    adminPanel: true,
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.apiBaseUrl}/api${endpoint}`;
};

// Helper function to get frontend URL
export const getFrontendUrl = (path: string = ''): string => {
  return `${config.frontendUrl}${path}`;
}; 