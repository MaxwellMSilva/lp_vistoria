"use client"

import axios from "axios"
import { useState } from "react"
import { IMaskInput } from "react-imask"
import { Building, Phone, MapPin, Map, Hash, Home, Landmark } from "lucide-react"

export function CadastroComponent() {
  const [formData, setFormData] = useState({
    cnpj: "",
    razao_social: "",
    telefone: "",
    cep: "",
    rua: "",
    numero_residencial: "",
    bairro: "",
    complemento: "",
    g_cidade_id: "",
  })

  const [loading, setLoading] = useState(false)
  const [showBuscar, setShowBuscar] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === "cnpj") {
      const cnpjLimpo = value.replace(/\D/g, "")
      setShowBuscar(cnpjLimpo.length === 14)
    }
  }

  const buscarDadosCNPJ = async () => {
    const cnpj = formData.cnpj.replace(/\D/g, "")
    if (cnpj.length !== 14) return

    setLoading(true)
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
      const data = response.data

      setFormData((prev) => ({
        ...prev,
        razao_social: data.razao_social || prev.razao_social,
        cep: data.cep || prev.cep,
        rua: data.logradouro || prev.rua,
        numero_residencial: data.numero || prev.numero_residencial,
        bairro: data.bairro || prev.bairro,
        complemento: data.complemento || prev.complemento,
      }))
    } catch (error) {
      alert("Erro ao buscar CNPJ. Verifique se ele é válido.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const obrigatorios = ["cnpj", "razao_social", "telefone", "cep", "rua", "numero_residencial", "bairro"]
    const vazio = obrigatorios.find((campo) => !formData[campo as keyof typeof formData])
    if (vazio) return alert(`Preencha o campo obrigatório: ${vazio.replace("_", " ")}`)
    console.log("Dados do formulário:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Cadastro de Empresa
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* CNPJ */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CNPJ</label>
            <div className="relative">
              <Hash className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <IMaskInput
                mask="00.000.000/0000-00"
                value={formData.cnpj}
                onAccept={(value) => {
                  setFormData((prev) => ({ ...prev, cnpj: value }))
                  setShowBuscar(value.replace(/\D/g, "").length === 14)
                }}
                placeholder="00.000.000/0000-00"
                className="pl-10 w-full py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Botão de buscar */}
          {showBuscar && (
            <div className="md:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={buscarDadosCNPJ}
                className="cursor-pointer text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                disabled={loading}
              >
                {loading ? "Buscando..." : "🔍 Buscar dados da empresa"}
              </button>
            </div>
          )}

          {/* Razão Social */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Razão Social</label>
            <div className="relative">
              <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="razao_social"
                placeholder="Empresa LTDA"
                value={formData.razao_social}
                onChange={handleChange}
                required
                className="pl-10 w-full py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <IMaskInput
                mask="(00) 00000-0000"
                value={formData.telefone}
                onAccept={(value) => setFormData((prev) => ({ ...prev, telefone: value }))}
                placeholder="(00) 00000-0000"
                required
                className="pl-10 w-full py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* CEP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CEP</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <IMaskInput
                mask="00000-000"
                value={formData.cep}
                onAccept={(value) => setFormData((prev) => ({ ...prev, cep: value }))}
                placeholder="00000-000"
                required
                className="pl-10 w-full py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Rua */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rua</label>
            <div className="relative">
              <Map className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="rua"
                placeholder="Nome da Rua"
                value={formData.rua}
                onChange={handleChange}
                required
                className="pl-10 w-full py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Número Residencial */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número</label>
            <div className="relative">
              <Home className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="numero_residencial"
                placeholder="123"
                value={formData.numero_residencial}
                onChange={handleChange}
                required
                className="pl-10 w-full py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Bairro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bairro</label>
            <div className="relative">
              <Landmark className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="bairro"
                placeholder="Centro"
                value={formData.bairro}
                onChange={handleChange}
                required
                className="pl-10 w-full py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Complemento (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Complemento</label>
            <input
              type="text"
              name="complemento"
              placeholder="Sala, Apto, etc."
              value={formData.complemento}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* Cidade ID (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID da Cidade</label>
            <input
              type="text"
              name="g_cidade_id"
              placeholder="ID"
              value={formData.g_cidade_id}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* Botão de envio */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Cadastrar Empresa
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
