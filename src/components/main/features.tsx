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
    <section id="recursos" className="w-full py-8 md:py-12 lg:py-16" data-aos="fade-up">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-1">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">Recursos</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Tudo o que você precisa para vistorias eficientes
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Plataforma completa para otimizar seu processo de vistoria.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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
    <div className="flex flex-col items-center space-y-2 rounded-lg border p-3 shadow-sm">
      <div className="rounded-full bg-red-100 p-2">{icon}</div>
      <h3 className="text-base md:text-lg font-semibold text-center">{title}</h3>
      <p className="text-center text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
