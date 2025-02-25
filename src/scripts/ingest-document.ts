import { Command } from 'commander'
import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'
import axios from 'axios'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local')
console.log('Looking for .env.local at:', envPath)

if (!fs.existsSync(envPath)) {
  console.error('Error: .env.local file not found at', envPath)
  process.exit(1)
}

const envConfig = dotenv.parse(fs.readFileSync(envPath))

// Set environment variables
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface DocumentMetadata {
  name: string
  url: string
  addedAt: string
  lastUpdated: string
}

interface DocumentRegistry {
  url: string
  name: string
  addedAt: string
  lastUpdated: string
}

// Function to chunk text into smaller pieces
function chunkText(text: string, maxChunkSize: number = 1000): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  const chunks: string[] = []
  let currentChunk = ''

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxChunkSize) {
      currentChunk += sentence
    } else {
      if (currentChunk) chunks.push(currentChunk.trim())
      currentChunk = sentence
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim())
  return chunks
}

// Function to fetch document content
async function fetchDocument(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(`Error fetching document from ${url}:`, error)
    return null
  }
}

// Function to create embedding
async function createEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  })
  return response.data[0].embedding
}

// Function to update document registry
function updateDocumentRegistry(metadata: DocumentMetadata): void {
  const registryPath = path.join(process.cwd(), 'data', 'document-registry.json')
  let registry: DocumentRegistry[] = []

  // Create data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
  }

  // Load existing registry if it exists
  if (fs.existsSync(registryPath)) {
    registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  }

  // Update or add document metadata
  const existingIndex = registry.findIndex(doc => doc.url === metadata.url)
  if (existingIndex >= 0) {
    registry[existingIndex] = metadata
  } else {
    registry.push(metadata)
  }

  // Save updated registry
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2))
}

async function ingestDocument(url: string, name: string, force: boolean = false): Promise<void> {
  console.log(`Starting ingestion of document: ${name}`)

  const pc = new Pinecone()
  const index = pc.index(process.env.PINECONE_INDEX!)

  // Fetch document content
  const content = await fetchDocument(url)
  if (!content) {
    console.error('Failed to fetch document content')
    return
  }

  // Create chunks
  const chunks = chunkText(content)
  console.log(`Created ${chunks.length} chunks from document`)

  // Process each chunk
  for (const [i, chunk] of chunks.entries()) {
    try {
      console.log(`Processing chunk ${i + 1}/${chunks.length}`)
      
      const embedding = await createEmbedding(chunk)
      
      await index.upsert([{
        id: `${name}-${i}`,
        values: embedding,
        metadata: {
          text: chunk,
          source: url,
          document: name,
          chunkIndex: i,
          totalChunks: chunks.length,
        },
      }])
    } catch (error) {
      console.error(`Error processing chunk ${i}:`, error)
    }
  }

  // Update document registry
  const metadata: DocumentMetadata = {
    name,
    url,
    addedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  }
  updateDocumentRegistry(metadata)

  console.log(`Successfully processed document: ${name}`)
}

interface CommandOptions {
  url: string
  name: string
  force: boolean
}

// Set up CLI
const program = new Command()

program
  .name('ingest-document')
  .description('Ingest a document into the EU-Lens vector database')
  .requiredOption('-u, --url <url>', 'URL of the document to ingest')
  .requiredOption('-n, --name <name>', 'Name of the document')
  .option('-f, --force', 'Force update even if document exists', false)
  .action(async (options: CommandOptions) => {
    try {
      await ingestDocument(options.url, options.name, options.force)
    } catch (error) {
      console.error('Error during document ingestion:', error)
      process.exit(1)
    }
  })

program.parse() 