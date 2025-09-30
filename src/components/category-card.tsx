import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Category } from '../types/category';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-4xl text-gray-400">
              {category.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
        {category.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {category.description}
          </p>
        )}
        <Button asChild variant="outline" className="mt-2">
          <Link href={`/guitars?category=${category.slug}`}>
            View Guitars
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
