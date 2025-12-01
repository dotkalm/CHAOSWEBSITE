import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import Navigation from './index'
import { Routes, NavigationLabels } from '@/constants'

// Mock next/navigation
let mockPathname = '/'
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => mockPathname),
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(max-width: 768px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })


  describe('Route rendering', () => {
    it('should render all navigation routes', () => {
      mockPathname = '/'
      
      renderWithTheme(<Navigation />)
      
      expect(screen.getByText(NavigationLabels[Routes.MISSION])).toBeInTheDocument()
      expect(screen.getByText(NavigationLabels[Routes.ABOUT])).toBeInTheDocument()
      expect(screen.getByText(NavigationLabels[Routes.PODCAST])).toBeInTheDocument()
      expect(screen.getByText(NavigationLabels[Routes.CONTACT])).toBeInTheDocument()
    })
  })
})
