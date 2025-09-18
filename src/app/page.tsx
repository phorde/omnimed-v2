import Link from 'next/link'
import { Calculator, Activity, Stethoscope } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Stethoscope className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          OmniMed v2
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Calculadoras médicas rápidas e confiáveis para profissionais de saúde.
          Ferramentas otimizadas para plantão e emergência.
        </p>
      </div>

      {/* Calculadoras */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link href="/iot" className="group">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow group-hover:border-blue-300">
            <div className="flex items-center space-x-4 mb-4">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Calculadora IOT</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Sequência Rápida de Intubação com cálculo automático de doses baseado no peso e contexto clínico do paciente.
            </p>
            <div className="text-blue-600 font-semibold group-hover:text-blue-700">
              Acessar Calculadora →
            </div>
          </div>
        </Link>

        <Link href="/dva" className="group">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow group-hover:border-blue-300">
            <div className="flex items-center space-x-4 mb-4">
              <Activity className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Calculadora DVA</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Drogas Vasoativas com diluições padronizadas e cálculo de vazão para infusão contínua em UTI.
            </p>
            <div className="text-green-600 font-semibold group-hover:text-green-700">
              Acessar Calculadora →
            </div>
          </div>
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Aviso Médico</h3>
              <p className="mt-1 text-sm text-yellow-700">
                Esta ferramenta destina-se exclusivamente a fins educacionais e de auxílio à decisão clínica. 
                Não substitui o julgamento clínico profissional. As doses devem sempre ser individualizadas 
                e protocolos institucionais devem ser consultados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}