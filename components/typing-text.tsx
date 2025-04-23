"use client"

import { useEffect, useRef, useState } from "react"

interface TypingTextProps {
  text: string
  className?: string
  speed?: number
}

export function TypingText({ text, className = "", speed = 50 }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const index = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (index.current < text.length) {
        setDisplayText((prev) => prev + text.charAt(index.current))
        index.current += 1
      } else {
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  )
}
