'use client';

import { useState, useEffect } from 'react';
import { Guitar, GuitarFilters, PaginatedResponse } from '@/types/guitar';
import { guitarApi } from '@/lib/api';
import { GuitarGrid } from '@/components/guitar-grid';
import { GuitarFilters as Filters } from '@/components/guitar-filters';
import { Button } from '@/components/ui/button';

export default function GuitarsPage() {
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginatedResponse<Guitar> | null>(null);
  const [filters, setFilters] = useState<GuitarFilters>({
    page: 1,
    per_page: 12,
    sort_by: 'created_at',
    sort_dir: 'desc'
  });

  useEffect(() => {
    fetchGuitars();
  }, [filters]);

  const fetchGuitars = async () => {
    setLoading(true);
    try {
      const response = await guitarApi.getGuitars(filters);
      setGuitars(response.data);
      setPagination(response);
    } catch (error) {
      console.error('Error fetching guitars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: GuitarFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      per_page: 12,
      sort_by: 'created_at',
      sort_dir: 'desc'
    });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Guitar Catalog</h1>
        <p className="text-gray-600">
          Discover our collection of premium guitars from top brands
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="sticky top-4">
            <Filters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              {pagination && (
                <>
                  Showing {pagination.from}-{pagination.to} of {pagination.total} guitars
                </>
              )}
            </div>
          </div>

          {/* Guitar Grid */}
          <GuitarGrid guitars={guitars} loading={loading} />

          {/* Pagination */}
          {pagination && pagination.last_page > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={pagination.current_page === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
