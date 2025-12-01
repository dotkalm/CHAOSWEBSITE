'use client';
import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import Statements from './index'
import { StatementsData } from '@/constants'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Statements Component', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Initial statement display', () => {
    it('should display a statement quote on mount', () => {
      renderWithTheme(<Statements />)
      
      // Should find at least one quote from statements.json
      const hasAnyQuote = StatementsData.items.some(item => {
        return screen.queryByText(item.quote) !== null
      })
      
      expect(hasAnyQuote).toEqual(true)
    })

    it('should display statement attribution when present', () => {
      renderWithTheme(<Statements />)
      
      // Find the current statement's quote
      const currentStatement = StatementsData.items.find(item => {
        return screen.queryByText(item.quote) !== null
      })
      
      expect(currentStatement).toBeDefined()
      
      // If it has attribution, verify it's displayed (with em dash prefix)
      if (currentStatement?.attribution) {
        const attributionWithDash = `— ${currentStatement.attribution}`
        const attributionElement = screen.getByText(attributionWithDash)
        expect(attributionElement).toBeInTheDocument()
      }
    })

    it('should render statement in container', () => {
      const { container } = renderWithTheme(<Statements />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Statement rotation timing', () => {
    it('should change statement after visible duration', async () => {
      const { container } = renderWithTheme(<Statements />)
      
      // Get first statement
      const firstQuote = StatementsData.items.find(item => {
        return screen.queryByText(item.quote) !== null
      })
      
      expect(firstQuote).toBeDefined()
      if (!firstQuote) return
      
      // Wait for visible duration (cycleMs - gapMs = 11000ms)
      const visibleMs = StatementsData.cycleMs - StatementsData.gapMs
      jest.advanceTimersByTime(visibleMs)
      
      await waitFor(() => {
        // Container should have opacity 0 (faded out)
        const section = container.querySelector('section')
        expect(section).toHaveStyle({ opacity: '0' })
      })
    })

    it('should show gap between statements', async () => {
      const { container } = renderWithTheme(<Statements />)
      
      // Advance past visible duration to gap period
      const visibleMs = StatementsData.cycleMs - StatementsData.gapMs
      jest.advanceTimersByTime(visibleMs)
      
      await waitFor(() => {
        // During gap, container should be hidden (opacity 0)
        const section = container.querySelector('section')
        expect(section).toHaveStyle({ opacity: '0' })
      })
    })

    it('should show next statement after gap', async () => {
      renderWithTheme(<Statements />)
      
      // Get initial statement
      const firstQuote = StatementsData.items.find(item => {
        return screen.queryByText(item.quote) !== null
      })
      
      if (!firstQuote) {
        throw new Error('No initial statement found')
      }
      
      // Advance through entire cycle (visible + gap)
      jest.advanceTimersByTime(StatementsData.cycleMs)
      
      await waitFor(() => {
        // Should show a different statement (or back to first if only 1)
        const hasNewQuote = StatementsData.items.some(item => {
          if (item.quote === firstQuote.quote && StatementsData.items.length > 1) {
            return false
          }
          return screen.queryByText(item.quote) !== null
        })
        expect(hasNewQuote).toEqual(true)
      })
    })
  })

  describe('Statement shuffling', () => {
    it('should shuffle statements on mount', async () => {
      // Track statements shown across multiple renders
      const shownStatements = new Set<string>()
      
      // Render multiple times to see if order changes
      for (let i = 0; i < 10; i++) {
        const { unmount } = renderWithTheme(<Statements />)
        
        // Wait for shuffle effect to run
        await waitFor(() => {
          const currentStatement = StatementsData.items.find(item => {
            return screen.queryByText(item.quote) !== null
          })
          
          if (currentStatement) {
            shownStatements.add(currentStatement.quote)
          }
          expect(currentStatement).toBeDefined()
        })
        
        unmount()
      }
      
      // If shuffling works, we should see different statements
      // (unless there's only 1 statement)
      if (StatementsData.items.length > 1) {
        expect(shownStatements.size).toBeGreaterThan(1)
      }
    })
  })

  describe('Continuous rotation', () => {
    it('should loop back to beginning after all statements shown', async () => {
      renderWithTheme(<Statements />)
      
      // Advance through multiple complete cycles
      const totalCycles = StatementsData.items.length + 1
      const totalTime = StatementsData.cycleMs * totalCycles
      
      jest.advanceTimersByTime(totalTime)
      
      await waitFor(() => {
        // Should still be showing a statement (has looped back)
        const hasAnyQuote = StatementsData.items.some(item => {
          return screen.queryByText(item.quote) !== null
        })
        expect(hasAnyQuote).toEqual(true)
      })
    })
  })

  describe('Statement visibility state', () => {
    it('should have visible statement when mounted', () => {
      renderWithTheme(<Statements />)
      
      // At least one quote should be visible
      const hasVisibleQuote = StatementsData.items.some(item => {
        return screen.queryByText(item.quote) !== null
      })
      
      expect(hasVisibleQuote).toEqual(true)
    })

    it('should fade out during gap period', async () => {
      const { container } = renderWithTheme(<Statements />)
      
      // Get initial statement
      const firstStatement = StatementsData.items.find(item => {
        return screen.queryByText(item.quote) !== null
      })
      
      if (!firstStatement) {
        throw new Error('No initial statement found')
      }
      
      const visibleMs = StatementsData.cycleMs - StatementsData.gapMs
      jest.advanceTimersByTime(visibleMs)
      
      await waitFor(() => {
        // Container should fade to opacity 0
        const section = container.querySelector('section')
        expect(section).toHaveStyle({ opacity: '0' })
      })
    })
  })

  describe('Statement content structure', () => {
    it('should render quote text from statements.json', () => {
      renderWithTheme(<Statements />)
      
      // At least one quote should be rendered
      const hasQuote = StatementsData.items.some(item => {
        return screen.queryByText(item.quote) !== null
      })
      
      expect(hasQuote).toEqual(true)
    })

    it('should render attribution when present', () => {
      renderWithTheme(<Statements />)
      
      // Find current statement
      const currentStatement = StatementsData.items.find(item => {
        return screen.queryByText(item.quote) !== null
      })
      
      if (currentStatement?.attribution) {
        const attributionWithDash = `— ${currentStatement.attribution}`
        const attributionElement = screen.getByText(attributionWithDash)
        expect(attributionElement).toBeInTheDocument()
      }
    })
  })
})