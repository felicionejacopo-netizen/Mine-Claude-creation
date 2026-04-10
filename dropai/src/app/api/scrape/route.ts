import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

async function scrapeUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        'Accept-Language': 'it-IT,it;q=0.9,en;q=0.8',
      },
      signal: AbortSignal.timeout(10000),
    })
    const html = await res.text()
    // Extract useful text
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .slice(0, 4000)
    return text
  } catch {
    return `URL prodotto: ${url} — Usa la URL per dedurre il tipo di prodotto e genera una scheda realistica.`
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url) return NextResponse.json({ error: 'URL mancante' }, { status: 400 })
    if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: 'ANTHROPIC_API_KEY non configurata. Aggiungila su Vercel → Settings → Environment Variables.' }, { status: 500 })

    const pageText = await scrapeUrl(url)

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `Sei un esperto di dropshipping e copywriting. Analizza questo contenuto di pagina prodotto e genera una scheda prodotto completa.

URL: ${url}
Contenuto pagina: ${pageText}

Rispondi SOLO con un JSON valido con questa struttura esatta:
{
  "title": "Nome prodotto ottimizzato per l'italiano",
  "seoTitle": "Titolo SEO max 60 caratteri",
  "description": "Descrizione 150-200 parole, persuasiva, in italiano",
  "bulletPoints": ["Punto 1 beneficio chiave", "Punto 2", "Punto 3", "Punto 4", "Punto 5"],
  "price": {
    "supplier": "prezzo stimato fornitore es. 8,90€",
    "suggested": "prezzo vendita consigliato es. 29,90€",
    "margin": "margine stimato es. 70%"
  },
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "niche": "nicchia prodotto es. Tech, Fitness, Casa",
  "targetAudience": "target es. 25-40 anni, appassionati di fitness",
  "instagramCaption": "Caption Instagram con emoji, 100-150 parole + hashtag",
  "tiktokScript": "Script TikTok 30 secondi, stile hook-problema-soluzione",
  "shopifyHtml": "<div class='product-desc'>HTML formattato per Shopify con titoli h2, paragrafi e lista benefici</div>"
}`
      }]
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Risposta AI non valida')
    const product = JSON.parse(jsonMatch[0])

    return NextResponse.json({ product })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
