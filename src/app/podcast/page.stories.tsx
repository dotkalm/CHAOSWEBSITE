import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PodcastPage from './page';
import theme from '@/theme';

type PodcastPageStoryArgs = {
  body1Mobile: string;
  body2Mobile: string;
  captionMobile: string;
  body1Desktop: string;
  body2Desktop: string;
  captionDesktop: string;
};

const meta = {
  title: 'Pages/Podcast',
  component: PodcastPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    // Mobile (xs) font sizes
    body1Mobile: { control: 'text', description: 'Body1 font size for mobile (xs)' },
    body2Mobile: { control: 'text', description: 'Body2 font size for mobile (xs)' },
    captionMobile: { control: 'text', description: 'Caption font size for mobile (xs)' },
    // Desktop (md) font sizes
    body1Desktop: { control: 'text', description: 'Body1 font size for desktop (md+)' },
    body2Desktop: { control: 'text', description: 'Body2 font size for desktop (md+)' },
    captionDesktop: { control: 'text', description: 'Caption font size for desktop (md+)' },
  },
  decorators: [
    (Story, context) => {
      const customTheme = createTheme({
        ...theme,
        typography: {
          ...theme.typography,
          body1: {
            fontSize: context.args.body1Mobile || '1rem',
            '@media (min-width: 801px)': {
              fontSize: context.args.body1Desktop || '1.28vw',
            },
          },
          body2: {
            fontSize: context.args.body2Mobile || '0.769rem',
            '@media (min-width: 801px)': {
              fontSize: context.args.body2Desktop || '0.984vw',
            },
          },
          caption: {
            fontSize: context.args.captionMobile || '0.616rem',
            '@media (min-width: 801px)': {
              fontSize: context.args.captionDesktop || '0.788vw',
            },
          },
        },
      });

      return (
        <ThemeProvider theme={customTheme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
} satisfies Meta<PodcastPageStoryArgs>;

export default meta;
type Story = StoryObj<PodcastPageStoryArgs>;

export const Default: Story = {
  args: {
    body1Mobile: '1rem',
    body1Desktop: '1.28vw',
    body2Mobile: '0.769rem',
    body2Desktop: '0.984vw',
    captionMobile: '0.616rem',
    captionDesktop: '0.788vw',
  },
};
