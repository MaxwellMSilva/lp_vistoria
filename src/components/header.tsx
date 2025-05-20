"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { SmoothScrollLink } from "./smooth-scroll"
import { Button } from "@/components/ui/button"
import { Car, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setMenuOpen(prev => !prev)

  const navLinks = [
    ["#inicio", "Início"],
    ["#recursos", "Recursos"],
    ["#planos", "Planos"],
    ["#admin", "Painel"],
    ["#app", "Aplicativo"],
    ["#contato", "Contato"],
  ]

  const linkClass =
    "text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-red-600 font-bold text-xl">
          <Car className="h-6 w-6" />
          <span>MK Veículos</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(([href, label]) => (
            <SmoothScrollLink key={href} href={href} className={linkClass}>
              {label}
            </SmoothScrollLink>
          ))}
        </nav>

        {/* Ações: botão mobile menu + login */}
        <div className="flex items-center gap-4">
          {/* Botão Login (Desktop) */}
          <Link
            href="/users/login"
            className="hidden md:inline-flex text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-md"
          >
            Acessar Sistema
          </Link>

          {/* Mobile Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-md px-4 py-4"
          >
            <div ref={menuRef} className="flex flex-col gap-4">
              {navLinks.map(([href, label]) => (
                <SmoothScrollLink
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={linkClass}
                >
                  {label}
                </SmoothScrollLink>
              ))}

              {/* Botão Login (Mobile) */}
              <Link
                href="/users/login"
                className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-md text-center"
              >
                Acessar Sistema
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  )
}
