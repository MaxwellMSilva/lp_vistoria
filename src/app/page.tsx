import Header from '@/components/header'
import Footer from "@/components/footer"
import Hero from "@/components/main/hero"
import App from "@/components/main/app"
import Contact from "@/components/main/contact"
import WhatsAppButton from '@/components/whatsapp-button'
import Features from '../components/main/features'
import Pricing from '@/components/main/pricing'
import AdminPanel from '@/components/main/admin'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <Features/>
        <Pricing />
        <AdminPanel />
        <App />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
