/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/Login',
          has: [
            {
              type: 'cookie',
              key: 'userId',
            },
          ],
          permanent: false,
          destination: '/',
        },
        {
          source: '/Signup',
          has: [
            {
              type: 'cookie',
              key: 'userId',
            },
          ],
          permanent: false,
          destination: '/',
        },
      ];
    },
  };
  
  export default nextConfig;
  