/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: { // <-- output: 'export' satırı artık yok
    locales: ['tr', 'en', 'de', 'fr', 'ar', 'ru', 'es', 'zh'],
    defaultLocale: 'tr',
    localeDetection: false,
  },
};

module.exports = nextConfig;
