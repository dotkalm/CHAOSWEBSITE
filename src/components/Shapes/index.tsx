'use client'

import { useEffect, useRef } from 'react'
import { useShapeLayout, useParallax } from '@/hooks'
import usePointer from '@/hooks/usePointer'
import Octagon from './components/Octagon'
import Square from './components/Square'
import Triangle from './components/Triangle'

export default function Shapes() {
  const { layouts } = useShapeLayout()
  const { position } = usePointer()
  
  const octagonRef = useRef<HTMLElement>(null)
  const squareRef = useRef<HTMLElement>(null)
  const triangleRef = useRef<HTMLElement>(null)
  
  const shapesRef = useRef<Array<{
    node: HTMLElement
    left: number
    top: number
    scale: number
    rotate: number
    z: number
  }>>([])

  // Build shapes array for parallax when refs are ready (only once)
  useEffect(() => {
    if (octagonRef.current && squareRef.current && triangleRef.current && shapesRef.current.length === 0) {
      shapesRef.current = [
        {
          node: octagonRef.current,
          left: layouts[0].left / 100, // Convert from percentage to 0-1
          top: layouts[0].top / 100,
          scale: layouts[0].scale,
          rotate: layouts[0].rotation,
          z: layouts[0].zIndex,
        },
        {
          node: squareRef.current,
          left: layouts[1].left / 100,
          top: layouts[1].top / 100,
          scale: layouts[1].scale,
          rotate: layouts[1].rotation,
          z: layouts[1].zIndex,
        },
        {
          node: triangleRef.current,
          left: layouts[2].left / 100,
          top: layouts[2].top / 100,
          scale: layouts[2].scale,
          rotate: layouts[2].rotation,
          z: layouts[2].zIndex,
        },
      ]
    }
  }, [layouts])

  // Apply parallax effect
  useParallax(position, shapesRef.current)

  return (
    <>
      <Octagon 
        ref={octagonRef}
        left={layouts[0].left}
        top={layouts[0].top}
        scale={layouts[0].scale}
        rotate={layouts[0].rotation}
        zIndex={layouts[0].zIndex}
      />
      <Square 
        ref={squareRef}
        left={layouts[1].left}
        top={layouts[1].top}
        scale={layouts[1].scale}
        rotate={layouts[1].rotation}
        zIndex={layouts[1].zIndex}
      />
      <Triangle 
        ref={triangleRef}
        left={layouts[2].left}
        top={layouts[2].top}
        scale={layouts[2].scale}
        rotate={layouts[2].rotation}
        zIndex={layouts[2].zIndex}
      />
    </>
  )
}
