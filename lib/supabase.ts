import { createClient } from '@supabase/supabase-js';
import { WaitlistFormData } from './validations';

// Supabase configuration with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ubaudenvfrspjqfbllyn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYXVkZW52ZnJzcGpxZmJsbHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjY3MzAsImV4cCI6MjA3MzE0MjczMH0.tdR1VX8mNEIMwtFgL1-mt1ubRlKNOq9RdvDrkvoAltw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database operations
export const waitlistService = {
  // Submit waitlist form
  async submitWaitlistForm(data: WaitlistFormData) {
    try {
      // First, try to insert the data
      const { data: result, error } = await supabase
        .from('waitlist_users')
        .insert([
          {
            full_name: data.fullName,
            email: data.email,
            role: data.role,
            startup_stage: data.startupStage,
            company_name: data.companyName || null,
            industry: data.industry || null,
            location: data.location || null,
            phone: data.phone || null,
            linkedin_profile: data.linkedinProfile || null,
            description: data.description || null,
            how_heard: data.howHeard || null,
            looking_for: data.lookingFor || null,
            message_for_us: data.messageForUs || null,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        
        // If it's an RLS policy error, provide a more user-friendly message
        if (error.message.includes('row-level security policy')) {
          throw new Error('Unable to submit form due to security restrictions. Please try again or contact support.');
        }
        
        throw new Error(error.message);
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Waitlist submission error:', error);
      throw error;
    }
  },

  // Check if email already exists
  async checkEmailExists(email: string) {
    try {
      const { data, error } = await supabase
        .from('waitlist_users')
        .select('email')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw new Error(error.message);
      }

      return { exists: !!data };
    } catch (error) {
      console.error('Email check error:', error);
      throw error;
    }
  },

  // Get waitlist stats (for admin use)
  async getWaitlistStats() {
    try {
      const { data, error } = await supabase
        .from('waitlist_users')
        .select('*');

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Stats error:', error);
      throw error;
    }
  }
};
