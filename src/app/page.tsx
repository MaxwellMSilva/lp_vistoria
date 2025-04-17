import Header from '@/components/header'
import Footer from "@/components/footer"
import Hero from "@/components/main/hero"
import Services from "@/components/main/services"
import App from "@/components/main/app"
import Contact from "@/components/main/contact"
import WhatsAppButton from '@/components/whatsapp-button'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <Services />
        <App />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
