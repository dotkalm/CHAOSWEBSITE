
  Font Size Scaling System

  This app uses a viewport-based fluid typography system with 2 distinct behaviors:

  1. Mobile/Small Screens (≤800px)

  html {
    font-size: 16px;
  }
  - Fixed 16px base font size
  - No scaling with viewport changes

  2. Desktop/Large Screens (≥801px)

  html {
    font-size: 1.28vw;
  }
  - Fluid scaling based on viewport width
  - Uses vw (viewport width) units
  - The 1.28vw means font size = 1.28% of viewport width

  How the Scaling Works

  The "magic" is in 1.28vw:

  - At 1000px viewport: 1.28vw = 12.8px
  - At 1200px viewport: 1.28vw = 15.36px
  - At 1500px viewport: 1.28vw = 19.2px
  - At 1920px viewport: 1.28vw = 24.576px

  All other sizes use em-based units that inherit from this base:
  body {
    font-size: 1rem; /* Inherits from html */
    line-height: var(--leading); /* 1.2em */
  }

  The "Bouncy Physics Effect"

  The smooth, fluid feeling when resizing the browser comes from:

  1. Viewport units (vw) - Browsers natively interpolate these smoothly during resize
  2. No breakpoint jumps - Unlike traditional responsive design with discrete breakpoints, this scales continuously
  3. Browser sub-pixel rendering - Modern browsers animate/interpolate font-size changes smoothly

  For MUI/Next.js Implementation

  To recreate this in MUI with Next.js:

  // In your theme configuration
  const theme = createTheme({
    typography: {
      htmlFontSize: 16, // Default
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            fontSize: '16px',
            '@media (min-width: 801px)': {
              fontSize: '1.28vw',
            },
          },
        },
      },
    },
  });

  Or with CSS-in-JS / global styles:

  html {
    font-size: 16px;
  }

  @media (min-width: 801px) {
    html {
      font-size: 1.28vw;
    }
  }

  Then use rem units throughout your MUI components for consistent scaling.

  The key files are:
  - src/scss/base/_global.scss:30-36 (scaling logic)
  - src/scss/utils/_breakpoints.scss:14 (breakpoint definition)
