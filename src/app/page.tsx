import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GuitarCard } from '@/components/guitar-card';
import { guitarApi } from '@/lib/api';
import { GuitarFilters } from '@/types/guitar';

async function fetchGuitars() {
  try {
    const filters: GuitarFilters = {
      page: 1,
      per_page: 12,
      sort_by: 'created_at',
      sort_dir: 'desc'
    };
    // Fetch both featured and recent guitars in parallel
    const [featuredResponse, recentResponse] = await Promise.all([
      guitarApi.getFeaturedGuitars(),
      guitarApi.getGuitars(filters)
    ]);
    
    return { 
      featuredGuitars: featuredResponse || [], 
      recentGuitars: recentResponse.data || [] 
    };
  } catch (error) {
    return { featuredGuitars: [], recentGuitars: [] };
  }
}

export default async function HomePage() {
  const { featuredGuitars, recentGuitars } = await fetchGuitars();
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Discover Your Perfect Guitar
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Explore our curated collection of premium guitars from the world's finest brands. 
              From vintage classics to modern masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/guitars">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Browse Catalog
                </Button>
              </Link>
              <Link href="/featured">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                  Featured Guitars
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Guitars */}
      {featuredGuitars.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Guitars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked instruments that represent the pinnacle of craftsmanship and sound quality
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredGuitars.slice(0, 4).map((guitar) => (
              <GuitarCard key={guitar.id} guitar={guitar} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/featured">
              <Button variant="outline" size="lg">
                View All Featured Guitars
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Additions */}
      <section className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Latest Additions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the newest guitars added to our collection
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentGuitars.map((guitar) => (
            <GuitarCard key={guitar.id} guitar={guitar} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/guitars">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View Full Catalog
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect guitar for your style and sound
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Electric Guitars', icon: '🎸', description: 'Rock, blues, and everything electric' },
              { name: 'Acoustic Guitars', icon: '🪕', description: 'Warm, natural acoustic tones' },
              { name: 'Bass Guitars', icon: '🎸', description: 'Deep, powerful low-end foundation' },
              { name: 'Classical Guitars', icon: '🎼', description: 'Traditional nylon-string elegance' },
            ].map((category) => (
              <Link key={category.name} href={`/guitars?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
