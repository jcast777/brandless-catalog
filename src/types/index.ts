export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
  created_at: string
  updated_at: string
  roles?: Role[]
  permissions?: Permission[]
}

export interface Role {
  id: number
  name: string
  guard_name: string
}

export interface Permission {
  id: number
  name: string
  guard_name: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  color: string
  parent_id?: number
  sort_order: number
  is_active: boolean
  meta?: Record<string, any>
  created_at: string
  updated_at: string
  parent?: Category
  children?: Category[]
  posts_count?: number
}

export interface Tag {
  id: number
  name: string
  slug: string
  description?: string
  color: string
  is_active: boolean
  meta?: Record<string, any>
  created_at: string
  updated_at: string
  posts_count?: number
}

export interface Post {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  featured_image_url?: string
  status: 'draft' | 'published' | 'scheduled' | 'archived'
  published_at?: string
  author_id: number
  category_id?: number
  views_count: number
  is_featured: boolean
  allow_comments: boolean
  meta?: Record<string, any>
  seo?: Record<string, any>
  created_at: string
  updated_at: string
  author: User
  category?: Category
  tags: Tag[]
  media?: MediaItem[]
}

export interface Page {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  template: string
  featured_image?: string
  status: 'draft' | 'published' | 'private'
  published_at?: string
  author_id: number
  parent_id?: number
  sort_order: number
  show_in_menu: boolean
  meta?: Record<string, any>
  seo?: Record<string, any>
  created_at: string
  updated_at: string
  author: User
  parent?: Page
  children?: Page[]
  media?: MediaItem[]
}

export interface Menu {
  id: number
  name: string
  slug: string
  description?: string
  location?: string
  is_active: boolean
  settings?: Record<string, any>
  created_at: string
  updated_at: string
  items: MenuItem[]
}

export interface MenuItem {
  id: number
  menu_id: number
  parent_id?: number
  title: string
  url?: string
  type: 'custom' | 'post' | 'page' | 'category'
  object_id?: number
  target: '_self' | '_blank'
  css_class?: string
  sort_order: number
  is_active: boolean
  meta?: Record<string, any>
  created_at: string
  updated_at: string
  children?: MenuItem[]
}

export interface MediaItem {
  id: number
  model_type: string
  model_id: number
  uuid: string
  collection_name: string
  name: string
  file_name: string
  mime_type: string
  disk: string
  conversions_disk: string
  size: number
  manipulations: any[]
  custom_properties: Record<string, any>
  generated_conversions: Record<string, any>
  responsive_images: any[]
  order_column: number
  created_at: string
  updated_at: string
  original_url: string
  preview_url: string
}

export interface Setting {
  id: number
  group: string
  key: string
  value?: string
  type: 'text' | 'textarea' | 'select' | 'boolean' | 'json' | 'file'
  options?: Record<string, any>
  description?: string
  sort_order: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<{
    url?: string
    label: string
    active: boolean
  }>
  next_page_url?: string
  path: string
  per_page: number
  prev_page_url?: string
  to: number
  total: number
}
