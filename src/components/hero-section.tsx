import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome to{' '}
            <span className="text-primary">
              {process.env.NEXT_PUBLIC_SITE_NAME || 'Brandless Theme'}
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 
             'Discover amazing content, insights, and stories. Built with modern technology for the best reading experience.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/blog">
                Explore Articles
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
