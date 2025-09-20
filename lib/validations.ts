import { z } from 'zod';

export const waitlistFormSchema = z.object({
  // Required fields
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),

  role: z.string().min(1, 'Please select your role'),

  startupStage: z.string().min(1, 'Please select your startup stage'),

  // Optional fields
  companyName: z
    .string()
    .max(255, 'Company name must be less than 255 characters')
    .optional(),
  industry: z
    .string()
    .max(100, 'Industry must be less than 100 characters')
    .optional(),
  location: z
    .string()
    .max(100, 'Location must be less than 100 characters')
    .optional(),
  phone: z
    .string()
    .max(20, 'Phone number must be less than 20 characters')
    .optional(),
  linkedinProfile: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  howHeard: z
    .string()
    .max(255, 'How you heard about us must be less than 255 characters')
    .optional(),
  lookingFor: z
    .string()
    .max(255, "What you're looking for must be less than 255 characters")
    .optional(),
  messageForUs: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;

// Form options
export const roleOptions = [
  { value: 'founder', label: 'Founder' },
  { value: 'co-founder', label: 'Co-founder' },
  { value: 'investor', label: 'Investor' },
  { value: 'expert-mentor', label: 'Expert/Mentor' },
  { value: 'other', label: 'Other' },
];

export const startupStageOptions = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'mvp', label: 'MVP Development' },
  { value: 'early-stage', label: 'Early Stage' },
  { value: 'growth', label: 'Growth Stage' },
  { value: 'scaling', label: 'Scaling' },
  { value: 'established', label: 'Established' },
];

export const industryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS' },
  { value: 'ai-ml', label: 'AI/ML' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'biotech', label: 'Biotech' },
  { value: 'clean-tech', label: 'Clean Tech' },
  { value: 'other', label: 'Other' },
];

export const lookingForOptions = [
  { value: 'co-founder', label: 'Co-founder' },
  { value: 'funding', label: 'Funding' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'networking', label: 'Networking' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'talent', label: 'Talent/Hiring' },
  { value: 'advice', label: 'Business Advice' },
  { value: 'other', label: 'Other' },
];

export const howHeardOptions = [
  { value: 'social-media', label: 'Social Media' },
  { value: 'google', label: 'Google Search' },
  { value: 'referral', label: 'Friend/Colleague Referral' },
  { value: 'event', label: 'Event/Conference' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'blog', label: 'Blog/Article' },
  { value: 'other', label: 'Other' },
];
