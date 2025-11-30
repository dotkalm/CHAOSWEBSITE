'use client'

import { useShapeColor, useShapeLayout } from '@/hooks'
import Octagon from './components/Octagon'
import Square from './components/Square'
import Triangle from './components/Triangle'

export default function Shapes() {
  const { fillColor } = useShapeColor()
  const { layouts } = useShapeLayout()

  return (
    <>
      <Octagon 
        fill={fillColor} 
        left={layouts[0].left}
        top={layouts[0].top}
        rotate={layouts[0].rotation} 
      />
      <Square 
        fill={fillColor} 
        left={layouts[1].left}
        top={layouts[1].top}
        rotate={layouts[1].rotation} 
      />
      <Triangle 
        fill={fillColor} 
        left={layouts[2].left}
        top={layouts[2].top}
        rotate={layouts[2].rotation} 
      />
    </>
  )
}
