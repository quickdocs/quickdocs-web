module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/bye',
        destination: '/',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/badge/:project*',
        destination: 'https://api.quickdocs.org/badge/:project*',
        permanent: false,
      },
    ]
  },
}
