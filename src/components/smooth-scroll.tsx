"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { animate } from "framer-motion"

interface SmoothScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

export function SmoothScrollLink({ href, children, className, onClick, ...rest }: SmoothScrollLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (onClick) {
      onClick(e) // chama o onClick externo, como fechar menu mobile
    }

    if (href.startsWith("#")) {
      window.history.pushState({}, "", href)
    }

    const targetId = href.replace(/.*#/, "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
      const startPosition = window.scrollY

      animate(startPosition, targetPosition, {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1],
        onUpdate: (value) => {
          window.scrollTo(0, value)
        },
      })
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  )
}
