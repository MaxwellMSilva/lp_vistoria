import Image from "next/image"

import imgLogo from "../../../public/ChatGPT Image 22 de abr. de 2025, 11_56_04.png"

export default function About() {
  return (
    <section id="sobre" className="py-12 md:py-16 bg-gray-50">
      <div className="container px-4 mx-auto max-w-6xl" data-aos="fade-up">
        <div className="flex-1 order-2 md:order-1 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre a FicEnterprise</h2>
            <Image
                src={imgLogo}
                width={300}
                height={600}
                alt="Aplicativo FicEnterprise"
                className="mx-auto rounded-xl shadow-xl"
            />
        </div>
        <div className="text-center mt-10">
            <p className="text-shadow-muted-foreground text-lg max-w-[700px] mx-auto">
                Somos uma empresa especializada em serviços de vistoria veicular, oferecendo avaliações confiáveis e precisas para pessoas físicas e jurídicas. 
            </p>
            <p className="text-shadow-muted-foreground text-lg max-w-[700px] mx-auto">
                Nossa missão é garantir segurança, transparência e confiança no processo de compra, venda ou avaliação de um veículo.
                Com uma equipe qualificada e equipamentos modernos, entregamos avaliações rápidas, profissionais e imparciais, sempre com foco total no cliente.
            </p>
        </div>
      </div>
    </section>
  )
}
