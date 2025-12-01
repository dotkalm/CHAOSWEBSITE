import type { Meta, StoryObj } from '@storybook/react/dist/index.d.ts'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import Background from './index'
import { SHAPE_LAYOUT_CONFIG } from '@/constants'

// Wrapper to provide theme context
const BackgroundWithTheme = (props: any) => {
  // Override the layout config temporarily for this story
  if (props.normalScaleMin !== undefined) {
    (SHAPE_LAYOUT_CONFIG as any).NORMAL_SCALE_MIN = props.normalScaleMin
  }
  if (props.normalScaleMax !== undefined) {
    (SHAPE_LAYOUT_CONFIG as any).NORMAL_SCALE_MAX = props.normalScaleMax
  }
  if (props.bigScaleMin !== undefined) {
    (SHAPE_LAYOUT_CONFIG as any).BIG_SCALE_MIN = props.bigScaleMin
  }
  if (props.bigScaleMax !== undefined) {
    (SHAPE_LAYOUT_CONFIG as any).BIG_SCALE_MAX = props.bigScaleMax
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Background key={JSON.stringify(props)} />
      </div>
    </ThemeProvider>
  )
}

const meta = {
  title: 'Components/Background',
  component: BackgroundWithTheme,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Background component with configurable shape scales. Use sliders to adjust whitespace coverage.',
      },
    },
  },
  argTypes: {
    normalScaleMin: {
      control: { type: 'range', min: 0.2, max: 1.5, step: 0.05 },
      description: 'Minimum scale for normal-sized shapes (2 of 3 shapes)',
      table: {
        defaultValue: { summary: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MIN },
      },
    },
    normalScaleMax: {
      control: { type: 'range', min: 0.2, max: 1.5, step: 0.05 },
      description: 'Maximum scale for normal-sized shapes (2 of 3 shapes)',
      table: {
        defaultValue: { summary: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MAX },
      },
    },
    bigScaleMin: {
      control: { type: 'range', min: 0.2, max: 2.0, step: 0.05 },
      description: 'Minimum scale for the big shape (1 of 3 shapes)',
      table: {
        defaultValue: { summary: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MIN },
      },
    },
    bigScaleMax: {
      control: { type: 'range', min: 0.2, max: 2.0, step: 0.05 },
      description: 'Maximum scale for the big shape (1 of 3 shapes)',
      table: {
        defaultValue: { summary: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MAX },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BackgroundWithTheme>

export default meta
type Story = StoryObj<typeof meta>

// Current production values
export const Default: Story = {
  args: {
    normalScaleMin: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MIN,
    normalScaleMax: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MAX,
    bigScaleMin: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MIN,
    bigScaleMax: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MAX,
  },
}

// All shapes similarly sized (minimal big/normal difference)
export const UniformSizing: Story = {
  args: {
    normalScaleMin: 0.7,
    normalScaleMax: 0.9,
    bigScaleMin: 0.75,
    bigScaleMax: 0.95,
  },
}

// More dramatic size variation
export const HighContrast: Story = {
  args: {
    normalScaleMin: 0.4,
    normalScaleMax: 0.6,
    bigScaleMin: 1.2,
    bigScaleMax: 1.6,
  },
}

// Larger shapes overall (less whitespace)
export const LessWhitespace: Story = {
  args: {
    normalScaleMin: 0.8,
    normalScaleMax: 1.1,
    bigScaleMin: 1.0,
    bigScaleMax: 1.3,
  },
}

// Smaller shapes overall (more whitespace)
export const MoreWhitespace: Story = {
  args: {
    normalScaleMin: 0.3,
    normalScaleMax: 0.5,
    bigScaleMin: 0.6,
    bigScaleMax: 0.8,
  },
}

// Original app__temp__.js values
export const OriginalSite: Story = {
  args: {
    normalScaleMin: 0.35,
    normalScaleMax: 0.75,
    bigScaleMin: 1.0,
    bigScaleMax: 1.25,
  },
}

// Mobile viewport (375x667 - iPhone SE)
export const Mobile: Story = {
  args: {
    normalScaleMin: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MIN,
    normalScaleMax: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MAX,
    bigScaleMin: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MIN,
    bigScaleMax: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MAX,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    chromatic: {
      viewports: [375],
    },
  },
}

// Mobile Small (320x568 - iPhone 5)
export const MobileSmall: Story = {
  args: {
    normalScaleMin: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MIN,
    normalScaleMax: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MAX,
    bigScaleMin: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MIN,
    bigScaleMax: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MAX,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobileSmall',
    },
  },
}

// Mobile Large (390x844 - iPhone 12 Pro)
export const MobileLarge: Story = {
  args: {
    normalScaleMin: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MIN,
    normalScaleMax: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MAX,
    bigScaleMin: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MIN,
    bigScaleMax: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MAX,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobileLarge',
    },
  },
}

// Tablet viewport (768x1024 - iPad)
export const Tablet: Story = {
  args: {
    normalScaleMin: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MIN,
    normalScaleMax: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MAX,
    bigScaleMin: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MIN,
    bigScaleMax: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MAX,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

// Desktop Large viewport
export const DesktopLarge: Story = {
  args: {
    normalScaleMin: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MIN,
    normalScaleMax: SHAPE_LAYOUT_CONFIG.NORMAL_SCALE_MAX,
    bigScaleMin: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MIN,
    bigScaleMax: SHAPE_LAYOUT_CONFIG.BIG_SCALE_MAX,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktopLarge',
    },
  },
}
