/**
 * CSRF (Cross-Site Request Forgery) protection utilities
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomBytes } from 'crypto';

// CSRF token storage (in production, use Redis or similar)
const csrfTokens = new Map<string, { token: string; expires: number }>();

// Clean up expired tokens
const cleanupExpiredTokens = () => {
  const now = Date.now();
  for (const [key, value] of csrfTokens.entries()) {
    if (value.expires < now) {
      csrfTokens.delete(key);
    }
  }
};

// Generate a secure random token
const generateToken = (): string => {
  return randomBytes(32).toString('hex');
};

// Create a hash of the token for storage
const hashToken = (token: string): string => {
  return createHash('sha256').update(token).digest('hex');
};

// CSRF token configuration
const CSRF_CONFIG = {
  tokenLength: 32,
  maxAge: 60 * 60 * 1000, // 1 hour
  cookieName: 'csrf-token',
  headerName: 'x-csrf-token',
};

/**
 * Generate a CSRF token for the given session
 */
export function generateCSRFToken(sessionId: string): string {
  const token = generateToken();
  const hashedToken = hashToken(token);

  // Store the hashed token with expiration
  csrfTokens.set(sessionId, {
    token: hashedToken,
    expires: Date.now() + CSRF_CONFIG.maxAge,
  });

  // Clean up expired tokens periodically
  if (Math.random() < 0.01) {
    cleanupExpiredTokens();
  }

  return token;
}

/**
 * Verify a CSRF token
 */
export function verifyCSRFToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId);

  if (!stored || stored.expires < Date.now()) {
    return false;
  }

  const hashedToken = hashToken(token);
  return stored.token === hashedToken;
}

/**
 * Get session ID from request (you can customize this based on your auth system)
 */
export function getSessionId(request: NextRequest): string {
  // Try to get from cookie first
  const cookieSessionId = request.cookies.get('session-id')?.value;
  if (cookieSessionId) {
    return cookieSessionId;
  }

  // Fallback to IP address (less secure but works for basic protection)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

/**
 * CSRF middleware for API routes
 */
export function csrfMiddleware(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Skip CSRF for GET requests
    if (request.method === 'GET') {
      return handler(request);
    }

    const sessionId = getSessionId(request);
    const token = request.headers.get(CSRF_CONFIG.headerName);

    if (!token || !verifyCSRFToken(sessionId, token)) {
      return new NextResponse(
        JSON.stringify({
          error: 'CSRF token validation failed',
          message: 'Invalid or missing CSRF token',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return handler(request);
  };
}

/**
 * Add CSRF token to response headers
 */
export function addCSRFTokenToResponse(
  response: NextResponse,
  sessionId: string
): NextResponse {
  const token = generateCSRFToken(sessionId);

  response.headers.set(CSRF_CONFIG.headerName, token);
  response.cookies.set(CSRF_CONFIG.cookieName, token, {
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: CSRF_CONFIG.maxAge / 1000, // Convert to seconds
  });

  return response;
}

/**
 * Get CSRF token for client-side use
 */
export function getCSRFToken(sessionId: string): string {
  return generateCSRFToken(sessionId);
}
