# 🩺 OmniMed v2 - Calculadoras Médicas

> **Ferramentas clínicas rápidas e confiáveis para profissionais de saúde**

[![Deploy na Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/phorde/omnimed-v2)

## 🎯 **Visão Geral**

OmniMed v2 é uma suite de calculadoras médicas otimizada para profissionais de saúde em ambiente de plantão e emergência. Desenvolvida com tecnologias modernas para garantir performance, usabilidade e confiabilidade.

### **🛠 Ferramentas Disponíveis**

| Calculadora | Descrição | Status |
|-------------|-------------|--------|
| **IOT** | Sequência Rápida de Intubação | ✅ |
| **DVA** | Drogas Vasoativas com Diluições | ✅ |

## 🚀 **Quick Start**

### **Deploy Instantâneo na Vercel**
```bash
# 1. Clone o repositório
git clone https://github.com/phorde/omnimed-v2.git
cd omnimed-v2

# 2. Instale dependências
npm install

# 3. Execute localmente
npm run dev

# 4. Deploy na Vercel
npx vercel --prod
```

### **Acesso Rápido**
- **Página Principal:** `/`
- **Calculadora IOT:** `/iot`
- **Calculadora DVA:** `/dva`

## 💻 **Stack Tecnológica**

- **Framework:** Next.js 14.2.5 (App Router)
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS 3
- **Ícones:** Lucide React
- **Deploy:** Vercel (otimizado)

## 📊 **Funcionalidades**

### **👩‍⚕️ Calculadora IOT**
- Cálculo automático de doses por peso
- Seleção de contexto clínico
- Recomendações baseadas em guidelines
- Contraindicações e precauções
- Interface responsiva e intuitiva

**Medicamentos incluídos:**
- Fentanil, Etomidato, Cetamina, Propofol, Midazolam
- Succinilcolina, Rocurônio

### **💖 Calculadora DVA**
- 11 medicamentos vasoativos completos
- Sliders interativos para ajuste de dose
- Cálculo automático de vazão (mL/h)
- Diluições padronizadas
- Categorização por mecanismo de ação

**Medicamentos incluídos:**
- **Vasopressores:** Noradrenalina, Adrenalina, Vasopressina
- **Inotrópicos:** Dobutamina, Milrinona
- **Dopamina:** Doses dopa, beta e alfa
- **Vasodilatadores:** Nitroprussiato, Nitroglicerina

## 🔒 **Segurança e Conformidade**

### **Validações Implementadas**
- ✅ Peso entre 1-200 kg
- ✅ Doses dentro de faixas terapêuticas
- ✅ Verificação de contraindicações
- ✅ Avisos para interações medicamentosas

### **Disclaimers Médicos**
🚨 **IMPORTANTE:** Esta ferramenta destina-se exclusivamente a fins educacionais e de auxílio à decisão clínica. Não substitui o julgamento clínico profissional.

## 👨‍💻 **Desenvolvimento**

### **Estrutura do Projeto**
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── iot/
│   │   └── page.tsx
│   └── dva/
│       └── page.tsx
└── components/ (futuras expansões)
```

### **Scripts Disponíveis**
```bash
npm run dev      # Desenvolvimento local
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Lintágem do código
```

---

**Feito com ❤️ para profissionais de saúde**