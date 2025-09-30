'use client';

import { useState, useEffect } from 'react';
import { GuitarFilters as Filters, Category, Tag } from '@/types/guitar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { guitarApi } from '@/lib/api';

interface GuitarFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export function GuitarFilters({ filters, onFiltersChange, onClearFilters }: GuitarFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesResponse, tagsResponse] = await Promise.all([
          guitarApi.getCategories(),
          guitarApi.getTags()
        ]);
        
        // The API functions now return the data directly
        const categoriesData = categoriesResponse || [];
        const tagsData = tagsResponse || [];
        
        // Ensure we always set an array
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setTags(Array.isArray(tagsData) ? tagsData : []);
      } catch (error) {
        console.error('Error fetching filter data:', error);
        setCategories([]);
        setTags([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value, page: 1 });
  };

  const guitarTypes = ['electric', 'acoustic', 'bass', 'classical'];
  const sortOptions = [
    { value: 'created_at', label: 'Newest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: 'title', label: 'Name: A to Z' },
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Filters
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search guitars..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Guitar Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            value={filters.type || ''}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {guitarTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.min_price || ''}
              onChange={(e) => handleFilterChange('min_price', e.target.value ? Number(e.target.value) : undefined)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.max_price || ''}
              onChange={(e) => handleFilterChange('max_price', e.target.value ? Number(e.target.value) : undefined)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={filters.sort_by || 'created_at'}
            onChange={(e) => handleFilterChange('sort_by', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Direction */}
        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <select
            value={filters.sort_dir || 'desc'}
            onChange={(e) => handleFilterChange('sort_dir', e.target.value as 'asc' | 'desc')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
