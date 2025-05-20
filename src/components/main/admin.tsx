import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

import adminImg from "../../../public/Captura de tela 2025-05-14 132250.png"

export default function AdminPanel() {
  const features = [
    "Dashboard com métricas em tempo real",
    "Gerenciamento de usuários e permissões",
    "Histórico completo de vistorias",
    "Relatórios personalizados e exportação",
    "Configuração de formulários de vistoria",
  ]

  return (
    <section id="admin" className="w-full py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid gap-4 lg:grid-cols-2 items-center">
          <div className="flex justify-center order-2 lg:order-1" data-aos="fade-right">
            <Image
              src={adminImg}
              width={500}
              height={400}
              alt="Painel administrativo"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
          <div className="flex flex-col justify-center space-y-3 order-1 lg:order-2" data-aos="fade-up">
            <div className="space-y-1">
              <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">
                Painel Administrativo
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Controle total das suas vistorias
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Tenha uma visão completa das operações de vistoria em tempo real.
              </p>
            </div>
            <ul className="grid gap-2 py-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div>
              <Button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-sm">Agendar demonstração</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
