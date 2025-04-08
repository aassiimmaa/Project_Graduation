/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icdn.24h.com.vn',
        pathname: '/upload/**'
      },
      {
        protocol: 'https',
        hostname: 'static-images.vnncdn.net',
        pathname: '/vps_images_publish/000001/000003/2024/10/11/**'
      },
      {
        protocol: 'https',
        hostname: 'www.mitsubishi-motors.com.vn',
        pathname: '/w/wp-content/uploads/2023/07/**'
      },
      {
        protocol: 'https',
        hostname: 'www.winauto.vn',
        pathname: '/wp-content/uploads/2024/09/**'
      }
    ]
  },
  experimental: {
    scrollRestoration: false
  }
}

export default nextConfig
