"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { SmoothScrollLink } from "./smooth-scroll"
import { Button } from "@/components/ui/button"
import { Car, Menu, X, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const navLinks = [
    ["#inicio", "Início"],
    ["#recursos", "Recursos"],
    ["#planos", "Planos"],
    ["#admin", "Painel"],
    ["#app", "Aplicativo"],
    ["#contato", "Contato"],
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen])

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
          : "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        {/* Logo com efeito gradiente */}
        <motion.div
          className="flex items-center gap-3 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <div className="relative bg-gradient-to-r from-red-600 to-red-500 p-2 rounded-lg shadow-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
              MK Veículos
            </span>
            <span className="text-xs text-gray-500 font-medium -mt-1">Sistema Inteligente</span>
          </div>
        </motion.div>

        {/* Desktop Navigation com efeitos hover */}
        <nav className="hidden md:flex gap-1 items-center">
          {navLinks.map(([href, label], index) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SmoothScrollLink
                href={href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-all duration-300 rounded-lg group"
              >
                <span className="relative z-10">{label}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                />
                <motion.div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </SmoothScrollLink>
            </motion.div>
          ))}
        </nav>

        {/* Ações com botão premium */}
        <div className="flex items-center gap-4">
          {/* Botão Login Premium (Desktop) */}
          <motion.div className="hidden md:block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/users/login"
              className="relative inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-2.5 rounded-xl overflow-hidden group transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Sparkles className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Acessar Sistema</span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button com animação */}
          <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative p-2 rounded-xl hover:bg-red-50 transition-colors group"
              onClick={toggleMenu}
            >
              <motion.div animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {menuOpen ? (
                  <X className="h-5 w-5 text-red-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700 group-hover:text-red-600" />
                )}
              </motion.div>
              <span className="sr-only">Menu</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Premium */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-gradient-to-br from-white via-red-50/30 to-orange-50/30 backdrop-blur-xl border-t border-gray-200/50">
              <div ref={menuRef} className="container mx-auto max-w-6xl px-4 py-6">
                <div className="flex flex-col gap-2">
                  {navLinks.map(([href, label], index) => (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SmoothScrollLink
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-white/60 rounded-xl transition-all duration-300 group"
                      >
                        <motion.div
                          className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span>{label}</span>
                      </SmoothScrollLink>
                    </motion.div>
                  ))}

                  {/* Botão Login Premium (Mobile) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 pt-4 border-t border-gray-200/50"
                  >
                    <Link
                      href="/users/login"
                      className="relative flex items-center justify-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-xl overflow-hidden group transition-all duration-300 shadow-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Sparkles className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">Acessar Sistema</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
