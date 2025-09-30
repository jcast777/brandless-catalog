import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate, truncateText, getImageUrl } from '@/lib/utils'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {post.featured_image && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={getImageUrl(post.featured_image)}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
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
        
        <CardTitle className="line-clamp-2">
          <Link href={`/post/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {post.excerpt && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {truncateText(post.excerpt, 150)}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>By {post.author.name}</span>
          </div>
          
          <Link 
            href={`/post/${post.slug}`}
            className="text-sm text-primary hover:underline"
          >
            Read more
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
