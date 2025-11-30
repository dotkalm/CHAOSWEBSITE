import './styles/globals.css';
import MuiProvider from '../providers/MuiProvider';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Chaos Agency',
  description: 'Chaos Agency — website'
};

// JSON-LD describing the site and favicons — description field includes
// the favicons list (this is what you requested to help define favicons).
const ld = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Chaos Agency',
  description: 'Favicons and site images: /favicons/*',
  image: '/favicons/favicon.svg',
  potentialAction: [
    { '@type': 'ViewAction', 'target': '/' }
  ],
  publisher: {
    '@type': 'Organization',
    'name': 'Chaos Agency',
    'logo': { '@type': 'ImageObject', 'url': '/favicons/favicon.svg' }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicons/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body>
        <MuiProvider>
          <Header />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </MuiProvider>
      </body>
    </html>
  );
}
