import React, { useState } from 'react'
import { theme } from '../theme'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "How does the adoption process work?",
      answer: "Our adoption process is designed to ensure the best match for both the animal and your family. It involves filling out an application, a brief interview with our counselors, a meet-and-greet with the pet, and a home check for certain animals."
    },
    {
      question: "Can I volunteer if I don't have experience with animals?",
      answer: "Absolutely! We welcome volunteers of all experience levels. We provide comprehensive training for animal handling, or you can help with administrative tasks, event planning, or facility maintenance."
    },
    {
      question: "What items do you accept as donations?",
      answer: "We always need unopened pet food (wet and dry), clean blankets and towels, toys, cleaning supplies, and slightly used pet beds or crates. Check our website for the current urgent needs list!"
    },
    {
      question: "What happens if an adoption doesn't work out?",
      answer: "We have a lifetime return policy. If for any reason the adoption isn't working out, whether it's two days or two years later, we require that the animal is returned directly to Rakshak Paws Foundation."
    }
  ]

  return (
    <section className="py-24 px-8 bg-transparent" id="faq">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="font-bold tracking-wider uppercase text-sm mb-3 block" style={{ color: theme.colors.accent }}>Got Questions?</span>
          <h2 className="text-3xl md:text-5xl font-extrabold" style={{ color: theme.colors.textMain }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border-2 rounded-[24px] overflow-hidden transition-all duration-300 shadow-sm"
              style={{ 
                borderColor: openIndex === idx ? theme.colors.accent : theme.colors.border,
                backgroundColor: theme.colors.surface
              }}
            >
              <button 
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <span 
                  className="font-bold text-lg transition-colors"
                  style={{ color: openIndex === idx ? theme.colors.accent : theme.colors.textMain }}
                >
                  {faq.question}
                </span>
                <span 
                  className={`material-symbols-outlined transform transition-all duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                  style={{ color: openIndex === idx ? theme.colors.accent : theme.colors.textMuted }}
                >
                  expand_more
                </span>
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="leading-relaxed" style={{ color: theme.colors.textMuted }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
