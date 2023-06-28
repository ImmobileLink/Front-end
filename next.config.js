/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/supabase-image-loader.ts',
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
