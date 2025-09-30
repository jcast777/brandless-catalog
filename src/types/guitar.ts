import { Post, Category, Tag, PaginatedResponse, ApiResponse } from './index';

// Guitar-specific types extending the Post interface
export interface Guitar extends Post {
  meta: {
    brand: string;
    model: string;
    type: string;
    year?: number;
    price: number;
    body_wood?: string;
    top_wood?: string;
    fretboard_wood?: string;
    color?: string;
    pickups?: string;
    electronics?: string;
    scale_length?: string;
    frets?: number;
    [key: string]: any;
  };
}

export interface GuitarFilters {
  category?: string;
  brand?: string;
  type?: string;
  min_price?: number;
  max_price?: number;
  color?: string;
  sort_by?: 'price' | 'year' | 'created_at' | 'title';
  sort_dir?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
  search?: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  roles?: string[];
  permissions?: string[];
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Re-export common types from index.ts
export type { Post, Category, Tag, PaginatedResponse, ApiResponse } from './index';
