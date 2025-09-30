'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Guitar } from '@/types/guitar';
import { guitarApi } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GuitarDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [guitar, setGuitar] = useState<Guitar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuitar = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await guitarApi.getGuitar(slug);
        setGuitar(response);
      } catch (err: any) {
        setError(err.response?.status === 404 ? 'Guitar not found' : 'Error loading guitar');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchGuitar();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-[4/3] bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !guitar) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Guitar not found'}
          </h1>
          <Link href="/guitars">
            <Button>Back to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { meta } = guitar;
  const price = meta?.price ? `$${Number(meta.price).toLocaleString()}` : 'Price on request';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/guitars" className="text-blue-600 hover:underline">Guitars</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{guitar.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={guitar.featured_image_url || guitar.featured_image || '/placeholder-guitar.jpg'}
            alt={guitar.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {guitar.is_featured && (
            <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
              Featured
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{guitar.title}</h1>
            {guitar.category && (
              <Badge variant="secondary" className="mb-4">
                {guitar.category.name}
              </Badge>
            )}
            <div className="text-3xl font-bold text-green-600 mb-4">{price}</div>
          </div>

          {guitar.excerpt && (
            <p className="text-lg text-gray-700">{guitar.excerpt}</p>
          )}

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meta?.brand && (
                  <div>
                    <span className="font-medium text-gray-600">Brand:</span>
                    <span className="ml-2">{meta.brand}</span>
                  </div>
                )}
                {meta?.model && (
                  <div>
                    <span className="font-medium text-gray-600">Model:</span>
                    <span className="ml-2">{meta.model}</span>
                  </div>
                )}
                {meta?.type && (
                  <div>
                    <span className="font-medium text-gray-600">Type:</span>
                    <span className="ml-2">{meta.type}</span>
                  </div>
                )}
                {meta?.year && (
                  <div>
                    <span className="font-medium text-gray-600">Year:</span>
                    <span className="ml-2">{meta.year}</span>
                  </div>
                )}
                {meta?.body_wood && (
                  <div>
                    <span className="font-medium text-gray-600">Body Wood:</span>
                    <span className="ml-2">{meta.body_wood}</span>
                  </div>
                )}
                {meta?.top_wood && (
                  <div>
                    <span className="font-medium text-gray-600">Top Wood:</span>
                    <span className="ml-2">{meta.top_wood}</span>
                  </div>
                )}
                {meta?.fretboard_wood && (
                  <div>
                    <span className="font-medium text-gray-600">Fretboard:</span>
                    <span className="ml-2">{meta.fretboard_wood}</span>
                  </div>
                )}
                {meta?.color && (
                  <div>
                    <span className="font-medium text-gray-600">Color:</span>
                    <span className="ml-2">{meta.color}</span>
                  </div>
                )}
                {meta?.pickups && (
                  <div>
                    <span className="font-medium text-gray-600">Pickups:</span>
                    <span className="ml-2">{meta.pickups}</span>
                  </div>
                )}
                {meta?.scale_length && (
                  <div>
                    <span className="font-medium text-gray-600">Scale Length:</span>
                    <span className="ml-2">{meta.scale_length}</span>
                  </div>
                )}
                {meta?.frets && (
                  <div>
                    <span className="font-medium text-gray-600">Frets:</span>
                    <span className="ml-2">{meta.frets}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {guitar.tags.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {guitar.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <Button size="lg" className="flex-1">
              Contact for Price
            </Button>
            <Button variant="outline" size="lg">
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      {guitar.content && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: guitar.content }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
