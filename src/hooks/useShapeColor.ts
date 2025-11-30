import { useTheme, useMediaQuery } from '@mui/material'
import { selectRandomShapeColor } from '@/utils'

export function useShapeColor() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  const fillColor = isMobile 
    ? theme.palette.grey[300]
    : theme.palette.shapes[selectRandomShapeColor()]

  return { fillColor }
}
