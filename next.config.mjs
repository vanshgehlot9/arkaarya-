/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Compress responses to reduce transfer size
  compress: true,
  // Enable image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },
};

export default nextConfig;
