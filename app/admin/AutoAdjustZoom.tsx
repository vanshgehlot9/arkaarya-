"use client";

import { useEffect } from "react";

export default function AutoAdjustZoom() {
  useEffect(() => {
    const handleResize = () => {
      // The admin dashboard is designed for at least 1280px width
      // If the user zooms in, their window.innerWidth effectively decreases
      const minRequiredWidth = 1280;
      
      if (window.innerWidth < minRequiredWidth) {
        // Calculate the zoom out factor needed to fit the content
        const zoomLevel = window.innerWidth / minRequiredWidth;
        (document.body.style as any).zoom = zoomLevel;
      } else {
        (document.body.style as any).zoom = "1";
      }
    };

    // Attach listener
    window.addEventListener("resize", handleResize);
    
    // Initial calculation
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      (document.body.style as any).zoom = "1";
    };
  }, []);

  return null;
}
