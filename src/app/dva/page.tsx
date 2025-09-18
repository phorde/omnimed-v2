'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Activity } from 'lucide-react'

interface MedicamentoDVA {
  id: string
  nome: string
  categoria: string
  concentracao: number
  unidade: string
  doseMinima: number
  doseMaxima: number
  doseInicial: number
  doseFixa?: boolean
}

const medicamentosDVA: MedicamentoDVA[] = [
  {
    id: 'noradrenalina-simples',
    nome: 'Noradrenalina Simples',
    categoria: 'Vasopressor',
    concentracao: 40,
    unidade: 'mcg/kg/min',
    doseMinima: 0.01,
    doseMaxima: 3.3,
    doseInicial: 0.76
  },
  {
    id: 'noradrenalina-concentrada', 
    nome: 'Noradrenalina Concentrada',
    categoria: 'Vasopressor',
    concentracao: 200,
    unidade: 'mcg/kg/min',
    doseMinima: 0.01,
    doseMaxima: 3.3,
    doseInicial: 1.66
  },
  {
    id: 'adrenalina',
    nome: 'Adrenalina',
    categoria: 'Vasopressor',
    concentracao: 100,
    unidade: 'mcg/kg/min', 
    doseMinima: 0.1,
    doseMaxima: 2,
    doseInicial: 1.05
  },
  {
    id: 'vasopressina',
    nome: 'Vasopressina',
    categoria: 'Vasopressor',
    concentracao: 0.4,
    unidade: 'UI/min',
    doseMinima: 0.01,
    doseMaxima: 0.04,
    doseInicial: 0.025,
    doseFixa: true
  },
  {
    id: 'dobutamina',
    nome: 'Dobutamina', 
    categoria: 'Inotropico',
    concentracao: 3000,
    unidade: 'mcg/kg/min',
    doseMinima: 2,
    doseMaxima: 20,
    doseInicial: 11
  },
  {
    id: 'milrinona',
    nome: 'Milrinona',
    categoria: 'Inotropico',
    concentracao: 200,
    unidade: 'mcg/kg/min',
    doseMinima: 0.375,
    doseMaxima: 0.75,
    doseInicial: 0.56
  },
  {
    id: 'dopamina-dopa',
    nome: 'Dopamina - dose dopa',
    categoria: 'Dopaminergico',
    concentracao: 1000,
    unidade: 'mcg/kg/min',
    doseMinima: 1,
    doseMaxima: 5,
    doseInicial: 3
  },
  {
    id: 'dopamina-beta',
    nome: 'Dopamina - dose beta', 
    categoria: 'Dopaminergico',
    concentracao: 1000,
    unidade: 'mcg/kg/min',
    doseMinima: 5,
    doseMaxima: 15,
    doseInicial: 10
  },
  {
    id: 'nitroprussiato',
    nome: 'Nitroprussiato de Sódio',
    categoria: 'Vasodilatador',
    concentracao: 200,
    unidade: 'mcg/kg/min',
    doseMinima: 0.1,
    doseMaxima: 10,
    doseInicial: 5.05
  }
]

function getCategoriaColor(categoria: string): string {
  if (categoria === 'Vasopressor') return 'bg-red-100 border-red-300 text-red-800'
  if (categoria === 'Inotropico') return 'bg-blue-100 border-blue-300 text-blue-800'
  if (categoria === 'Dopaminergico') return 'bg-orange-100 border-orange-300 text-orange-800'
  if (categoria === 'Vasodilatador') return 'bg-green-100 border-green-300 text-green-800'
  return 'bg-gray-100 border-gray-300 text-gray-800'
}

export default function CalculadoraDVA() {
  const [peso, setPeso] = useState<number>(75)
  const [doses, setDoses] = useState<{[key: string]: number}>(() => {
    const initialDoses: {[key: string]: number} = {}
    medicamentosDVA.forEach(med => {
      initialDoses[med.id] = med.doseInicial
    })
    return initialDoses
  })

  const calcularVazao = (medicamento: MedicamentoDVA, dose: number): number => {
    if (medicamento.doseFixa) {
      return (dose * 60) / medicamento.concentracao
    }
    return (dose * peso * 60) / medicamento.concentracao
  }

  const formatarNumero = (num: number): string => {
    return num.toFixed(2).replace('.', ',')
  }

  // Obter categorias únicas sem spread operator problemático
  const categoriasUnicas: string[] = []
  medicamentosDVA.forEach(med => {
    if (categoriasUnicas.indexOf(med.categoria) === -1) {
      categoriasUnicas.push(med.categoria)
    }
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex items-center gap-3">
          <Activity className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Drogas Vasoativas</h1>
            <p className="text-gray-600 mt-1">Calculadora de vazão para bombas de infusão</p>
          </div>
        </div>
      </div>

      {/* Peso do Paciente */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Peso do Paciente
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="1"
            max="200"
            value={peso}
            onChange={(e) => setPeso(Number(e.target.value) || 75)}
            className="w-24 px-4 py-2 text-xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-lg font-medium text-gray-700">kg</span>
        </div>
      </div>

      {/* Medicamentos por Categoria */}
      {categoriasUnicas.map(categoria => (
        <div key={categoria} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
            {categoria}s
          </h2>
          
          <div className="space-y-4">
            {medicamentosDVA
              .filter(med => med.categoria === categoria)
              .map(medicamento => (
                <div 
                  key={medicamento.id}
                  className={`p-6 rounded-xl border-2 ${getCategoriaColor(medicamento.categoria)}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{medicamento.nome}</h3>
                      <div className="text-sm space-y-1">
                        <p>Faixa: {medicamento.doseMinima} - {medicamento.doseMaxima} {medicamento.unidade}</p>
                        <p>Concentração: {medicamento.concentracao} {medicamento.unidade.includes('UI') ? 'UI/mL' : 'mcg/mL'}</p>
                      </div>
                    </div>
                    
                    <div className="lg:w-64 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Dose:</span>
                        <span className="font-mono text-sm">
                          {formatarNumero(doses[medicamento.id])} {medicamento.unidade}
                        </span>
                      </div>
                      
                      <input
                        type="range"
                        min={medicamento.doseMinima}
                        max={medicamento.doseMaxima}
                        step={medicamento.doseMaxima > 10 ? 0.5 : 0.01}
                        value={doses[medicamento.id]}
                        onChange={(e) => setDoses(prev => ({
                          ...prev,
                          [medicamento.id]: Number(e.target.value)
                        }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {formatarNumero(calcularVazao(medicamento, doses[medicamento.id]))} mL/h
                        </div>
                        <div className="text-xs text-gray-600">
                          1 mL = {medicamento.concentracao} {medicamento.unidade.includes('UI') ? 'UI' : 'mcg'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Aviso médico */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Aviso:</strong> Esta ferramenta é apenas para auxílio educacional. 
          As doses devem ser individualizadas. Sempre consulte protocolos institucionais.
        </p>
      </div>
    </div>
  )
}