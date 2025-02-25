import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { Pinecone } from '@pinecone-database/pinecone'
import { getSystemPrompt } from '@/prompts/system-prompt'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const pinecone = new Pinecone()

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Get the index
    const index = pinecone.Index(process.env.PINECONE_INDEX!)
    
    // Get embedding for the user's question
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: message,
    })

    // Query Pinecone for similar contexts
    const queryResponse = await index.query({
      vector: embedding.data[0].embedding,
      topK: 3,
      includeMetadata: true,
    })

    // Construct context and sources from similar documents
    const context = queryResponse.matches
      .map(match => match.metadata?.text)
      .join('\n\n')

    const sources = queryResponse.matches.map(match => ({
      name: match.metadata?.document || 'Unknown Document',
      url: match.metadata?.source || '#',
      relevance: match.score || 0
    })).filter(source => source.relevance > 0.7) // Only include relevant sources

    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: getSystemPrompt(context)
        },
        {
          role: "user",
          content: message
        }
      ],
    })

    return NextResponse.json({
      response: completion.choices[0].message.content,
      sources,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 