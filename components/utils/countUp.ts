import { useEffect, useState } from "react"

interface CountUpProps {
  start: number
  end: number
  duration: number
  delay?: number
}

export function useCountUp({ start, end, duration, delay = 0 }: CountUpProps) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let mounted = true
    let startTime = 0
    let frame = 0

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      if (progress < duration) {
        const ease = 1 - Math.pow(1 - progress / duration, 2) // ease-in-out
        const value = Math.round(start + (end - start) * ease)
        if (mounted) {
          setCount(value)
        }
        frame = requestAnimationFrame(step)
      } else {
        if (mounted) {
          setCount(end)
        }
        cancelAnimationFrame(frame)
      }
    }

    setTimeout(() => {
      frame = requestAnimationFrame(step)
    }, delay)

    return () => {
      mounted = false
      cancelAnimationFrame(frame)
    }
  }, [start, end, duration, delay])

  return count
}
