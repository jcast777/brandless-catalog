import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate, getImageUrl } from '@/lib/utils'
import { Post } from '@/types'

interface FeaturedPostsProps {
  posts: Post[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts.length) return null

  const [mainPost, ...otherPosts] = posts

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Posts</h2>
        <p className="text-muted-foreground mt-2">
          Don&apos;t miss these highlighted articles
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Main Featured Post */}
        <Card className="lg:row-span-2 overflow-hidden">
          {mainPost.featured_image && (
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={getImageUrl(mainPost.featured_image)}
                alt={mainPost.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              {mainPost.category && (
                <Link 
                  href={`/category/${mainPost.category.slug}`}
                  className="text-primary hover:underline"
                >
                  {mainPost.category.name}
                </Link>
              )}
              <span>•</span>
              <time dateTime={mainPost.published_at}>
                {formatDate(mainPost.published_at || mainPost.created_at)}
              </time>
            </div>
            
            <CardTitle className="text-2xl">
              <Link href={`/post/${mainPost.slug}`} className="hover:text-primary">
                {mainPost.title}
              </Link>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {mainPost.excerpt && (
              <p className="text-muted-foreground mb-4">
                {mainPost.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                By {mainPost.author.name}
              </span>
              
              <Link 
                href={`/post/${mainPost.slug}`}
                className="text-sm text-primary hover:underline"
              >
                Read more
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Other Featured Posts */}
        <div className="space-y-6">
          {otherPosts.slice(0, 3).map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="flex">
                {post.featured_image && (
                  <div className="w-24 h-24 relative overflow-hidden flex-shrink-0">
                    <Image
                      src={getImageUrl(post.featured_image)}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    {post.category && (
                      <Link 
                        href={`/category/${post.category.slug}`}
                        className="text-primary hover:underline"
                      >
                        {post.category.name}
                      </Link>
                    )}
                    <span>•</span>
                    <time dateTime={post.published_at}>
                      {formatDate(post.published_at || post.created_at)}
                    </time>
                  </div>
                  
                  <h3 className="font-semibold line-clamp-2 mb-2">
                    <Link href={`/post/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    By {post.author.name}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
