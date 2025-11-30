import apiClient from './index';
import Cookies from 'js-cookie';

// Auth API types
export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Authentication API methods
export const authAPI = {
  // Signup method
  signup: async (data: SignupData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/api/auth/signup', data);
      
      // Store token and user data in cookies if login successful
      if (response.data.success && response.data.data.token) {
        Cookies.set('authToken', response.data.data.token, { expires: 7 }); // 7 days
        Cookies.set('userData', JSON.stringify(response.data.data.user), { expires: 7 });
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Signup failed. Please try again.'
      );
    }
  },

  // Login method
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/api/auth/login', data);
      
      // Store token and user data in cookies if login successful
      if (response.data.success && response.data.data.token) {
        Cookies.set('authToken', response.data.data.token, { expires: 7 }); // 7 days
        Cookies.set('userData', JSON.stringify(response.data.data.user), { expires: 7 });
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Login failed. Please check your credentials.'
      );
    }
  },

  // Logout method
  logout: (): void => {
    Cookies.remove('authToken');
    Cookies.remove('userData');
    window.location.href = '/login';
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!Cookies.get('authToken');
  },

  // Get stored token
  getToken: (): string | null => {
    return Cookies.get('authToken') || null;
  },

  // Get current user data
  getCurrentUser: (): User | null => {
    const userData = Cookies.get('userData');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }
};