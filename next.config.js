/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pages dağıtımı için statik HTML çıktısını zorlar
  output: 'export', 

  // Node.js uyumluluğunu aktif eder, bu, Web3 kodunuz için kritiktir.
  experimental: {
      runtime: 'nodejs'
  },
};

module.exports = nextConfig;
