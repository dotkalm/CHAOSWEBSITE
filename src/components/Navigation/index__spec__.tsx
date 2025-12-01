import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import Navigation from './index'
import { Routes, NavigationLabels } from '@/constants'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Navigation Component', () => {
  describe('Route color mapping', () => {
    it('should render Mission with green color when active', () => {
      (usePathname as jest.Mock).mockReturnValue(Routes.MISSION)
      
      renderWithTheme(<Navigation />)
      
      const missionLink = screen.getByText(NavigationLabels[Routes.MISSION])
      expect(missionLink).toHaveStyle({ color: theme.palette.shapes.green })
    })

    it('should render About Us with purple color when active', () => {
      (usePathname as jest.Mock).mockReturnValue(Routes.ABOUT)
      
      renderWithTheme(<Navigation />)
      
      const aboutLink = screen.getByText(NavigationLabels[Routes.ABOUT])
      expect(aboutLink).toHaveStyle({ color: theme.palette.shapes.purple })
    })

    it('should render Podcast with red color when active', () => {
      (usePathname as jest.Mock).mockReturnValue(Routes.PODCAST)
      
      renderWithTheme(<Navigation />)
      
      const podcastLink = screen.getByText(NavigationLabels[Routes.PODCAST])
      expect(podcastLink).toHaveStyle({ color: theme.palette.shapes.red })
    })

    it('should render Contact Us with orange color when active', () => {
      (usePathname as jest.Mock).mockReturnValue(Routes.CONTACT)
      
      renderWithTheme(<Navigation />)
      
      const contactLink = screen.getByText(NavigationLabels[Routes.CONTACT])
      expect(contactLink).toHaveStyle({ color: theme.palette.shapes.orange })
    })

    it('should render all inactive routes with default color', () => {
      (usePathname as jest.Mock).mockReturnValue(Routes.MISSION)
      
      renderWithTheme(<Navigation />)
      
      const aboutLink = screen.getByText(NavigationLabels[Routes.ABOUT])
      const podcastLink = screen.getByText(NavigationLabels[Routes.PODCAST])
      const contactLink = screen.getByText(NavigationLabels[Routes.CONTACT])
      
      // Inactive links should not have colored styling
      expect(aboutLink).not.toHaveStyle({ color: theme.palette.shapes.purple })
      expect(podcastLink).not.toHaveStyle({ color: theme.palette.shapes.red })
      expect(contactLink).not.toHaveStyle({ color: theme.palette.shapes.orange })
    })
  })

  describe('Route rendering', () => {
    it('should render all navigation routes', () => {
      (usePathname as jest.Mock).mockReturnValue('/')
      
      renderWithTheme(<Navigation />)
      
      expect(screen.getByText(NavigationLabels[Routes.MISSION])).toBeInTheDocument()
      expect(screen.getByText(NavigationLabels[Routes.ABOUT])).toBeInTheDocument()
      expect(screen.getByText(NavigationLabels[Routes.PODCAST])).toBeInTheDocument()
      expect(screen.getByText(NavigationLabels[Routes.CONTACT])).toBeInTheDocument()
    })
  })
})
