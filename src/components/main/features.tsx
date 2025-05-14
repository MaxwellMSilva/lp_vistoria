import type React from "react"
import { Clock, FileCheck, LayoutDashboard, Smartphone, Shield, LinkIcon } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Clock className="h-6 w-6 text-red-600" />,
      title: "Vistorias rápidas",
      description: "Reduza o tempo de vistoria em até 70% com nossos formulários inteligentes",
    },
    {
      icon: <FileCheck className="h-6 w-6 text-red-600" />,
      title: "Laudos detalhados",
      description: "Gere laudos profissionais com fotos, assinaturas e detalhes completos",
    },
    {
      icon: <LayoutDashboard className="h-6 w-6 text-red-600" />,
      title: "Painel administrativo",
      description: "Gerencie todas as vistorias, usuários e relatórios em um único lugar",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-red-600" />,
      title: "Aplicativo móvel",
      description: "Realize vistorias em campo com nosso aplicativo para iOS e Android",
    },
    {
      icon: <Shield className="h-6 w-6 text-red-600" />,
      title: "Segurança total",
      description: "Dados criptografados e backups automáticos para sua tranquilidade",
    },
    {
      icon: <LinkIcon className="h-6 w-6 text-red-600" />,
      title: "Integração completa",
      description: "Conecte com seus sistemas existentes através de nossa API",
    },
  ]

  return (
    <section id="recursos" className="w-full py-8 md:py-16 lg:py-24 " data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">Recursos</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Tudo o que você precisa para vistorias eficientes
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Nossa plataforma integrada oferece todas as ferramentas necessárias para otimizar seu processo de vistoria
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 md:p-6 shadow-sm">
      <div className="rounded-full bg-red-100 p-3">{icon}</div>
      <h3 className="text-lg md:text-xl font-bold text-center">{title}</h3>
      <p className="text-center text-muted-foreground text-sm md:text-base">{description}</p>
    </div>
  )
}
