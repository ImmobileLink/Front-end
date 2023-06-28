/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/supabase-image-loader.ts',
  }
}

module.exports = nextConfig
