const nextConfig = {
  devIndicators: false,

  images: {
    domains: ['lh3.googleusercontent.com'],
  },

  async redirects() {
    const redirects = [];
    redirects.push({
      source: '/api/:path*',
      destination: 'http://localhost:5000/api/:path*',
      permanent: true,
    });
  
    return redirects;
  }
};

export default nextConfig;