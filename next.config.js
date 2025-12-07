/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  experimental: {
    // büyük bundle'ları bölmek için
    modularizeImports: {
      lodash: {
        transform: "lodash/{{member}}",
      },
    },
  },
};

module.exports = nextConfig;

