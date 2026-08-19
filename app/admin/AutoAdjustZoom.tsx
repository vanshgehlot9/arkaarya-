"use client";

import { useEffect } from "react";

/**
 * AutoAdjustZoom
 *
 * Problem: The admin dashboard is designed for ~1280px+ viewport widths.
 * On high-resolution / high-DPI screens (common on modern laptops, 4K
 * monitors, or Windows machines with 125%/150% display scaling) the
 * browser reports a smaller CSS-pixel viewport even though the physical
 * screen is large. The original implementation only used
 * `document.body.style.zoom` which:
 *   - Does nothing in Firefox (unsupported property).
 *   - Does not account for devicePixelRatio.
 *   - Can fight with the browser's own pinch-zoom.
 *
 * Solution:
 *   1. Detect the *available* CSS-pixel width (layout viewport).
 *   2. Apply `transform: scale()` + `transform-origin: top left` on
 *      `document.body` as a universal, cross-browser scaling mechanism.
 *   3. Compensate the body width/height so the page doesn't collapse
 *      after scaling (scale-down shrinks the rendered element).
 *   4. Also set `zoom` for Chromium (improves sub-pixel rendering there).
 *   5. Throttle resize with requestAnimationFrame to avoid jank.
 *   6. Re-run on every `resize` and on initial mount.
 */
export default function AutoAdjustZoom() {
  useEffect(() => {
    // The minimum CSS-pixel width the layout was designed for.
    const MIN_WIDTH = 1280;

    const applyZoom = () => {
      // Use the smaller of innerWidth and clientWidth to get the true
      // available layout width, accounting for scrollbars and browser quirks.
      const availableWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth || window.innerWidth
      );

      if (availableWidth >= MIN_WIDTH) {
        // Full-size: reset everything.
        document.body.style.removeProperty("transform");
        document.body.style.removeProperty("transform-origin");
        document.body.style.removeProperty("width");
        document.body.style.removeProperty("min-height");
        (document.body.style as any).zoom = "1";
        document.documentElement.style.removeProperty("overflow-x");
        return;
      }

      const scale = availableWidth / MIN_WIDTH;

      // --- Strategy 1: CSS zoom (Chromium / Edge / Safari 17+) ---
      // Keeps layout flow intact; no height compensation needed in these browsers.
      (document.body.style as any).zoom = String(scale);

      // --- Strategy 2: CSS transform:scale (Firefox + universal fallback) ---
      // Scale from the top-left corner so position stays predictable.
      document.body.style.transformOrigin = "0 0";
      document.body.style.transform = `scale(${scale})`;

      // After scaling down, the body's rendered size shrinks but its layout
      // box remains at the original size. We set an explicit unscaled width
      // equal to MIN_WIDTH so the body always fills exactly the design width.
      document.body.style.width = `${MIN_WIDTH}px`;

      // Compensate height: scale(n) shrinks the rendered height leaving a gap.
      // Set min-height to the unscaled equivalent that fills the viewport.
      const scaledHeight = Math.ceil(window.innerHeight / scale);
      document.body.style.minHeight = `${scaledHeight}px`;

      // Prevent a horizontal scrollbar caused by the now-wider body.
      document.documentElement.style.overflowX = "hidden";
    };

    // Throttle resize handler with requestAnimationFrame to avoid excessive
    // recalculations during smooth resize or pinch-zoom gestures.
    let raf: number | null = null;
    const handleResize = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        applyZoom();
        raf = null;
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    // Also catch orientation changes on tablets/phones.
    window.addEventListener("orientationchange", handleResize, { passive: true });

    // Initial run immediately on mount.
    applyZoom();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (raf !== null) cancelAnimationFrame(raf);

      // Clean up all styles we applied.
      document.body.style.removeProperty("transform");
      document.body.style.removeProperty("transform-origin");
      document.body.style.removeProperty("width");
      document.body.style.removeProperty("min-height");
      (document.body.style as any).zoom = "1";
      document.documentElement.style.removeProperty("overflow-x");
    };
  }, []);

  return null;
}
