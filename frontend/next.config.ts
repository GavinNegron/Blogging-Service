const nextConfig = {
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