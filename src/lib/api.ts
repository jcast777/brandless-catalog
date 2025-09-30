import axios from 'axios'
import { Guitar, Category, Tag, GuitarFilters, PaginatedResponse } from '@/types/guitar'

export interface MenuItemType {
  id: number;
  title: string;
  url: string;
  target?: string;
  children?: MenuItemType[];
}

export interface Menu {
  id: number;
  name: string;
  slug: string;
  location: string;
  description?: string;
  is_active: boolean;
  items: MenuItemType[];
  settings?: any;
  created_at: string;
  updated_at: string;
}

// Use internal URL for server-side requests, public URL for client-side
const getApiUrl = () => {
  // Check if we're on the server side
  if (typeof window === 'undefined') {
    // Server-side should use the internal Docker service name
    return process.env.INTERNAL_API_URL || 'http://backend/api';
  }
  // Client-side should use the public URL
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
}

// Create base API instance
export const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create public API instance for content endpoints
export const publicApi = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Token': process.env.NEXT_PUBLIC_API_TOKEN || '',
  },
})

// Request interceptor for authenticated API (user-specific operations)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Request interceptor for public API (content access)
publicApi.interceptors.request.use(
  (config) => {
    // Always use API token for public endpoints
    const apiToken = process.env.NEXT_PUBLIC_API_TOKEN
    
    if (apiToken) {
      config.headers['X-API-Token'] = apiToken
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for authenticated API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access for user authentication
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Response interceptor for public API
publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

// Menu API functions
export const menuApi = {
  getMenu: async (location: string): Promise<Menu[] | null> => {
    try {
      const response = await publicApi.get(`/menus/${location}`);
      
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log(`No menu found for location: ${location}`);
        return null;
      }
      console.error('Error fetching menu:', error);
      throw error;
    }
  },
};

// Guitar Catalog API functions (using public API with token)
export const guitarApi = {
  // Get all guitars with filters
  getGuitars: async (filters: GuitarFilters = {}): Promise<PaginatedResponse<Guitar>> => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString())
      }
    })
    
    const response = await publicApi.get(`/content/posts?${params.toString()}`)
    return response.data
  },

  // Get featured guitars
  getFeaturedGuitars: async (): Promise<Guitar[]> => {
    const response = await publicApi.get('/content/posts/featured')
    return response.data
  },

  // Get single guitar by slug
  getGuitar: async (slug: string): Promise<Guitar> => {
    const response = await publicApi.get(`/content/posts/${slug}`)
    return response.data
  },

  // Get guitar categories
  getCategories: async (): Promise<Category[]> => {
    const response = await publicApi.get('/content/categories')
    return response.data.data || response.data || [];
  },

  // Get guitar tags
  getTags: async (): Promise<Tag[]> => {
    const response = await publicApi.get('/content/tags')
    return response.data.data || response.data || [];
  },

  // Search guitars
  searchGuitars: async (query: string): Promise<PaginatedResponse<Guitar>> => {
    const response = await publicApi.get(`/content/posts?search=${encodeURIComponent(query)}`)
    return response.data
  }
}

// Authentication API functions
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      password_confirmation: password
    })
    return response.data
  },

  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },

  getUser: async () => {
    const response = await api.get('/auth/user')
    return response.data
  }
}

// Content API functions (using public API with token)
export const contentApi = {
  // Posts
  posts: {
    getAll: async (params: Record<string, any> = {}) => {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString())
        }
      })
      const response = await publicApi.get(`/content/posts?${searchParams.toString()}`)
      return response.data
    },
    getBySlug: async (slug: string) => {
      const response = await publicApi.get(`/content/posts/${slug}`)
      return response.data
    },
    getFeatured: async () => {
      const response = await publicApi.get('/content/posts/featured')
      return response.data
    }
  },

  // Pages
  pages: {
    getAll: async (params: Record<string, any> = {}) => {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString())
        }
      })
      const response = await publicApi.get(`/content/pages?${searchParams.toString()}`)
      return response.data
    },
    getBySlug: async (slug: string) => {
      const response = await publicApi.get(`/content/pages/${slug}`)
      return response.data
    }
  },

  // Categories
  categories: {
    getAll: async () => {
      const response = await publicApi.get('/content/categories')
      return response.data
    },
    getBySlug: async (slug: string) => {
      const response = await publicApi.get(`/content/categories/${slug}`)
      return response.data
    }
  },

  // Tags
  tags: {
    getAll: async () => {
      const response = await publicApi.get('/content/tags')
      return response.data
    },
    getBySlug: async (slug: string) => {
      const response = await publicApi.get(`/content/tags/${slug}`)
      return response.data
    }
  },

  // Menus
  menus: {
    getAll: async () => {
      const response = await publicApi.get('/menus')
      return response.data
    },
    getBySlug: async (slug: string) => {
      const response = await publicApi.get(`/menus/${slug}`)
      return response.data
    }
  },

  // Settings (public only)
  settings: {
    getPublic: async () => {
      const response = await publicApi.get('/settings/public')
      return response.data
    },
    getByKey: async (key: string) => {
      const response = await publicApi.get(`/settings/public/${key}`)
      return response.data
    }
  }
}

// API Token utilities
export const apiTokenUtils = {
  // Check if API token is configured
  isConfigured: (): boolean => {
    return !!process.env.NEXT_PUBLIC_API_TOKEN && process.env.NEXT_PUBLIC_API_TOKEN !== 'your-public-api-token-here'
  },

  // Get current API token
  getToken: (): string | null => {
    return process.env.NEXT_PUBLIC_API_TOKEN || null
  },

  // Test API token validity
  testToken: async (): Promise<boolean> => {
    try {
      await publicApi.get('/content/posts?per_page=1')
      return true
    } catch (error) {
      return false
    }
  }
}

export default api
