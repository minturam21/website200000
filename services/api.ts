
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Standard API Fetcher for SM Skills Institute.
 * Throws errors on network failure to allow services to implement fallbacks.
 */
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
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
    // Re-throw to allow service-level fallback logic
    throw error;
  }
};
