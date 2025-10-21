/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    allowedDevOrigins: ['http://localhost:3002', 'http://192.168.1.6:3002'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ignored: [
          '**/node_modules/**',
          '**/C:/pagefile.sys',
          '**/C:/swapfile.sys',
          '**/C:/hiberfil.sys',
          '**/C:/DumpStack.log.tmp',
        ],
      };
    }
    return config;
  },
};

module.exports = nextConfig;
