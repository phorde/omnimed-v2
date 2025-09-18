'use client'

import { useState } from 'react'
import { Activity } from 'lucide-react'

// Dados dos medicamentos DVA
const medicamentosDVA = [
  {
    id: 'noradrenalina_simples',
    nome: 'Noradrenalina Simples',
    doseMin: 0.01,
    doseMax: 3.3,
    doseInicial: 0.76,
    unidade: 'mcg/kg/min',
    diluicao: 'Noradrenalina (4mg/4mL) 4mL + 96mL SG5%',
    concentracao: 40, // mcg/mL
    equivalencia: '1mL = 40mcg',
    categoria: 'Vasopressor',
    cor: 'blue'
  },
  {
    id: 'noradrenalina_concentrada',
    nome: 'Noradrenalina Concentrada',
    doseMin: 0.01,
    doseMax: 3.3,
    doseInicial: 1.66,
    unidade: 'mcg/kg/min',
    diluicao: 'Noradrenalina (4mg/4mL) 20mL + 80mL SG5%',
    concentracao: 200, // mcg/mL
    equivalencia: '1mL = 200mcg',
    categoria: 'Vasopressor',
    cor: 'blue'
  },
  {
    id: 'adrenalina',
    nome: 'Adrenalina',
    doseMin: 0.1,
    doseMax: 2.0,
    doseInicial: 1.05,
    unidade: 'mcg/kg/min',
    diluicao: 'Adrenalina (1mg/mL) 10mL + 90mL SF0.9%',
    concentracao: 100, // mcg/mL
    equivalencia: '1mL = 100mcg',
    categoria: 'Vasopressor',
    cor: 'blue'
  },
  {
    id: 'vasopressina',
    nome: 'Vasopressina',
    doseMin: 0.01,
    doseMax: 0.04,
    doseInicial: 0.025,
    unidade: 'UI/min',
    diluicao: 'Vasopressina (20UI/mL) 2mL + 98mL SG5%',
    concentracao: 0.4, // UI/mL
    equivalencia: '1mL = 0.4UI',
    categoria: 'Vasopressor',
    cor: 'purple',
    doseFixa: true
  },
  {
    id: 'dobutamina',
    nome: 'Dobutamina',
    doseMin: 2,
    doseMax: 20,
    doseInicial: 11.0,
    unidade: 'mcg/kg/min',
    diluicao: 'Dobutamina (250mg/20mL) 60mL + 190mL SF0.9%',
    concentracao: 3000, // mcg/mL
    equivalencia: '1mL = 3000mcg',
    categoria: 'Inotrópico',
    cor: 'green'
  },
  {
    id: 'milrinona',
    nome: 'Milrinona',
    doseMin: 0.375,
    doseMax: 0.75,
    doseInicial: 0.56,
    unidade: 'mcg/kg/min',
    diluicao: 'Milrinona (1mg/mL) 20mL + 80mL SG5%',
    concentracao: 200, // mcg/mL
    equivalencia: '1mL = 200mcg',
    categoria: 'Inotrópico',
    cor: 'green'
  },
  {
    id: 'dopamina_dopa',
    nome: 'Dopamina (Dose Dopa)',
    doseMin: 1,
    doseMax: 5,
    doseInicial: 3.0,
    unidade: 'mcg/kg/min',
    diluicao: 'Dopamina (50mg/10mL) 50mL + 200mL SF0.9%',
    concentracao: 1000, // mcg/mL
    equivalencia: '1mL = 1000mcg',
    categoria: 'Dopamina',
    cor: 'orange',
    subtipo: '1-5 mcg/kg/min (efeito dopaminérgico)'
  },
  {
    id: 'dopamina_beta',
    nome: 'Dopamina (Dose Beta)',
    doseMin: 5,
    doseMax: 15,
    doseInicial: 10.0,
    unidade: 'mcg/kg/min',
    diluicao: 'Dopamina (50mg/10mL) 50mL + 200mL SF0.9%',
    concentracao: 1000, // mcg/mL
    equivalencia: '1mL = 1000mcg',
    categoria: 'Dopamina',
    cor: 'teal',
    subtipo: '5-15 mcg/kg/min (efeito beta-adrenérgico)'
  },
  {
    id: 'dopamina_alfa',
    nome: 'Dopamina (Dose Alfa)',
    doseMin: 15,
    doseMax: 30,
    doseInicial: 22.5,
    unidade: 'mcg/kg/min',
    diluicao: 'Dopamina (50mg/10mL) 100mL + 150mL SF0.9%',
    concentracao: 2000, // mcg/mL
    equivalencia: '1mL = 2000mcg',
    categoria: 'Dopamina',
    cor: 'red',
    subtipo: '15-30 mcg/kg/min (efeito alfa-adrenérgico)'
  },
  {
    id: 'nitroprussiato',
    nome: 'Nitroprussiato de Sódio',
    doseMin: 0.1,
    doseMax: 10,
    doseInicial: 5.05,
    unidade: 'mcg/kg/min',
    diluicao: 'Nitroprussiato (50mg/2mL) 2mL + 248mL SG5%',
    concentracao: 200, // mcg/mL
    equivalencia: '1mL = 200mcg',
    categoria: 'Vasodilatador',
    cor: 'pink'
  },
  {
    id: 'nitroglicerina',
    nome: 'Nitroglicerina',
    doseMin: 5,
    doseMax: 100,
    doseInicial: 53,
    unidade: 'mcg/min',
    diluicao: 'Nitroglicerina (5mg/mL) 10mL + 240mL SF0.9%',
    concentracao: 200, // mcg/mL
    equivalencia: '1mL = 200mcg',
    categoria: 'Vasodilatador',
    cor: 'pink',
    doseFixa: true
  }
]

