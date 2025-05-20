import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Pricing() {
  const plans = [
    {
      name: "Básico",
      price: "R$299",
      description: "Ideal para pequenas empresas e autônomos",
      features: [
        "Até 50 vistorias/mês",
        "Acesso ao painel administrativo",
        "2 usuários incluídos",
        "Aplicativo móvel",
        "Suporte por e-mail",
      ],
      popular: false,
    },
    {
      name: "Profissional",
      price: "R$599",
      description: "Para empresas em crescimento",
      features: [
        "Até 200 vistorias/mês",
        "Acesso ao painel administrativo",
        "5 usuários incluídos",
        "Aplicativo móvel",
        "Suporte prioritário",
        "Relatórios avançados",
      ],
      popular: true,
    },
    {
      name: "Empresarial",
      price: "R$999",
      description: "Para grandes operações",
      features: [
        "Vistorias ilimitadas",
        "Acesso ao painel administrativo",
        "Usuários ilimitados",
        "Aplicativo móvel",
        "Suporte 24/7",
        "API completa",
        "Personalização branding",
      ],
      popular: false,
    },
  ]

  return (
    <section id="planos" className="w-full py-8 md:py-12 lg:py-16 bg-gray-100" data-aos="fade-up">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="space-y-1">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">Planos</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Escolha o plano ideal para o seu negócio
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Planos flexíveis que se adaptam à sua operação.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  popular,
}: {
  name: string
  price: string
  description: string
  features: string[]
  popular: boolean
}) {
  return (
    <div className="flex flex-col rounded-lg border bg-white shadow-sm relative h-full">
      {popular && (
        <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg text-xs font-medium">
          Mais popular
        </div>
      )}
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="mt-3 flex items-baseline text-gray-900">
          <span className="text-2xl font-extrabold tracking-tight">{price}</span>
          <span className="ml-1 text-base font-semibold">/mês</span>
        </div>
        <p className="mt-3 text-muted-foreground text-sm">{description}</p>
        <ul className="mt-5 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 pt-0 mt-auto">
        <Button className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white text-sm">Contratar agora</Button>
      </div>
    </div>
  )
}
