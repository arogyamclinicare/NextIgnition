"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { 
  waitlistFormSchema, 
  type WaitlistFormData,
  roleOptions,
  startupStageOptions,
  industryOptions,
  lookingForOptions,
  howHeardOptions
} from "@/lib/validations";
import { waitlistService } from "@/lib/supabase";
import { TimelineContent } from "./timeline-animation";

interface WaitlistFormProps {
  onSuccess: () => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
  });

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 20,
      opacity: 0,
    },
  };

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await waitlistService.submitWaitlistForm(data);
      reset();
      onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef} className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Required Fields Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-black mb-4">Required Information</h3>
          
          {/* Full Name */}
          <TimelineContent
            as="div"
            animationNum={0}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Full Name *
            </label>
            <input
              {...register("fullName")}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.fullName.message}
              </p>
            )}
          </TimelineContent>

          {/* Email */}
          <TimelineContent
            as="div"
            animationNum={1}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Email Address *
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </TimelineContent>

          {/* Role */}
          <TimelineContent
            as="div"
            animationNum={2}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Your Role *
            </label>
            <select
              {...register("role")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select your role</option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.role.message}
              </p>
            )}
          </TimelineContent>

          {/* Startup Stage */}
          <TimelineContent
            as="div"
            animationNum={3}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Startup Stage *
            </label>
            <select
              {...register("startupStage")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select your startup stage</option>
              {startupStageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.startupStage && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.startupStage.message}
              </p>
            )}
          </TimelineContent>
        </div>

        {/* Optional Fields Section */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Additional Information (Optional)</h3>
          
          {/* Company Name */}
          <TimelineContent
            as="div"
            animationNum={4}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Company/Startup Name
            </label>
            <input
              {...register("companyName")}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your company name"
            />
          </TimelineContent>

          {/* Industry */}
          <TimelineContent
            as="div"
            animationNum={5}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Industry/Sector
            </label>
            <select
              {...register("industry")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select your industry</option>
              {industryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </TimelineContent>

          {/* Location */}
          <TimelineContent
            as="div"
            animationNum={6}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Location/Country
            </label>
            <input
              {...register("location")}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your location"
            />
          </TimelineContent>

          {/* Phone */}
          <TimelineContent
            as="div"
            animationNum={7}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Phone Number
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your phone number"
            />
          </TimelineContent>

          {/* LinkedIn */}
          <TimelineContent
            as="div"
            animationNum={8}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              LinkedIn Profile
            </label>
            <input
              {...register("linkedinProfile")}
              type="url"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </TimelineContent>

          {/* Description */}
          <TimelineContent
            as="div"
            animationNum={9}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Brief Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              placeholder="Tell us about your startup or interests"
            />
          </TimelineContent>

          {/* How Heard */}
          <TimelineContent
            as="div"
            animationNum={10}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              How did you hear about NextIgnition?
            </label>
            <select
              {...register("howHeard")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select an option</option>
              {howHeardOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </TimelineContent>

          {/* Looking For */}
          <TimelineContent
            as="div"
            animationNum={11}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              What are you looking for?
            </label>
            <select
              {...register("lookingFor")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select what you're looking for</option>
              {lookingForOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </TimelineContent>

          {/* Message For Us */}
          <TimelineContent
            as="div"
            animationNum={12}
            timelineRef={formRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-black">
              Any message for us?
            </label>
            <textarea
              {...register("messageForUs")}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              placeholder="Share any thoughts, questions, or suggestions"
            />
          </TimelineContent>
        </div>

        {/* Error Message */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {submitError}
            </p>
          </motion.div>
        )}

        {/* Submit Button */}
        <TimelineContent
          as="div"
          animationNum={13}
          timelineRef={formRef}
          customVariants={revealVariants}
          className="pt-4"
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Join Waitlist
              </>
            )}
          </motion.button>
        </TimelineContent>
      </form>
    </div>
  );
}
