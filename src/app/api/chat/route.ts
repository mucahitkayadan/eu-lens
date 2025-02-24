import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { PineconeClient } from '@pinecone-database/pinecone'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const pinecone = new PineconeClient()

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Initialize Pinecone
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!,
    })

    // Get relevant context from Pinecone
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

    // Construct context from similar documents
    const context = queryResponse.matches
      .map(match => match.metadata?.text)
      .join('\n\n')

    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are an AI legal assistant specialized in EU law. Use the following context to answer questions accurately. If you're unsure or the context doesn't provide enough information, say so.

Context:
${context}`
        },
        {
          role: "user",
          content: message
        }
      ],
    })

    return NextResponse.json({
      response: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 