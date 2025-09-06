"use client"

import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface Button3Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  initialDotTranslate?: number
  finalDotTranslate?: number
  initialArrowTranslate?: number
  finalArrowTranslate?: number
  initialTextTranslate?: number
  finalTextTranslate?: number
}

export const Button3 = ({
  children,
  className,
  initialDotTranslate = -100,
  finalDotTranslate = 0,
  initialArrowTranslate = -100,
  finalArrowTranslate = -50,
  initialTextTranslate = -30,
  finalTextTranslate = 0,
  ...props
}: Button3Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const arrowRef = useRef<SVGSVGElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const arrowElement = arrowRef.current
      const dotElement = dotRef.current
      const textElement = textRef.current
      const buttonElement = buttonRef.current

      if (!buttonElement || !arrowElement || !dotElement || !textElement) return

      const hoverInTimeline = gsap.timeline({ paused: true })
      const hoverOutTimeline = gsap.timeline({ paused: true })

      hoverInTimeline
        .to(dotElement, { opacity: 0, xPercent: initialDotTranslate }, 0)
        .to(arrowElement, { opacity: 1, xPercent: initialArrowTranslate }, 0)
        .to(textElement, { xPercent: initialTextTranslate }, "-=0.25")

      hoverOutTimeline
        .to(arrowElement, { opacity: 0, xPercent: finalDotTranslate }, 0)
        .to(dotElement, { opacity: 1, xPercent: finalArrowTranslate }, 0)
        .to(textElement, { xPercent: finalTextTranslate }, "-=0.25")

      const enterHandler = () => hoverInTimeline.restart().play()
      const leaveHandler = () => hoverOutTimeline.restart().play()

      buttonElement.addEventListener("mouseenter", enterHandler)
      buttonElement.addEventListener("mouseleave", leaveHandler)

      return () => {
        buttonElement.removeEventListener("mouseenter", enterHandler)
        buttonElement.removeEventListener("mouseleave", leaveHandler)
      }
    },
    { scope: buttonRef }
  )

  return (
    <button
      ref={buttonRef}
      {...props}
      className={cn(
        "relative rounded-[32px] px-6 py-3 flex items-center gap-[1em] " +
          "text-[clamp(.875rem,1vw,1.75rem)] cursor-pointer transition-all ease-in-out " +
          "shadow-md overflow-hidden " +
          "bg-black text-white hover:bg-yellow-500 hover:text-black",
        className
      )}
    >
      <span
        ref={dotRef}
        className="inline-block size-1.5 lg:size-2 bg-white rounded-full relative"
      />
      <p ref={textRef} className="font-bold">
        {children}
      </p>
      <ArrowRight
        ref={arrowRef}
        className="size-5 absolute right-4 opacity-0 overflow-hidden"
      />
    </button>
  )
}
