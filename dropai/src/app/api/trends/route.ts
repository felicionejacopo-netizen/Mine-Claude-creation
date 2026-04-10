import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { niche } = await req.json()
    if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: 'ANTHROPIC_API_KEY non configurata.' }, { status: 500 })

    const nicheFilter = niche ? `Focalizzati sulla nicchia: ${niche}.` : 'Copri nicchie diverse (tech, casa, fitness, beauty, pet, ecc).'
    const today = new Date().toLocaleDateString('it-IT')

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2500,
      messages: [{
        role: 'user',
        content: `Sei un esperto di e-commerce e dropshipping. Data di oggi: ${today}.
${nicheFilter}

Identifica 8 prodotti REALMENTE trending adesso per il dropshipping italiano/europeo. Considera prodotti virali su TikTok, top sellers AliExpress, trend Google.

Rispondi SOLO con JSON array:
[
  {
    "name": "Nome prodotto specifico",
    "niche": "nicchia",
    "reason": "Perché è trending ora, 1-2 frasi concrete",
    "estimatedMargin": "es. 65%",
    "priceRange": "es. 19-39€",
    "searchVolume": "es. Alto / Molto Alto",
    "platforms": ["TikTok", "AliExpress"],
    "tags": ["tag1","tag2","tag3","tag4"],
    "urgency": "alta",
    "aliexpressQuery": "query di ricerca per AliExpress in inglese"
  }
]

urgency può essere: alta (prodotto esplosivo ora), media (stabile trending), bassa (nicchia evergreen)`
      }]
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) throw new Error('Risposta AI non valida')
    const trends = JSON.parse(jsonMatch[0])

    return NextResponse.json({ trends })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Errore interno'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
