import { SmoothScrollLink } from "./smooth-scroll"
import { Button } from "@/components/ui/button"
import { Car, Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto max-w-6xl flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary-foreground"/>
          <span className="text-xl font-bold">FicEnterprise</span>
        </div>

        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-8">
          <SmoothScrollLink href="#inicio" className="font-medium transition-colors hover:text-red-800">
            Início
          </SmoothScrollLink>
          <SmoothScrollLink href="#recursos" className="font-medium transition-colors hover:text-red-800">
            Recursos
          </SmoothScrollLink>
          <SmoothScrollLink href="#planos" className="font-medium transition-colors hover:text-red-800">
            Planos
          </SmoothScrollLink>
          <SmoothScrollLink href="#admin" className="font-medium transition-colors hover:text-red-800">
            Painel Adiminstrativo
          </SmoothScrollLink>
          <SmoothScrollLink href="#app" className="font-medium transition-colors hover:text-red-800">
            Aplicativo
          </SmoothScrollLink>
          <SmoothScrollLink href="#contato" className="font-medium transition-colors hover:text-red-800">
            Contato
          </SmoothScrollLink>
        </nav>

        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  )
}
