'use client'

import { useShapeColor } from '@/hooks'
import Octagon from './components/Octagon'
import Square from './components/Square'
import Triangle from './components/Triangle'

export default function Shapes() {
  const { fillColor } = useShapeColor()

  return (
    <>
      <Octagon fill={fillColor} />
      <Square fill={fillColor} />
      <Triangle fill={fillColor} />
    </>
  )
}
