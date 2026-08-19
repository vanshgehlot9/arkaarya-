import { useEffect, RefObject } from 'react';

export function useAutoScroll(
  scrollRef: RefObject<HTMLDivElement | null>, 
  intervalMs: number = 3000,
  dependencies: any[] = []
) {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollInterval: NodeJS.Timeout;
    let isInteracting = false;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        // Only auto-scroll on screens smaller than 1024px (where the mobile layouts generally apply)
        if (isInteracting || window.innerWidth >= 1024) return;
        
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        
        // Check if we are near the end
        if (el.scrollLeft >= maxScrollLeft - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll forward. Because of CSS snap-x, we just need to push it slightly over half the element width
          // to trigger the native snap to the next element.
          el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' });
        }
      }, intervalMs);
    };

    startScroll();

    const onInteractStart = () => { isInteracting = true; };
    const onInteractEnd = () => { 
      // Add a slight delay before resuming scroll after interaction
      setTimeout(() => {
        isInteracting = false; 
      }, 1000);
    };

    el.addEventListener('touchstart', onInteractStart, { passive: true });
    el.addEventListener('touchend', onInteractEnd, { passive: true });
    el.addEventListener('mouseenter', onInteractStart);
    el.addEventListener('mouseleave', onInteractEnd);

    return () => {
      clearInterval(scrollInterval);
      el.removeEventListener('touchstart', onInteractStart);
      el.removeEventListener('touchend', onInteractEnd);
      el.removeEventListener('mouseenter', onInteractStart);
      el.removeEventListener('mouseleave', onInteractEnd);
    };
  }, [scrollRef, intervalMs, ...dependencies]);
}
