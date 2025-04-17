import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr"

export default function Contact() {
  return (
    <section id="contato" className="py-12 md:py-16">
      <div className="container px-4 mx-auto max-w-6xl" data-aos="fade-up">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Estamos prontos para atender você. Entre em contato via WhatsApp ou preencha o formulário abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Envie uma Mensagem</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome:
                  </label>
                  <input
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Telefone:
                  </label>
                  <input
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensagem:
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Como podemos ajudar?"
                />
              </div>
              <Button className="cursor-pointer w-full bg-primary-foreground hover:bg-red-800 text-white">Enviar Mensagem</Button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold mb-4">Contato Direto</h3>
              <p className="text-muted-foreground mb-6">
                Prefere falar diretamente conosco? Entre em contato via WhatsApp para um atendimento rápido.
              </p>

              <Link
                href="https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20informações%20sobre%20vistoria%20veicular."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                  <WhatsappLogo/>
                  Falar via WhatsApp
                </Button>
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-8">
              <h4 className="font-bold mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary-foreground"/>
                Horário de Atendimento
              </h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span>08:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábado:</span>
                  <span>08:00 - 12:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingo:</span>
                  <span>Fechado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
