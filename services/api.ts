
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Institutional API Fetcher
 * Includes pre-flight checks to prevent execution during frontend-only preview mode.
 */
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  // Pre-flight check: Prevent network calls if the environment is strictly frontend-preview
  const isPreviewOnly = typeof window !== 'undefined' && 
    (window.location.hostname !== 'localhost' && !window.location.hostname.includes('api'));

  if (isPreviewOnly && options.method !== 'GET') {
    throw new Error('Digital transmission layer is currently awaiting backend integration.');
  }

  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || result.errors?.[0] || 'Institutional API Error');
    }

    return result;
  } catch (error: any) {
    // Re-throw to allow component-level honest handling
    throw error;
  }
};
