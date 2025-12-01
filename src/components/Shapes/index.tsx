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
        scale={layouts[0].scale}
        rotate={layouts[0].rotation}
        zIndex={layouts[0].zIndex}
      />
      <Square 
        left={layouts[1].left}
        top={layouts[1].top}
        scale={layouts[1].scale}
        rotate={layouts[1].rotation}
        zIndex={layouts[1].zIndex}
      />
      <Triangle 
        left={layouts[2].left}
        top={layouts[2].top}
        scale={layouts[2].scale}
        rotate={layouts[2].rotation}
        zIndex={layouts[2].zIndex}
      />
    </>
  )
}
