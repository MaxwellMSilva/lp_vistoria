import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

import imgApp from "../../../public/ChatGPT Image 17 de abr. de 2025, 09_46_25.png"
import imgPlay from "../../../public/disponivel-google-play-badge-1.png"
import imgStore from "../../../public/disponivel-na-app-store-botao-1.png"

export default function App() {
  const features = [
    "Disponível para iOS e Android",
    "Modo offline com sincronização automática",
    "Captura de fotos com anotações",
    "Assinatura digital do cliente",
    "Geolocalização automática",
  ]

  return (
    <section id="app" className="w-full py-8 md:py-12 lg:py-16 bg-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid gap-4 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-3 order-2 lg:order-1" data-aos="fade-up">
            <div className="space-y-1">
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">Aplicativo Móvel</div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Vistorias em qualquer lugar</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Faça vistorias completas mesmo sem conexão com a internet.
              </p>
            </div>
            <ul className="grid gap-2 py-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-red-600 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <Link href="#" className="inline-block">
                <Image
                  src={imgStore}
                  width={130}
                  height={40}
                  alt="Download na App Store"
                  className="h-auto"
                />
              </Link>
              <Link href="#" className="inline-block">
                <Image
                  src={imgPlay}
                  width={130}
                  height={40}
                  alt="Download no Google Play"
                  className="h-auto"
                />
              </Link>
            </div>
          </div>
          <div className="flex justify-center order-1 lg:order-2" data-aos="fade-left">
            <Image
              src={imgApp}
              width={260}
              height={520}
              alt="Aplicativo móvel"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
