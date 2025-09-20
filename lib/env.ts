/**
 * Environment variable validation and configuration
 * This ensures all required environment variables are present and valid
 */

import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Supabase configuration - with fallbacks for development
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url('Invalid Supabase URL')
    .default('https://ubaudenvfrspjqfbllyn.supabase.co'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'Supabase anon key is required')
    .default(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYXVkZW52ZnJzcGpxZmJsbHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjY3MzAsImV4cCI6MjA3MzE0MjczMH0.tdR1VX8mNEIMwtFgL1-mt1ubRlKNOq9RdvDrKvoAltw'
    ),

  // Application configuration
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),

  // Optional environment variables
  NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

// Validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(
        err => `${err.path.join('.')}: ${err.message}`
      );

      // In development, show a warning instead of throwing an error
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `⚠️ Environment validation warnings:\n${missingVars.join('\n')}\n\n` +
            'Using fallback values for development. For production, please set these environment variables.'
        );

        // Return parsed environment with defaults
        return envSchema.parse({
          ...process.env,
          // Add any missing required fields with defaults
          NEXT_PUBLIC_SUPABASE_URL:
            process.env.NEXT_PUBLIC_SUPABASE_URL ||
            'https://ubaudenvfrspjqfbllyn.supabase.co',
          NEXT_PUBLIC_SUPABASE_ANON_KEY:
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYXVkZW52ZnJzcGpxZmJsbHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjY3MzAsImV4cCI6MjA3MzE0MjczMH0.tdR1VX8mNEIMwtFgL1-mt1ubRlKNOq9RdvDrKvoAltw',
        });
      }

      // In production, throw an error
      throw new Error(
        `❌ Environment validation failed:\n${missingVars.join('\n')}\n\n` +
          'Please check your environment variables and ensure all required variables are set.'
      );
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Log environment status in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Environment loaded successfully:', {
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
    supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
    appUrl: env.NEXT_PUBLIC_APP_URL,
    nodeEnv: env.NODE_ENV,
  });
}

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;

// Helper function to check if we're in production
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';

// Helper function to get the correct app URL
export const getAppUrl = () => {
  if (isProduction && env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return env.NEXT_PUBLIC_APP_URL;
};
