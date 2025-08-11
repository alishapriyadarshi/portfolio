import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
