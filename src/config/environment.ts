// Environment configuration for single deployment with rewrites
export const config = {
  // API Base URL - same domain for single deployment
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
  
  // Frontend URL - same as API URL for single deployment
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'),
  
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