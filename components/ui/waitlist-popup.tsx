"use client";
import { useState } from "react";
import { WaitlistModal } from "./waitlist-modal";
import { WaitlistForm } from "./waitlist-form";
import { WaitlistSuccess } from "./waitlist-success";

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
      <button
        onClick={handleOpen}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
      >
        Join Waitlist
      </button>

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
