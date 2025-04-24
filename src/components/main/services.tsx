import { CheckCircle, Shield, Clock } from "lucide-react"

export default function Services() {
  return (
    <section id="servicos" className="py-12 md:py-16 bg-gray-50">
      <div className="container px-4 mx-auto max-w-6xl" data-aos="fade-up">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Oferecemos soluções completas para vistoria veicular, garantindo segurança e conformidade para seu veículo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-primary-foreground p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Vistoria Cautelar</h3>
            <p className="text-muted-foreground">
              Verificação completa do histórico do veículo, incluindo documentação, chassi e motor.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-primary-foreground p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Vistoria de Transferência</h3>
            <p className="text-muted-foreground">
              Documentação completa para transferência de propriedade do veículo com segurança.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-primary-foreground p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Vistoria Expressa</h3>
            <p className="text-muted-foreground">
              Serviço rápido e eficiente para quem precisa de uma vistoria com urgência.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
