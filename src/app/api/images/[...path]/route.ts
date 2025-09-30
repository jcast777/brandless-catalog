import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = params.path.join('/');
    const backendUrl = process.env.INTERNAL_API_URL?.replace('/api', '') || 'http://backend';
    const imageUrl = `${backendUrl}/storage/${imagePath}`;

    // Extract query parameters (expires, signature, etc.) from the original request
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const fullImageUrl = queryString ? `${imageUrl}?${queryString}` : imageUrl;

    // Fetch the image from the backend
    const response = await fetch(fullImageUrl, {
      headers: {
        'User-Agent': 'NextJS-Image-Proxy',
      },
    });

    if (!response.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Get the image data and content type
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': imageBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
