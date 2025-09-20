import { waitlistFormSchema } from '@/lib/validations';

describe('Waitlist Form Validation', () => {
  it('validates correct form data', () => {
    const validData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      role: 'founder',
      startupStage: 'idea',
    };

    const result = waitlistFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const invalidData = {
      fullName: 'John Doe',
      email: 'invalid-email',
      role: 'founder',
      startupStage: 'idea',
    };

    const result = waitlistFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('valid email');
    }
  });

  it('rejects empty required fields', () => {
    const invalidData = {
      fullName: '',
      email: 'john@example.com',
      role: 'founder',
      startupStage: 'idea',
    };

    const result = waitlistFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('accepts optional fields', () => {
    const validData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      role: 'founder',
      startupStage: 'idea',
      companyName: 'Test Company',
      industry: 'technology',
      location: 'San Francisco',
      phone: '+1234567890',
      linkedinProfile: 'https://linkedin.com/in/johndoe',
      description: 'Test description',
      howHeard: 'google',
      lookingFor: 'funding',
      messageForUs: 'Test message',
    };

    const result = waitlistFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('validates LinkedIn URL format', () => {
    const invalidData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      role: 'founder',
      startupStage: 'idea',
      linkedinProfile: 'not-a-url',
    };

    const result = waitlistFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('valid LinkedIn URL');
    }
  });
});
