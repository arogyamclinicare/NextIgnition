"use client"

import React from 'react';
import { WaitlistPopup } from './waitlist-popup';

const CTAButton = () => {
  return (
    <div className="cta-button-wrapper">
      <WaitlistPopup />
    </div>
  );
}

export default CTAButton;
