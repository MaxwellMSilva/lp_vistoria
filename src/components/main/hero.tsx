import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Phone } from "lucide-react"

import imgCarTablet from "../../../public/ChatGPT Image 17 de abr. de 2025, 08_59_58.png"

export default function Hero() {
  return (
    <section id="sobre" className="py-12 md:py-16 bg-gradient-to-b from-red-100 to-white">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" data-aos="fade-down">
              Vistoria de Veículos <span className="text-primary-foreground">Rápida e Segura</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto md:mx-0" data-aos="fade-right">
              A FicEnterprise oferece soluções completas para vistoria veicular com tecnologia de ponta e atendimento
              personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="#aplicativo">
                <Button className="cursor-pointer w-full sm:w-auto text-white bg-primary-foreground hover:bg-red-800" data-aos="fade-up">
                  <Download className="mr-2 h-4 w-4 text-white"/>
                  Baixar Aplicativo
                </Button>
              </Link>
              <Link href="#contato">
                <Button variant="outline" className="cursor-pointer w-full sm:w-auto" data-aos="fade-up">
                  <Phone className="mr-2 h-4 w-4"/>
                  Agendar Vistoria
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
