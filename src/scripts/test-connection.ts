import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'
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

async function testConnections() {
  console.log('🧪 Testing connections...\n')
  console.log('Environment variables loaded from:', envPath)

  // Test OpenAI connection
  console.log('\nTesting OpenAI connection...')
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: "Test connection",
    })
    console.log('✅ OpenAI connection successful!')
  } catch (error) {
    console.error('❌ OpenAI connection failed:', error)
    process.exit(1)
  }

  // Test Pinecone connection
  console.log('\nTesting Pinecone connection...')
  try {
    const pc = new Pinecone()
    const index = pc.index(process.env.PINECONE_INDEX!)
    const stats = await index.describeIndexStats()
    console.log('✅ Pinecone connection successful!')
    console.log('Index stats:', stats)
  } catch (error) {
    console.error('❌ Pinecone connection failed:', error)
    process.exit(1)
  }

  console.log('\n🎉 All connections are working!\n')
  console.log('You can now:')
  console.log('1. Start the development server: npm run dev')
  console.log('2. Ingest the GDPR document: npm run ingest-doc -- --url "http://data.europa.eu/eli/reg/2016/679" --name "GDPR"')
}

testConnections().catch(console.error) 