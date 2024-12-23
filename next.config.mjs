const isStaticExport = 'true';

const nextConfig = {
  trailingSlash: true,
  env: {
    BUILD_STATIC_EXPORT: isStaticExport,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config, { webpack }) { // Ensure webpack is correctly referenced
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Add IgnorePlugin to exclude specific files or directories
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /public\/assets\/images/,
        resourceRegExp: /public\/assets\/background/,
        resourceRegExp: /public\/assets\/illustrations/,                
      })
    );

    return config;
  },
  ...(isStaticExport === 'true' && {
    output: 'export',
  }),
};

export default nextConfig;