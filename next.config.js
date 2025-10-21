const nextConfig = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/C:/pagefile.sys',
        '**/C:/swapfile.sys',
        '**/C:/hiberfil.sys',
        '**/C:/DumpStack.log.tmp'
      ]
    };
    return config;
  },
};

export default nextConfig;
