import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '@/types/user';
import { Artist } from '@/types/artist';

// JWT Secret should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days

export type UserType = 'user' | 'artist';

export interface TokenPayload {
  id: string;
  email: string;
  type: UserType;
}

/**
 * Generate a JWT token for a user or artist
 */
export function generateToken(id: string, email: string, type: UserType): string {
  return jwt.sign(
    { id, email, type },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Verify a JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Get user data without sensitive information
 */
export function sanitizeUser(user: User): Omit<User, 'password'> {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
}

/**
 * Get artist data without sensitive information
 */
export function sanitizeArtist(artist: Artist): Omit<Artist, 'password'> {
  const { password, ...sanitizedArtist } = artist;
  return sanitizedArtist;
}
