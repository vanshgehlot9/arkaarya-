"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Authentic WhatsApp SVG Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="24" height="24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export const WhatsAppWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [contextMessage, setContextMessage] = useState(
    "Hello ArkaArya, I would like to know more about your services."
  );

  // Allow other components to dispatch a custom event to change context
  useEffect(() => {
    const handleContextChange = (e: any) => {
      if (e.detail?.message) {
        setContextMessage(e.detail.message);
      }
    };
    window.addEventListener("updateWhatsAppContext", handleContextChange);
    return () => window.removeEventListener("updateWhatsAppContext", handleContextChange);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Track Lead/Conversion Event internally
    console.log("[Analytics Event]: WhatsApp Conversion Clicked", {
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      ctaSource: "floating_widget",
      message: contextMessage
    });

    // Deep link redirect
    const phoneNumber = "919908990874";
    const encodedMessage = encodeURIComponent(contextMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-end pointer-events-none">
      
      {/* Container for the pulsing ring and button */}
      <div className="relative flex items-center justify-end pointer-events-auto">
        
        {/* Subtle pulsing ring behind the button */}
        <div className="absolute right-0 top-0 bottom-0 w-[54px] h-[54px] sm:w-[58px] sm:h-[58px] bg-[#629A13] rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }} />

        {/* Expanding Button Container */}
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={false}
          animate={{
            width: isHovered ? "auto" : "56px",
            // slightly larger base size on desktop (58px), mobile (54px). We handle width automatically.
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[54px] sm:h-[58px] min-w-[54px] sm:min-w-[58px] bg-[#629A13] hover:bg-[#528210] rounded-full shadow-[0_8px_25px_rgba(98,154,19,0.35)] border-2 border-white flex items-center overflow-hidden transition-colors"
        >
          {/* Text Content (only visible on hover) */}
          <div className="flex flex-col items-start justify-center pl-5 pr-14 whitespace-nowrap opacity-0 group-hover:opacity-100" style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s 0.1s' }}>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">
              Chat with ArkaArya
            </span>
            <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
              WhatsApp us
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={14} />
              </motion.div>
            </div>
          </div>

          {/* Absolute Icon Container (Always visible, pinned to right) */}
          <div className="absolute right-0 top-0 bottom-0 w-[50px] sm:w-[54px] flex items-center justify-center text-white">
            <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

        </motion.button>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
