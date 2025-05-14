import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

import imgApp from "../../../public/ChatGPT Image 17 de abr. de 2025, 09_46_25.png"

export default function App() {
  const features = [
    "Disponível para iOS e Android",
    "Modo offline com sincronização automática",
    "Captura de fotos com anotações",
    "Assinatura digital do cliente",
    "Geolocalização automática",
  ]

  return (
    <section id="app" className="w-full py-8 md:py-16 lg:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1" data-aos="fade-up">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">Aplicativo Móvel</div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl">
                Vistorias em qualquer lugar
              </h2>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                Nosso aplicativo móvel permite que você realize vistorias completas mesmo sem conexão com a internet.
              </p>
            </div>
            <ul className="grid gap-2 py-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link href="#" className="inline-block">
                <Image
                  src="/app-store-badge.png"
                  width={150}
                  height={50}
                  alt="Download na App Store"
                  className="h-auto"
                />
              </Link>
              <Link href="#" className="inline-block">
                <Image
                  src="/google-play-badge.png"
                  width={150}
                  height={50}
                  alt="Download no Google Play"
                  className="h-auto"
                />
              </Link>
            </div>
          </div>
          <div className="flex justify-center order-1 lg:order-2" data-aos="fade-left">
            <Image
              src={imgApp}
              width={300}
              height={600}
              alt="Aplicativo móvel"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
