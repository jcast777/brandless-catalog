import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">
              {process.env.NEXT_PUBLIC_SITE_NAME || 'Brandless CMS'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'A modern headless CMS'}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/technology" className="text-muted-foreground hover:text-foreground">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="text-muted-foreground hover:text-foreground">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/category/business" className="text-muted-foreground hover:text-foreground">
                  Business
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME || 'Brandless CMS'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
