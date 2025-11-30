'use client'

import { useShapeLayout } from '@/hooks'
import Octagon from './components/Octagon'
import Square from './components/Square'
import Triangle from './components/Triangle'

export default function Shapes() {
  const { layouts } = useShapeLayout()

  return (
    <>
      <Octagon 
        left={layouts[0].left}
        top={layouts[0].top}
        rotate={layouts[0].rotation} 
      />
      <Square 
        left={layouts[1].left}
        top={layouts[1].top}
        rotate={layouts[1].rotation} 
      />
      <Triangle 
        left={layouts[2].left}
        top={layouts[2].top}
        rotate={layouts[2].rotation} 
      />
    </>
  )
}
