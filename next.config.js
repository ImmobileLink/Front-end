/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}


module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/supabase-image-loader.js',
  }
}
