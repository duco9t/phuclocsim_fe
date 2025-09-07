"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import React, { useEffect, useRef, useState } from "react"

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string
  duration?: number
  fontSize?: number | string
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const maskGradientRef = useRef<SVGGradientElement>(null)
  const animatedTextRef = useRef<SVGTextElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  useGSAP(
    () => {
      gsap.fromTo(
        animatedTextRef.current,
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        {
          strokeDashoffset: 0,
          strokeDasharray: 1000,
          duration: 4,
          ease: "power2.inOut",
        }
      )
    },
    { scope: svgRef }
  )

  const updateCursorPosition = (x: number, y: number) => {
    if (svgRef.current && x !== null && y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((y - svgRect.top) / svgRect.height) * 100

      const newPosition = {
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      }

      setMaskPosition(newPosition)

      gsap.to(maskGradientRef.current, {
        attr: newPosition,
        duration: duration ?? 0,
        ease: "power2.out",
      })
    }
  }

  useEffect(() => {
    updateCursorPosition(cursor.x, cursor.y)
  }, [cursor, duration])

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setHovered(true)
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      setCursor({ x: touch.clientX, y: touch.clientY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      setCursor({ x: touch.clientX, y: touch.clientY })
    }
  }

  const handleTouchEnd = () => setHovered(false)

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 100 20"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="select-none w-full h-full"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#d4af37" />   {/* vàng kim */}
              <stop offset="50%" stopColor="#8b0000" />  {/* đỏ đô */}
              <stop offset="100%" stopColor="#5c4033" /> {/* nâu gỗ */}
            </>
          )}
        </linearGradient>
        <radialGradient
          id="revealMask"

          gradientUnits="userSpaceOnUse"
          r="25%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="textMask">
          <rect width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {[0, 1, 2].map((_, idx) => (
        <text
          key={idx}
          ref={idx === 1 ? animatedTextRef : undefined}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className={`fill-transparent font-[helvetica] font-bold ${idx === 0
              ? "stroke-neutral-300 dark:stroke-neutral-800"
              : idx === 1
                ? "stroke-neutral-300 dark:stroke-neutral-800"
                : ""
            }`}
          stroke={idx === 2 ? "url(#textGradient)" : undefined}
          mask={idx === 2 ? "url(#textMask)" : undefined}
          style={{
            fontSize: 15, // dùng fontSize = "10vw" => responsive
          }}
        >
          {text}
        </text>
      ))}
    </svg>
  )
}
