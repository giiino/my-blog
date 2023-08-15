/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-syntax-highlighter'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
