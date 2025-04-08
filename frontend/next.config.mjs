/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "repair.mmallonthemove.co.za",
            },
            {
                protocol: "https",
                hostname: "s3.amazonaws.com",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
