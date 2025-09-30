export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  color?: string;
  parent_id?: number | null;
  sort_order: number;
  is_active: boolean;
  meta?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
