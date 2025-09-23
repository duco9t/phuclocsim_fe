/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      // Thêm các domain khác nếu cần
      {
        protocol: 'https',
        hostname: 'example.com',
      }
    ],
    // Hoặc dùng domains (deprecated nhưng vẫn hoạt động)
    // domains: ['avatar.vercel.sh', 'localhost']
  },
}

module.exports = nextConfig