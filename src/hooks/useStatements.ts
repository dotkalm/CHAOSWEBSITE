import { useState, useEffect, useMemo } from 'react'
import { StatementsData } from '@/constants'
import { shuffleArray } from '@/utils/math'
import type { StatementItem } from '@/types'

interface UseStatementsReturn {
  currentStatement: StatementItem | null
  isVisible: boolean
}

/**
 * Hook that manages statement rotation with shuffling and timing
 * - Shuffles statements on mount (client-side only to avoid hydration mismatch)
 * - Cycles through statements with configurable timing
 * - Manages visibility state (visible during display, hidden during gap)
 */
export function useStatements(): UseStatementsReturn {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [shuffledStatements, setShuffledStatements] = useState<StatementItem[]>(StatementsData.items)

  // Shuffle statements once on mount (client-side only)
  useEffect(() => {
    setShuffledStatements(shuffleArray(StatementsData.items))
  }, [])

  const currentStatement = shuffledStatements[currentIndex]

  useEffect(() => {
    const { cycleMs, gapMs } = StatementsData
    const visibleMs = cycleMs - gapMs

    // Start with statement visible
    setIsVisible(true)

    let hideTimer: NodeJS.Timeout
    let showTimer: NodeJS.Timeout

    // Hide statement after visible duration
    hideTimer = setTimeout(() => {
      setIsVisible(false)

      // Show next statement after gap
      showTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % shuffledStatements.length)
        setIsVisible(true)
      }, gapMs)
    }, visibleMs)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(showTimer)
    }
  }, [currentIndex, shuffledStatements.length])

  return {
    currentStatement,
    isVisible
  }
}
