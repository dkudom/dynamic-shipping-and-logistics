"use client"

import { useEffect, useState } from "react"

interface CountUpProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export function CountUp({
  end,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = ""
}: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    let animationFrame: number
    const startCount = 0
    const endCount = end

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      const currentCount = startCount + (easeOutCubic * (endCount - startCount))
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step)
      } else {
        setCount(endCount)
      }
    }

    animationFrame = window.requestAnimationFrame(step)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [end, duration])

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals)
    return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return <span>{prefix}{formatNumber(count)}{suffix}</span>
}
