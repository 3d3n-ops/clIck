"use client"

import type React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: React.ReactNode
}

// Update the FAQSection component to use black/gray styling
export function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800/50">
            <AccordionTrigger className="text-lg font-medium py-6 hover:text-white transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 pb-6">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
