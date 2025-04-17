import Link from "next/link"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function App() {
  return (
    <section id="aplicativo" className="py-12 md:py-16 bg-gray-50">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 order-2 md:order-1" data-aos="fade-right">
            <Image
              src="/car-inspection-app.png"
              width={300}
              height={600}
              alt="Aplicativo FicEnterprise"
              className="mx-auto rounded-xl shadow-xl"
            />
          </div>
          <div className="flex-1 space-y-6 text-center md:text-left order-1 md:order-2" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold">Nosso Aplicativo</h2>
            <p className="text-lg text-muted-foreground">
              Agende vistorias, acompanhe o status e receba relatórios diretamente no seu smartphone.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary-foreground mt-0.5 flex-shrink-0" />
                <span>Agendamento rápido de vistorias em poucos cliques</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary-foreground mt-0.5 flex-shrink-0" />
                <span>Acompanhamento em tempo real do status da vistoria</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary-foreground mt-0.5 flex-shrink-0" />
                <span>Relat��rios detalhados com fotos e observações</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary-foreground mt-0.5 flex-shrink-0" />
                <span>Notificações sobre o andamento do processo</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/google-play-store-badge-generic.png"
                  width={180}
                  height={60}
                  alt="Google Play"
                  className="h-[60px] w-auto"
                />
              </Link>
              <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/app-store-badges.png"
                  width={180}
                  height={60}
                  alt="App Store"
                  className="h-[60px] w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
