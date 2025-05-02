const nextConfig = {  
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn', 'info'],
    },
},
  devIndicators: false,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;