import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const baseUrl = (
      process.env.BASE_TRACE_API_URL ||
      process.env.NEXT_PUBLIC_BASE_TRACE_API_URL ||
      'http://127.0.0.1:8000'
    ).replace(/\/+$/, '');

    return [
      {
        source: '/booknpay/api/:path*',
        destination: `${baseUrl}/booknpay/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
