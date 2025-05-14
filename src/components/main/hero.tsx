import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Download, Phone } from "lucide-react"

import imgCarTablet from "../../../public/ChatGPT Image 17 de abr. de 2025, 08_59_58.png"

export default function Hero() {
  return (
    <section id="inicio" className="py-12 md:py-16 bg-gradient-to-b from-red-100 to-white">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" data-aos="fade-down">
              Sistema Completo de <span className="text-primary-foreground">Vistoria de Veículos</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto md:mx-0" data-aos="fade-right">
              Automatize e agilize suas vistorias com nossa plataforma integrada. Painel administrativo completo e aplicativo móvel para vistorias em campo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start" data-aos="fade-up">
              <Link href="#planos" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Ver planos
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full mt-2 sm:mt-0">
                  Solicitar demonstração
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1" data-aos="fade-left">
            <Image
              src={imgCarTablet}
              width={450}
              height={400}
              alt="Vistoria de veículos profissional"
              className="rounded-lg shadow-xl mx-auto" 
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
