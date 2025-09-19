"use client";
import { useState } from "react";
import { WaitlistModal } from "./waitlist-modal";
import { WaitlistForm } from "./waitlist-form";
import { WaitlistSuccess } from "./waitlist-success";
import { AnimatedBubbleButton } from "./animated-bubble-button";

export function WaitlistPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setShowSuccess(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowSuccess(false);
  };

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  return (
    <>
      {/* Trigger Button */}
      <AnimatedBubbleButton onClick={handleOpen}>
        Join Waitlist
      </AnimatedBubbleButton>

      {/* Modal */}
      <WaitlistModal
        isOpen={isOpen}
        onClose={handleClose}
        title={showSuccess ? undefined : "Join the NextIgnition Waitlist"}
      >
        {showSuccess ? (
          <WaitlistSuccess onClose={handleClose} />
        ) : (
          <WaitlistForm onSuccess={handleSuccess} />
        )}
      </WaitlistModal>
    </>
  );
}
