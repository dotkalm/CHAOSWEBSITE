import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AboutPage from './page';
import theme from '@/theme';

const meta = {
  title: 'Pages/About',
  component: AboutPage,
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
            fontSize: context.args.body1Mobile || '1.21875rem',
            lineHeight: '1.5rem',
            [theme.breakpoints.up('md')]: {
              fontSize: context.args.body1Desktop || '1.21875rem',
            },
          },
          body2: {
            fontSize: context.args.body2Mobile || '0.9375rem',
            lineHeight: '1.125rem',
            [theme.breakpoints.up('md')]: {
              fontSize: context.args.body2Desktop || '0.9375rem',
            },
          },
          caption: {
            fontSize: context.args.captionMobile || '0.75rem',
            lineHeight: '0.9375rem',
            [theme.breakpoints.up('md')]: {
              fontSize: context.args.captionDesktop || '0.75rem',
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
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    body1Mobile: '1.21875rem',
    body1Desktop: '1.21875rem',
    body2Mobile: '0.9375rem',
    body2Desktop: '0.9375rem',
    captionMobile: '0.75rem',
    captionDesktop: '0.75rem',
  },
};
