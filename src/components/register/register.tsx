"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { UserPlus, Building, MapPin, Map, Hash, Home, Landmark, ChevronDown, Search, CheckCircle } from "lucide-react"
import Link from "next/link"
import { IMaskInput } from "react-imask"
import axios from "axios"

interface Cidade {
  id: number
  descricao: string
  g_estado: {
    id: number
    descricao: string
    uf_descricao: string
  }
}

export default function CadastroPage() {
  const router = useRouter()
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
    cidade_nome: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showBuscarCNPJ, setShowBuscarCNPJ] = useState(false)
  const [loadingCNPJ, setLoadingCNPJ] = useState(false)

  // Estados para as cidades
  const [todasCidades, setTodasCidades] = useState<Cidade[]>([])
  const [cidadesFiltradas, setCidadesFiltradas] = useState<Cidade[]>([])
  const [loadingCidades, setLoadingCidades] = useState(true)
  const [cidadeInput, setCidadeInput] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedCidade, setSelectedCidade] = useState<Cidade | null>(null)

  const cidadeInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Carregar todas as cidades quando o componente montar
  useEffect(() => {
    const carregarCidades = async () => {
      try {
        const response = await axios.get("http://145.223.121.165:3010/api/v1/g_cidades?page=all", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        })
        if (response.data.success) {
          setTodasCidades(response.data.data.items)
          setCidadesFiltradas(response.data.data.items)
        }
      } catch (error) {
        console.error("Erro ao carregar cidades:", error)
        setError("Erro ao carregar lista de cidades. Verifique a autenticação.")
      } finally {
        setLoadingCidades(false)
      }
    }

    carregarCidades()
  }, [])

  // Filtrar cidades conforme o usuário digita
  useEffect(() => {
    if (cidadeInput.length === 0) {
      setCidadesFiltradas(todasCidades)
    } else {
      const filtradas = todasCidades.filter(
        (cidade) =>
          cidade.descricao.toLowerCase().includes(cidadeInput.toLowerCase()) ||
          cidade.g_estado.descricao.toLowerCase().includes(cidadeInput.toLowerCase()) ||
          cidade.g_estado.uf_descricao.toLowerCase().includes(cidadeInput.toLowerCase()),
      )
      setCidadesFiltradas(filtradas)
    }
  }, [cidadeInput, todasCidades])

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        cidadeInputRef.current &&
        !cidadeInputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCidadeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCidadeInput(value)
    setShowDropdown(true)

    // Limpar seleção anterior se o usuário está digitando algo diferente
    if (selectedCidade && value !== `${selectedCidade.descricao} - ${selectedCidade.g_estado.uf_descricao}`) {
      setSelectedCidade(null)
      setFormData((prev) => ({
        ...prev,
        g_cidade_id: "",
        cidade_nome: value,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        cidade_nome: value,
      }))
    }
  }

  const handleCidadeSelect = (cidade: Cidade) => {
    setSelectedCidade(cidade)
    setCidadeInput(`${cidade.descricao} - ${cidade.g_estado.uf_descricao}`)
    setFormData((prev) => ({
      ...prev,
      g_cidade_id: cidade.id.toString(),
      cidade_nome: cidade.descricao,
    }))
    setShowDropdown(false)
  }

  const handleCidadeInputFocus = () => {
    if (!loadingCidades) {
      setShowDropdown(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === "cnpj") {
      const cnpjLimpo = value.replace(/\D/g, "")
      setShowBuscarCNPJ(cnpjLimpo.length === 14)
    }
  }

  const buscarDadosCNPJ = async () => {
    const cnpj = formData.cnpj.replace(/\D/g, "")
    if (cnpj.length !== 14) return

    setLoadingCNPJ(true)
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
      setError("Erro ao buscar CNPJ. Verifique se ele é válido.")
      console.error(error)
    } finally {
      setLoadingCNPJ(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação dos campos obrigatórios
    const camposObrigatorios = [
      { campo: "cnpj", nome: "CNPJ" },
      { campo: "razao_social", nome: "Razão Social" },
      { campo: "telefone", nome: "Telefone" },
      { campo: "cep", nome: "CEP" },
      { campo: "rua", nome: "Rua" },
      { campo: "numero_residencial", nome: "Número" },
      { campo: "bairro", nome: "Bairro" },
      { campo: "cidade_nome", nome: "Cidade" },
    ]

    for (const { campo, nome } of camposObrigatorios) {
      if (!formData[campo as keyof typeof formData]) {
        setError(`O campo ${nome} é obrigatório.`)
        return
      }
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({
          cnpj: "",
          razao_social: "",
          telefone: "",
          cep: "",
          rua: "",
          numero_residencial: "",
          bairro: "",
          complemento: "",
          g_cidade_id: "",
          cidade_nome: "",
        })
        setCidadeInput("")
        setSelectedCidade(null)
      } else {
        const errorData = await res.json()
        setError(errorData?.message || "Erro ao cadastrar usuário.")
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header com logo e título */}
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg mb-6 transform hover:scale-105 transition-transform duration-200">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-3">
            Cadastro de Empresa
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Preencha os dados abaixo para criar sua conta no sistema de vistorias
          </p>
        </div>

        {/* Card principal */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="p-8 md:p-10">
            {success ? (
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg mb-6">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Cadastro realizado com sucesso!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Sua conta foi criada com sucesso. Agora você pode fazer login no sistema e começar a usar nossas
                  funcionalidades.
                </p>
                <Link
                  href="/users/login"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Ir para o login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Seção de Dados da Empresa */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Dados da Empresa</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CNPJ */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        CNPJ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Hash className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        <IMaskInput
                          mask="00.000.000/0000-00"
                          value={formData.cnpj}
                          onAccept={(value) => {
                            setFormData((prev) => ({ ...prev, cnpj: value }))
                            setShowBuscarCNPJ(value.replace(/\D/g, "").length === 14)
                          }}
                          placeholder="00.000.000/0000-00"
                          className="pl-12 w-full py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                          required
                        />
                      </div>
                      {showBuscarCNPJ && (
                        <div className="mt-3 flex justify-end">
                          <button
                            type="button"
                            onClick={buscarDadosCNPJ}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                            disabled={loadingCNPJ}
                          >
                            {loadingCNPJ ? (
                              <>
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                Buscando...
                              </>
                            ) : (
                              <>
                                <Search className="h-4 w-4" />
                                Buscar dados da empresa
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Razão Social */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Razão Social <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Building className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        <input
                          type="text"
                          name="razao_social"
                          placeholder="Nome da sua empresa"
                          value={formData.razao_social}
                          onChange={handleChange}
                          className="pl-12 w-full py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                          required
                        />
                      </div>
                    </div>

                    {/* Telefone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Telefone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <IMaskInput
                          mask="(00) 00000-0000"
                          value={formData.telefone}
                          onAccept={(value) => setFormData((prev) => ({ ...prev, telefone: value }))}
                          placeholder="(00) 00000-0000"
                          className="pl-4 w-full py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                          required
                        />
                      </div>
                    </div>

                    {/* CEP */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        CEP <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        <IMaskInput
                          mask="00000-000"
                          value={formData.cep}
                          onAccept={(value) => setFormData((prev) => ({ ...prev, cep: value }))}
                          placeholder="00000-000"
                          className="pl-12 w-full py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                          required
                        />
                      </div>
                    </div>

                    {/* Rua */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Rua <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Map className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        <input
                          type="text"
                          name="rua"
                          placeholder="Nome da rua"
                          value={formData.rua}
                          onChange={handleChange}
                          className="pl-12 w-full py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                          required
                        />
                      </div>
                    </div>

                    {/* Número */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Número <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Home className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        <input
                          type="text"
                          name="numero_residencial"
                          placeholder="123"
                          value={formData.numero_residencial}
                          onChange={handleChange}
                          className="pl-12 w-full py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                          required
                        />
                      </div>
                    </div>

                    {/* Bairro */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Bairro <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Landmark className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        <input
                          type="text"
                          name="bairro"
                          placeholder="Nome do bairro"
                          value={formData.bairro}
                          onChange={handleChange}
                          className="pl-12 w-full py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                          required
                        />
                      </div>
                    </div>

                    {/* Complemento */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Complemento
                      </label>
                      <input
                        type="text"
                        name="complemento"
                        placeholder="Sala, Apto, etc. (opcional)"
                        value={formData.complemento}
                        onChange={handleChange}
                        className="w-full py-3.5 px-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                      />
                    </div>

                    {/* Cidade */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Cidade <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        <input
                          ref={cidadeInputRef}
                          type="text"
                          placeholder={loadingCidades ? "Carregando cidades..." : "Digite ou selecione uma cidade..."}
                          value={cidadeInput}
                          onChange={handleCidadeInputChange}
                          onFocus={handleCidadeInputFocus}
                          disabled={loadingCidades}
                          className="pl-12 pr-12 w-full py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-800 dark:text-gray-200 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 disabled:opacity-50"
                          required
                        />
                        <ChevronDown
                          className={`absolute right-4 top-3.5 h-5 w-5 text-gray-400 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
                        />
                      </div>

                      {/* Dropdown de cidades */}
                      {showDropdown && !loadingCidades && (
                        <div
                          ref={dropdownRef}
                          className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-auto"
                        >
                          {cidadesFiltradas.length > 0 ? (
                            cidadesFiltradas.map((cidade) => (
                              <div
                                key={cidade.id}
                                onClick={() => handleCidadeSelect(cidade)}
                                className="px-4 py-3 hover:bg-red-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors duration-150"
                              >
                                <div className="font-semibold text-gray-900 dark:text-white">{cidade.descricao}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {cidade.g_estado.descricao} - {cidade.g_estado.uf_descricao}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm text-center">
                              {cidadeInput ? "Nenhuma cidade encontrada" : "Digite para buscar cidades"}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mensagem de erro */}
                {error && (
                  <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botão de submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Cadastrando...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        Cadastrar Empresa
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 md:px-10 py-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Já tem uma conta?{" "}
              <Link
                href="/users/login"
                className="font-semibold text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
              >
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
