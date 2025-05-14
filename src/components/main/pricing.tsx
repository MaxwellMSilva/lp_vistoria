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
    <section id="planos" className="w-full py-8 md:py-16 lg:py-24 bg-gray-100" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-600">Planos</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Escolha o plano ideal para o seu negócio
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Oferecemos planos flexíveis que se adaptam ao tamanho da sua operação
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
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
        <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
          Mais popular
        </div>
      )}
      <div className="p-4 md:p-6 flex-grow">
        <h3 className="text-xl md:text-2xl font-bold">{name}</h3>
        <div className="mt-4 flex items-baseline text-gray-900">
          <span className="text-3xl md:text-4xl font-extrabold tracking-tight">{price}</span>
          <span className="ml-1 text-lg md:text-xl font-semibold">/mês</span>
        </div>
        <p className="mt-4 text-muted-foreground text-sm md:text-base">{description}</p>
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 md:p-6 pt-0 mt-auto">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Contratar agora</Button>
      </div>
    </div>
  )
}
