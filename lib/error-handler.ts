/**
 * Error handling utilities for production-ready error management
 */

export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
  timestamp: string;
  userId?: string;
  path?: string;
}

export class CustomError extends Error {
  public code: string;
  public statusCode: number;
  public details?: any;

  constructor(message: string, code: string = 'INTERNAL_ERROR', statusCode: number = 500, details?: any) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const errorCodes = {
  // Database errors
  DATABASE_CONNECTION_FAILED: 'DATABASE_CONNECTION_FAILED',
  DATABASE_QUERY_FAILED: 'DATABASE_QUERY_FAILED',
  RECORD_NOT_FOUND: 'RECORD_NOT_FOUND',
  DUPLICATE_RECORD: 'DUPLICATE_RECORD',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PHONE: 'INVALID_PHONE',
  REQUIRED_FIELD_MISSING: 'REQUIRED_FIELD_MISSING',
  
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  
  // External service errors
  SUPABASE_ERROR: 'SUPABASE_ERROR',
  EMAIL_SERVICE_ERROR: 'EMAIL_SERVICE_ERROR',
  
  // General errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
} as const;

export function createError(
  message: string,
  code: string = errorCodes.INTERNAL_ERROR,
  statusCode: number = 500,
  details?: any
): CustomError {
  return new CustomError(message, code, statusCode, details);
}

export function logError(error: Error | CustomError, context?: any): void {
  const errorInfo: AppError = {
    message: error.message,
    code: error instanceof CustomError ? error.code : 'UNKNOWN_ERROR',
    statusCode: error instanceof CustomError ? error.statusCode : 500,
    details: error instanceof CustomError ? error.details : undefined,
    timestamp: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Error:', errorInfo);
    if (context) {
      console.error('📋 Context:', context);
    }
  }

  // In production, you would send this to your logging service
  // Example: Sentry, LogRocket, DataDog, etc.
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement production logging
    console.error('Production Error:', errorInfo);
  }
}

export function handleApiError(error: any): { message: string; code: string; statusCode: number } {
  if (error instanceof CustomError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  // Handle Supabase errors
  if (error?.code && error?.message) {
    return {
      message: error.message,
      code: errorCodes.SUPABASE_ERROR,
      statusCode: 400,
    };
  }

  // Handle network errors
  if (error?.name === 'NetworkError' || error?.message?.includes('fetch')) {
    return {
      message: 'Network error. Please check your connection and try again.',
      code: errorCodes.NETWORK_ERROR,
      statusCode: 503,
    };
  }

  // Default error
  return {
    message: 'An unexpected error occurred. Please try again.',
    code: errorCodes.INTERNAL_ERROR,
    statusCode: 500,
  };
}

export function isClientError(statusCode: number): boolean {
  return statusCode >= 400 && statusCode < 500;
}

export function isServerError(statusCode: number): boolean {
  return statusCode >= 500;
}
