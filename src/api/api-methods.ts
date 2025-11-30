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

// Models API types
export interface Model {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  category: string;
  provider: string;
  pricing: 'free' | 'freemium' | 'paid';
  rating: number;
  reviewsCount: number;
  installsCount?: number;
  capabilities: string[];
  isApiAvailable: boolean;
  isOpenSource: boolean;
  modelType?: string;
  externalUrl?: string;
  tags: string[];
  bestFor?: string[];
  features?: string[];
  examplePrompts?: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ModelsResponse {
  success: boolean;
  data: {
    models: Model[];
    count: number;
  };
}

export interface ModelUploadData {
  name: string;
  shortDescription: string;
  longDescription?: string;
  category: string;
  provider: string;
  pricing: 'free' | 'freemium' | 'paid';
  modelType?: string;
  externalUrl?: string;
  isApiAvailable: boolean;
  isOpenSource: boolean;
  tags: string[];
  capabilities: string[];
  bestFor: string[];
  features: string[];
  examplePrompts: string[];
}

export interface ModelUploadResponse {
  success: boolean;
  message: string;
  data: {
    model: {
      id: string;
      name: string;
      slug: string;
      shortDescription: string;
      category: string;
      provider: string;
      status: string;
      createdAt: string;
    };
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

// Models API methods
export const modelsAPI = {
  // Get user's uploaded models
  getUserModels: async (): Promise<ModelsResponse> => {
    try {
      const response = await apiClient.get('/api/models/my-models');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch user models.'
      );
    }
  },

  // Upload a new model
  uploadModel: async (data: ModelUploadData): Promise<ModelUploadResponse> => {
    try {
      const response = await apiClient.post('/api/models', data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.errors?.join(', ') ||
        error.message || 
        'Failed to upload model.'
      );
    }
  }
};