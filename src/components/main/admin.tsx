import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminPanel() {
  const features = [
    "Dashboard com métricas em tempo real",
    "Gerenciamento de usuários e permissões",
    "Histórico completo de vistorias",
    "Relatórios personalizados e exportação",
    "Configuração de formulários de vistoria",
  ]

  return (
    <section id="admin" className="w-full py-8 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex justify-center order-2 lg:order-1" data-aos="fade-right">
            <Image
              src="/placeholder.svg?key=sgjtk"
              width={600}
              height={500}
              alt="Painel administrativo"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2"  data-aos="fade-up">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">
                Painel Administrativo
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl">
                Controle total das suas vistorias
              </h2>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                Nosso painel administrativo oferece uma visão completa de todas as suas operações de vistoria em tempo
                real.
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
            <div>
              <Button className="bg-red-600 hover:bg-red-700 text-white">Agendar demonstração</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
