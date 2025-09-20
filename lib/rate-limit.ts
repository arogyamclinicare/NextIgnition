/**
 * Rate limiting utilities for API endpoints
 * Implements token bucket algorithm for rate limiting
 */

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (req: Request) => string; // Custom key generator
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (in production, use Redis or similar)
const store: RateLimitStore = {};

// Default key generator (uses IP address)
const defaultKeyGenerator = (req: Request): string => {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
};

// Clean up expired entries
const cleanup = () => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
};

// Rate limiting middleware
export function createRateLimit(config: RateLimitConfig) {
  const { windowMs, maxRequests, keyGenerator = defaultKeyGenerator } = config;

  return async (
    req: Request
  ): Promise<{ success: boolean; remaining: number; resetTime: number }> => {
    const key = keyGenerator(req);
    const now = Date.now();
    const resetTime = now + windowMs;

    // Clean up expired entries periodically
    if (Math.random() < 0.01) {
      cleanup();
    }

    // Get or create entry
    let entry = store[key];
    if (!entry || entry.resetTime < now) {
      entry = {
        count: 0,
        resetTime,
      };
      store[key] = entry;
    }

    // Check if limit exceeded
    if (entry.count >= maxRequests) {
      return {
        success: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment counter
    entry.count++;

    return {
      success: true,
      remaining: maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  };
}

// Predefined rate limiters
export const rateLimiters = {
  // Strict rate limiter for sensitive operations
  strict: createRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
  }),

  // Standard rate limiter for general API usage
  standard: createRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
  }),

  // Lenient rate limiter for public endpoints
  lenient: createRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000,
  }),

  // Form submission rate limiter
  formSubmission: createRateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
  }),
};

// Helper function to create rate limit response
export function createRateLimitResponse(remaining: number, resetTime: number) {
  return new Response(
    JSON.stringify({
      error: 'Rate limit exceeded',
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
        'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
      },
    }
  );
}
