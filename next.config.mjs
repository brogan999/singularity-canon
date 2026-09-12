/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // The Canon is the built product; the nine prediction mockups live on at
  // /mockups and their own routes. Temporary (307) so this is easy to undo.
  async redirects() {
    return [{ source: "/", destination: "/canon", permanent: false }]
  },
}

export default nextConfig
