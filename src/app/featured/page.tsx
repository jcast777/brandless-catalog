'use client';

import { useState, useEffect } from 'react';
import { Guitar } from '@/types/guitar';
import { guitarApi } from '@/lib/api';
import { GuitarGrid } from '@/components/guitar-grid';

export default function FeaturedGuitarsPage() {
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedGuitars();
  }, []);

  const fetchFeaturedGuitars = async () => {
    setLoading(true);
    try {
      const response = await guitarApi.getFeaturedGuitars();
      setGuitars(response);
    } catch (error) {
      console.error('Error fetching featured guitars:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Guitars</h1>
        <p className="text-gray-600">
          Handpicked instruments that represent the pinnacle of craftsmanship and sound quality
        </p>
      </div>

      <GuitarGrid guitars={guitars} loading={loading} />
    </div>
  );
}
