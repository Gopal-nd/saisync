import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {  protocol: 'https',
        hostname: "6bnz6zzalk.ufs.sh"
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },{
        protocol: 'https',
        hostname: "utfs.io"
      }
      ]
  },
  eslint:{
    ignoreDuringBuilds:true
  }
};

export default nextConfig;
