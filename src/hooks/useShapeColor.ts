import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { selectRandomShapeColor } from '@/utils'
import type { ShapeColor } from '@/types'

export function useShapeColor() {
  const theme = useTheme()
  const [selectedColor] = useState<ShapeColor>(() => selectRandomShapeColor())
  const fillColor = theme.palette.shapes[selectedColor]

  return { selectedColor, fillColor }
}
