/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './lib/supabase-image-loader.ts',
  }
}
