import { Metadata } from 'next';
import { Suspense } from 'react';
import { CategoryCard } from '@/components/category-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { guitarApi } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Guitar Categories',
  description: 'Browse our collection of guitar categories',
};

async function CategoryList() {
  const categories = await guitarApi.getCategories();
  
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-600">No categories found</h2>
        <p className="mt-2 text-gray-500">Check back later for updates!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Guitar Categories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of guitar categories to find your perfect match
        </p>
        <Separator className="mt-6 max-w-md mx-auto" />
      </div>

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      }>
        <CategoryList />
      </Suspense>
    </div>
  );
}
