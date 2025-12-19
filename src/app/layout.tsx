import '@/styles/globals.css';
import MuiProvider from '@/providers/MuiProvider';
import Background from '@/components/Background';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SHAPE_COLOR_VALUES, themeColors } from '@/constants'
import { getSeededIndex } from '@/utils';

export const metadata = {
  title: 'CHAOS',
  description: 'CHAOS'
};

// JSON-LD describing the site and favicons — description field includes
// the favicons list (this is what you requested to help define favicons).
const ld = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CHAOS',
  description: 'Favicons and site images: /favicons/*',
  image: '/favicons/favicon.svg',
  potentialAction: [
    { '@type': 'ViewAction', 'target': '/' }
  ],
  publisher: {
    '@type': 'Organization',
    'name': 'CHAOS',
    'logo': { '@type': 'ImageObject', 'url': '/favicons/favicon.svg' }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicons/favicon-512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180.png" />
        <link rel="mask-icon" href="/favicon/Chaos_Favicon_HP.svg" color="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Generate color before React hydrates to prevent flash
            (() => {
              console.log(Date.now());
              const index = Math.floor(Date.now() / 100) % ${SHAPE_COLOR_VALUES.length};
              console.log(index);
              const color = '${themeColors[SHAPE_COLOR_VALUES[getSeededIndex(Date.now(), SHAPE_COLOR_VALUES.length)]]}';
              console.log(color);
              return color;
            })();
            window.__CHAOS_SEED__ = '${themeColors[SHAPE_COLOR_VALUES[getSeededIndex(Date.now(), SHAPE_COLOR_VALUES.length)]]}';
          `
        }} />
      </head>
      <body>
        <MuiProvider>
          <div className="layout-grid">
            <Header />
            <Navigation />
            <main>{children}</main>
            <Footer />
            <Background />
          </div>
        </MuiProvider>
      </body>
    </html>
  );
}
