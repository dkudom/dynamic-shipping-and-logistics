"use client"

import { useEffect, useState } from "react"

interface AnimatedNumberProps {
  value: number
  duration?: number
  delay?: number
  format?: (value: number) => string
}

export function AnimatedNumber({ 
  value, 
  duration = 2, 
  delay = 0,
  format = (v: number) => v.toLocaleString()
}: AnimatedNumberProps) {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease-out
      
      setCurrentValue(Math.floor(easedProgress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCurrentValue(value)
      }
    }

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [value, duration, delay])

  return <span className="inline-block">{format(currentValue)}</span>
}
