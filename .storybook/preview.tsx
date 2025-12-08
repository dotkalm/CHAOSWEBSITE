import type { Preview } from '@storybook/nextjs-vite';
import MuiProvider from '../src/providers/MuiProvider';
import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <MuiProvider>
        <Story />
      </MuiProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (iPhone SE)',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        mobileSmall: {
          name: 'Mobile Small',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
        mobileLarge: {
          name: 'Mobile Large (iPhone 12 Pro)',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
        tablet: {
          name: 'Tablet (iPad)',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
        desktopLarge: {
          name: 'Desktop Large',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },
  },
};

export default preview;
