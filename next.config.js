/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/supabase-image-loader.ts',
  },
  i18n: {
    locales: ['pt-BR', 'en'],
    defaultLocale: 'pt-BR',
    localeDetection: false
  },
}

module.exports = nextConfig
