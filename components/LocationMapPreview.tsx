"use client";

import { useEffect, useRef } from "react";

interface LocationMapPreviewProps {
  /** Raw coordinates string like "26.315614, 73.059168 (±35m)" */
  coordinates: string;
}

/**
 * Parse a coordinate string produced by the pickup form's getLocation handler.
 */
function parseCoords(raw: string): [number, number] | null {
  const match = raw.match(/([-\d.]+)\s*,\s*([-\d.]+)/);
  if (!match) return null;
  const lat = parseFloat(match[1]);
  const lng = parseFloat(match[2]);
  if (isNaN(lat) || isNaN(lng)) return null;
  return [lat, lng];
}

export default function LocationMapPreview({ coordinates }: LocationMapPreviewProps) {
  const coords = parseCoords(coordinates);
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!coords || !containerRef.current) return;

    // Dynamically import Leaflet only on the client side to avoid SSR errors
    import("leaflet").then((L) => {
      // Create a custom premium SVG icon instead of the default Leaflet one
      const customIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="
            width: 32px; 
            height: 32px; 
            background: #629A13; 
            border: 3px solid white; 
            border-radius: 50% 50% 50% 0; 
            transform: rotate(-45deg); 
            box-shadow: 2px 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="width: 10px; height: 10px; background: white; border-radius: 50%; transform: rotate(45deg);"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      if (!mapRef.current) {
        // Initialize map
        mapRef.current = L.map(containerRef.current!, {
          zoomControl: false, // We'll add it in a better position
          attributionControl: true,
          scrollWheelZoom: false, // Prevent accidental scroll hijack inside a form
        }).setView(coords, 15);

        // Add standard zoom control at the bottom right
        L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

        // Use a cleaner, more modern tile layer (CartoDB Positron) if desired, 
        // but standard OSM is fine. Standard OSM:
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapRef.current);

        markerRef.current = L.marker(coords, { icon: customIcon })
          .addTo(mapRef.current)
          .bindPopup(`
            <div style="font-family: inherit; padding: 4px;">
              <strong style="color: #00264A; display: block; margin-bottom: 2px;">Pickup Location</strong>
              <span style="color: #5E6672; font-size: 11px;">Selected via GPS</span>
            </div>
          `)
          .openPopup();
      } else {
        // Map already exists — just update view and marker position
        mapRef.current.setView(coords, 15, { animate: true, duration: 1 });
        if (markerRef.current) {
          markerRef.current.setLatLng(coords);
        } else {
          markerRef.current = L.marker(coords, { icon: customIcon })
            .addTo(mapRef.current)
            .bindPopup("📍 Pickup location")
            .openPopup();
        }
      }
    });

    return () => {
      // Do NOT destroy the map on every render to allow smooth updates
    };
  }, [coordinates]); 

  // Full cleanup only on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Inject Leaflet CSS
  useEffect(() => {
    if (typeof document !== "undefined") {
      const id = "leaflet-css";
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
    }
  }, []);

  if (!coords) return null;

  return (
    <div
      style={{
        height: "260px",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #E3E8E4",
        boxShadow: "0 8px 24px rgba(0,38,74,0.05)",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}

