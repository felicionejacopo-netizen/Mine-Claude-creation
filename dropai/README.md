# DropAI 🚀

AI-powered dropshipping automation platform. Importa prodotti da qualsiasi URL, genera schede Shopify complete e monitora i trend di mercato.

## Features (Fase 1)
- **Import Prodotto** — incolla URL da AliExpress, Amazon, CJ, Zendrop → l'AI genera scheda completa
- **Trend Monitor** — l'AI analizza prodotti trending in tempo reale
- **Dashboard** — overview completo del sistema

## Setup

### 1. Clona e installa
```bash
npm install
```

### 2. Variabili ambiente
Copia `.env.local.example` in `.env.local` e aggiungi:
```
ANTHROPIC_API_KEY=sk-ant-...
```
Su Vercel: Settings → Environment Variables

### 3. Sviluppo locale
```bash
npm run dev
```

### 4. Deploy
Push su GitHub → Vercel rileva automaticamente e pubblica.

## Stack
- **Next.js 14** (App Router)
- **Tailwind CSS** + font Syne
- **Claude claude-opus-4-5** via Anthropic SDK
- **Vercel** per hosting e deploy automatico

## Roadmap
- [ ] Fase 2: integrazione Shopify API (pubblica direttamente)
- [ ] Fase 3: cron job automatico trend → aggiorna store
- [ ] Fase 4: multi-utente SaaS
