/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'icdn.24h.com.vn',
          pathname: '/upload/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  