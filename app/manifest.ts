import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LWMA Streaming Royalty Calculator ',
    short_name: 'LWMA Streaming Royality Calculator',
    description:
      'Streaming royality calculator estimating US artist payout through the Living Wage for Musicians Act',
    start_url: '/',
    display: 'standalone',
    background_color: '#1C1F76',
    theme_color: '#1C1F76',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      }
    ],
  }
}
