'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Guitar } from '@/types/guitar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GuitarCardProps {
  guitar: Guitar;
}

export function GuitarCard({ guitar }: GuitarCardProps) {
  const { meta } = guitar;
  const price = meta?.price ? `$${Number(meta.price).toLocaleString()}` : 'Price on request';
  const brand = meta?.brand || 'Unknown Brand';
  const model = meta?.model || '';
  const year = meta?.year || '';
  const color = meta?.color || '';
  const type = meta?.type || '';

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={guitar.featured_image_url || guitar.featured_image || '/placeholder-guitar.jpg'}
            alt={guitar.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {guitar.is_featured && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
              Featured
            </Badge>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">{type}</Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
              {guitar.title}
            </h3>
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Brand:</span> {brand}</p>
            {model && <p><span className="font-medium">Model:</span> {model}</p>}
            {year && <p><span className="font-medium">Year:</span> {year}</p>}
            {color && <p><span className="font-medium">Color:</span> {color}</p>}
          </div>
          
          {guitar.excerpt && (
            <p className="text-sm text-gray-700 line-clamp-2 mt-2">
              {guitar.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap gap-1 mt-2">
            {guitar.tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                {tag.name}
              </Badge>
            ))}
            {guitar.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{guitar.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-xl font-bold text-green-600">
          {price}
        </div>
        <Link href={`/guitars/${guitar.slug}`}>
          <Button size="sm" className="group-hover:bg-blue-600 transition-colors">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
