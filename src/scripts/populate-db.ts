import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'
import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const pinecone = new Pinecone()

// List of important EU law documents to index
const documents = [
  {
    name: 'GDPR',
    url: 'http://data.europa.eu/eli/reg/2016/679',
  },
  // Add more documents here
]

async function fetchDocument(url: string) {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(`Error fetching document from ${url}:`, error)
    return null
  }
}

async function createEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  })
  return response.data[0].embedding
}

async function main() {
  // Get the index
  const index = pinecone.Index(process.env.PINECONE_INDEX!)

  for (const doc of documents) {
    console.log(`Processing ${doc.name}...`)
    
    const content = await fetchDocument(doc.url)
    if (!content) continue

    // Split content into chunks (implement proper text chunking here)
    const chunks = [content] // Placeholder for proper chunking logic

    for (const [i, chunk] of chunks.entries()) {
      const embedding = await createEmbedding(chunk)
      
      await index.upsert([{
        id: `${doc.name}-${i}`,
        values: embedding,
        metadata: {
          text: chunk,
          source: doc.url,
          document: doc.name,
        },
      }])
    }

    console.log(`Finished processing ${doc.name}`)
  }

  console.log('Database population complete!')
}

main().catch(console.error) 