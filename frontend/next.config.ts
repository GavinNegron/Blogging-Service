const nextConfig = {
  devIndicators: {
    enabled: false,
    allowedDevOrigins: ['myblog.local', 'localhost', '.local'],
  },

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