import './styles/globals.css';
import MuiProvider from '../providers/MuiProvider';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Chaos Agency',
  description: 'Chaos Agency — website'
};

const ld = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Chaos Agency',
  description: 'Favicons: /favicons/favicon.svg',
  image: '/favicons/favicon.svg'
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
