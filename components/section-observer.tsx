"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface SectionObserverProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export function SectionObserver({ children, id, className = "" }: SectionObserverProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div ref={sectionRef} id={id} className={`section-animate ${className}`}>
      {children}
    </div>
  )
}
