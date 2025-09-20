/**
 * Console Error Checker
 * This script helps identify common console errors in the application
 */

const commonErrors = [
  {
    pattern: /Cannot find module/,
    solution: 'Check import paths and ensure all dependencies are installed',
    severity: 'high',
  },
  {
    pattern: /ReferenceError/,
    solution: 'Check for undefined variables or missing imports',
    severity: 'high',
  },
  {
    pattern: /TypeError/,
    solution: 'Check for null/undefined values or incorrect function calls',
    severity: 'high',
  },
  {
    pattern: /Failed to load resource/,
    solution: 'Check file paths and ensure assets exist',
    severity: 'medium',
  },
  {
    pattern: /CORS/,
    solution: 'Check CORS configuration for API calls',
    severity: 'medium',
  },
  {
    pattern: /Environment validation failed/,
    solution: 'Check environment variables configuration',
    severity: 'high',
  },
];

function checkConsoleErrors() {
  console.log('🔍 Checking for common console errors...');

  // Override console.error to catch errors
  const originalError = console.error;
  console.error = function (...args) {
    const errorMessage = args.join(' ');

    // Check against common error patterns
    for (const error of commonErrors) {
      if (error.pattern.test(errorMessage)) {
        console.warn(
          `⚠️ Detected ${error.severity} priority error:`,
          errorMessage
        );
        console.info(`💡 Suggested solution: ${error.solution}`);
      }
    }

    // Call original console.error
    originalError.apply(console, args);
  };

  console.log('✅ Console error monitoring enabled');
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { checkConsoleErrors, commonErrors };
}

// Auto-run in browser
if (typeof window !== 'undefined') {
  checkConsoleErrors();
}
