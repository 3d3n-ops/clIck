"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"

interface ParallaxCardProps {
  title: string
  content: React.ReactNode
  index: number
}

export function ParallaxCard({ title, content, index }: ParallaxCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView && cardRef.current) {
      cardRef.current.style.transform = "translateX(0)"
      cardRef.current.style.opacity = "1"
    }
  }, [inView])

  return (
    <div ref={ref} className="w-full">
      <Card
        ref={cardRef}
        className="hover-card bg-black border-gray-800 transition-all duration-700"
        style={{
          transform: "translateX(100px)",
          opacity: 0,
          transitionDelay: `${index * 200}ms`,
        }}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    </div>
  )
}

export function ParallaxCards({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <ParallaxCard key={index} title={item.title} content={item.content} index={index} />
      ))}
    </div>
  )
}