const cores = {
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
  green: 'bg-green-50 border-green-200 text-green-800',
  orange: 'bg-orange-50 border-orange-200 text-orange-800',
  teal: 'bg-teal-50 border-teal-200 text-teal-800',
  red: 'bg-red-50 border-red-200 text-red-800',
  purple: 'bg-purple-50 border-purple-200 text-purple-800',
  pink: 'bg-pink-50 border-pink-200 text-pink-800'
}

export default function CalculadoraDVA() {
  const [peso, setPeso] = useState('75')
  const [doses, setDoses] = useState<{[key: string]: number}>({})
  
  const pesoNum = parseFloat(peso) || 0
  const pesoValido = pesoNum >= 1 && pesoNum <= 200
  
  const getDose = (medId: string, doseInicial: number) => {
    return doses[medId] ?? doseInicial
  }
  
  const calcularVazao = (med: any) => {
    if (!pesoValido) return 0
    
    const dose = getDose(med.id, med.doseInicial)
    
    if (med.doseFixa) {
      // Dose fixa (Vasopressina, Nitroglicerina)
      return (dose * 60) / med.concentracao
    } else {
      // Dose por kg
      return (dose * pesoNum * 60) / med.concentracao
    }
  }
  
  const formatDose = (valor: number) => {
    if (valor < 0.1) return valor.toFixed(3)
    if (valor < 10) return valor.toFixed(2)
    return valor.toFixed(1)
  }
  
  const getStep = (max: number) => {
    if (max <= 1) return 0.001
    if (max <= 10) return 0.01
    return 0.1
  }
  
  const categorias = [...new Set(medicamentosDVA.map(m => m.categoria))]
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center items-center space-x-3 mb-4">
          <Activity className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Calculadora DVA</h1>
        </div>
        <p className="text-gray-600">Drogas Vasoativas - Diluições e Infusões Contínuas</p>
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
                  ? 'border-gray-300 focus:ring-green-500' 
                  : 'border-red-300 focus:ring-red-500 bg-red-50'
              }`}
              placeholder="75"
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
      
      {/* Medicamentos por categoria */}
      <div className="space-y-6">
        {categorias.map((categoria) => (
          <div key={categoria} className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
              {categoria}
            </h3>
            <div className="space-y-4">
              {medicamentosDVA
                .filter(med => med.categoria === categoria)
                .map((med) => {
                  const dose = getDose(med.id, med.doseInicial)
                  const vazao = calcularVazao(med)
                  
                  return (
                    <div key={med.id} className={`p-4 rounded-lg border ${cores[med.cor as keyof typeof cores]}`}>
                      {/* Cabeçalho */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{med.nome}</h4>
                          {med.subtipo && (
                            <p className="text-sm opacity-75">{med.subtipo}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            {formatDose(med.doseMin)} - {formatDose(med.doseMax)} {med.unidade}
                          </div>
                        </div>
                      </div>
                      
                      {/* Slider e dose atual */}
                      <div className="flex items-center space-x-4 mb-3">
                        <input
                          type="range"
                          min={med.doseMin}
                          max={med.doseMax}
                          step={getStep(med.doseMax)}
                          value={dose}
                          onChange={(e) => setDoses(prev => ({
                            ...prev,
                            [med.id]: parseFloat(e.target.value)
                          }))}
                          className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-right min-w-[80px]">
                          <div className="font-bold text-lg">
                            {formatDose(dose)}
                          </div>
                          <div className="text-xs text-gray-600">
                            {med.unidade}
                          </div>
                        </div>
                      </div>
                      
                      {/* Diluição e vazão */}
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Diluição:</span> {med.diluicao}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Equivale:</span> {med.equivalencia}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Vazão:</span>{' '}
                          <span className="font-bold text-lg text-blue-600">
                            {Math.round(vazao)} mL/h
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Informações importantes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Informações Importantes</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Vasopressina e Nitroglicerina têm doses fixas (independem do peso)</li>
          <li>• Dopamina: efeitos dose-dependentes (dopa 1-5, beta 5-15, alfa 15-30)</li>
          <li>• Sempre usar acesso central para vasopressores</li>
          <li>• Monitorização hemodinâmica contínua obrigatória</li>
          <li>• Consultar sempre protocolos institucionais</li>
        </ul>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Aviso Médico:</strong> Esta ferramenta é apenas para auxílio educacional. 
          As doses devem ser individualizadas para cada paciente. Sempre consulte protocolos institucionais.
        </p>
      </div>
    </div>
  )
}