import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// Paths that require authentication
const PROTECTED_PATHS = [
  '/api/payment',
  '/api/user/library',
  '/api/user/playlists',
  '/api/artist/analytics'
  // '/api/artist/songs' - Removed to disable authentication for artist songs
  // '/api/upload' - Removed to disable authentication for uploads
];

// Paths that are only accessible to artists
const ARTIST_ONLY_PATHS = [
  '/api/artist/analytics'
  // '/api/artist/songs' - Removed to disable authentication for artist songs
  // '/api/upload' - Removed to disable authentication for uploads
];

// Paths that are excluded from authentication
const PUBLIC_PATHS = [
  '/api/upload/image',
  '/api/upload', // Added to make upload endpoint public
  '/api/artist/songs', // Added to make artist songs endpoint public
  '/api/auth/register',
  '/api/auth/login',
  '/api/auth/verify'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public (no auth required)
  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check if the path requires authentication
  const isProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path));

  if (isProtectedPath) {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Check if the path is artist-only and the user is not an artist
    const isArtistOnlyPath = ARTIST_ONLY_PATHS.some(path => pathname.startsWith(path));

    if (isArtistOnlyPath && payload.type !== 'artist') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
