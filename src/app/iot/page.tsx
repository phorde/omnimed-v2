'use client'

import { useState, useMemo } from 'react'
import { Calculator, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

// Dados dos medicamentos IOT
const medicamentosIOT = [
  {
    id: 'fentanil',
    nome: 'Fentanil',
    categoria: 'Pré-medicação',
    concentracao: 0.05, // mg/mL
    dose: 0.003, // mg/kg
    formula: '3 mcg/kg',
    notas: 'Atenua resposta simpática. Útil em HIC e doença CV.',
    preferido: ['hic', 'cv']
  },
  {
    id: 'etomidato',
    nome: 'Etomidato',
    categoria: 'Indução',
    concentracao: 2, // mg/mL
    dose: 0.3, // mg/kg
    doseChoque: 0.15, // mg/kg em choque
    formula: '0.3 mg/kg',
    formulaChoque: '0.15 mg/kg em choque',
    notas: 'Hemodinamicamente estável. Ideal para emergência.',
    preferido: ['choque', 'hic', 'cv']
  },
  {
    id: 'cetamina',
    nome: 'Cetamina',
    categoria: 'Indução',
    concentracao: 50, // mg/mL
    dose: 1.5, // mg/kg
    doseChoque: 1.0, // mg/kg em choque
    formula: '1-2 mg/kg',
    formulaChoque: '1 mg/kg em choque',
    notas: 'Broncodilatador. Preserva drive respiratório.',
    preferido: ['choque', 'bronco'],
    cuidado: ['hic']
  },
  {
    id: 'propofol',
    nome: 'Propofol',
    categoria: 'Indução',
    concentracao: 10, // mg/mL
    dose: 1.5, // mg/kg
    formula: '1.5-3 mg/kg',
    notas: 'Rápido. Causa hipotensão. Bom para broncoespasmo.',
    contraindicado: ['choque'],
    preferido: ['bronco', 'epilepsia']
  },
  {
    id: 'midazolam',
    nome: 'Midazolam',
    categoria: 'Indução',
    concentracao: 5, // mg/mL
    dose: 0.2, // mg/kg
    formula: '0.2-0.3 mg/kg',
    notas: 'Hipotensão significativa. Início lento.',
    contraindicado: ['choque']
  },
  {
    id: 'succinilcolina',
    nome: 'Succinilcolina',
    categoria: 'Bloqueio Neuromuscular',
    concentracao: 10, // mg/mL
    dose: 1.5, // mg/kg
    formula: '1.5 mg/kg',
    notas: 'Início 45-60s, duração 6-10min. Agente de escolha.',
    contraindicado: ['hipercalemia']
  },
  {
    id: 'rocuronio',
    nome: 'Rocurônio',
    categoria: 'Bloqueio Neuromuscular',
    concentracao: 10, // mg/mL
    dose: 1.5, // mg/kg
    formula: '1.5 mg/kg',
    notas: 'Início 45-60s, duração ~45min. Reversível com Sugammadex.',
    preferido: ['hipercalemia']
  }
]

type Contexto = 'choque' | 'hipercalemia' | 'bronco' | 'hic' | 'cv' | 'epilepsia'

interface ContextoInfo {
  id: Contexto
  label: string
}

const contextos: ContextoInfo[] = [
  { id: 'choque', label: 'Choque / Instabilidade Hemodinâmica' },
  { id: 'hipercalemia', label: 'Risco de Hipercalemia' },
  { id: 'bronco', label: 'Broncoespasmo / Asma' },
  { id: 'hic', label: 'Suspeita de HIC / TCE' },
  { id: 'cv', label: 'Doença Cardiovascular' },
  { id: 'epilepsia', label: 'Status Epiléptico' }
]

export default function CalculadoraIOT() {
  const [peso, setPeso] = useState('70')
  const [contextosAtivos, setContextosAtivos] = useState<Contexto[]>([])
  
  const pesoNum = parseFloat(peso) || 0
  const pesoValido = pesoNum >= 1 && pesoNum <= 200
  
  const toggleContexto = (contexto: Contexto) => {
    setContextosAtivos(prev => 
      prev.includes(contexto)
        ? prev.filter(c => c !== contexto)
        : [...prev, contexto]
    )
  }
  
  const getStatusMedicamento = (med: any) => {
    const contraindicado = med.contraindicado?.some((c: string) => contextosAtivos.includes(c as Contexto))
    const preferido = med.preferido?.some((c: string) => contextosAtivos.includes(c as Contexto))
    const cuidado = med.cuidado?.some((c: string) => contextosAtivos.includes(c as Contexto))
    
    if (contraindicado) return { status: 'contraindicado', texto: 'Contraindicado', cor: 'red' }
    if (preferido) return { status: 'preferido', texto: 'Recomendado', cor: 'green' }
    if (cuidado) return { status: 'cuidado', texto: 'Usar com Cautela', cor: 'yellow' }
    return { status: 'neutro', texto: '', cor: 'gray' }
  }
  
  const calcularVolume = (med: any) => {
    if (!pesoValido) return 0
    
    let doseUsar = med.dose
    if (med.doseChoque && contextosAtivos.includes('choque')) {
      doseUsar = med.doseChoque
    }
    
    const doseMg = pesoNum * doseUsar
    return doseMg / med.concentracao
  }
  
  const categorias = [...new Set(medicamentosIOT.map(m => m.categoria))]
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center items-center space-x-3 mb-4">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Calculadora IOT</h1>
        </div>
        <p className="text-gray-600">Sequência Rápida de Intubação</p>
      </div>
      
      {/* Peso */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex items-center justify-center space-x-4">
          <label className="text-lg font-semibold text-gray-700">Peso do Paciente:</label>
          <div className="relative">
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              className={`w-24 px-3 py-2 text-center text-xl font-bold border rounded-md focus:outline-none focus:ring-2 ${
                pesoValido 
                  ? 'border-gray-300 focus:ring-blue-500' 
                  : 'border-red-300 focus:ring-red-500 bg-red-50'
              }`}
              placeholder="70"
            />
            <span className="ml-2 text-lg font-semibold text-gray-600">kg</span>
            {!pesoValido && (
              <p className="absolute top-full left-0 mt-1 text-sm text-red-600">
                Entre 1-200 kg
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Contextos Clínicos */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contexto Clínico (Opcional)</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {contextos.map((ctx) => (
            <label key={ctx.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={contextosAtivos.includes(ctx.id)}
                onChange={() => toggleContexto(ctx.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{ctx.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Medicamentos */}
      <div className="space-y-6">
        {categorias.map((categoria) => (
          <div key={categoria} className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
              {categoria}
            </h3>
            <div className="space-y-4">
              {medicamentosIOT
                .filter(med => med.categoria === categoria)
                .map((med) => {
                  const status = getStatusMedicamento(med)
                  const volume = calcularVolume(med)
                  const formula = (med.doseChoque && contextosAtivos.includes('choque')) 
                    ? med.formulaChoque 
                    : med.formula
                  
                  return (
                    <div key={med.id} className={`p-4 rounded-lg border-l-4 ${
                      status.cor === 'red' ? 'border-red-500 bg-red-50' :
                      status.cor === 'green' ? 'border-green-500 bg-green-50' :
                      status.cor === 'yellow' ? 'border-yellow-500 bg-yellow-50' :
                      'border-gray-300 bg-gray-50'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{med.nome}</h4>
                            {status.texto && (
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                status.cor === 'red' ? 'bg-red-100 text-red-800' :
                                status.cor === 'green' ? 'bg-green-100 text-green-800' :
                                status.cor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {status.status === 'contraindicado' && <XCircle className="w-3 h-3 mr-1" />}
                                {status.status === 'preferido' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {status.status === 'cuidado' && <AlertTriangle className="w-3 h-3 mr-1" />}
                                {status.texto}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{med.notas}</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">{formula}</div>
                          <div className={`text-lg font-bold ${
                            status.status === 'contraindicado' 
                              ? 'text-gray-400' 
                              : 'text-blue-600'
                          }`}>
                            {status.status === 'contraindicado' 
                              ? '---' 
                              : `${volume.toFixed(1)} mL`
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Aviso:</strong> Esta ferramenta é apenas para auxílio educacional. 
          Sempre consulte protocolos institucionais e individualize para cada paciente.
        </p>
      </div>
    </div>
  )
}