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
          <SmoothScrollLink href="#sobre" className="font-medium transition-colors hover:text-red-800">
            Sobre
          </SmoothScrollLink>
          <SmoothScrollLink href="#servicos" className="font-medium transition-colors hover:text-red-800">
            Serviços
          </SmoothScrollLink>
          <SmoothScrollLink href="#aplicativo" className="font-medium transition-colors hover:text-red-800">
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
