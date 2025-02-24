# EU-Lens Project Documentation

## Project Overview
EU-Lens is an AI-powered legal assistant for EU law queries, using vector search and GPT-4 for accurate responses.

## Initial Setup

### Pinecone Vector Database Setup
1. Create an account at https://app.pinecone.io/
2. Create a new index with these settings:
   - Name: `eu-lens` (or your preferred name)
   - Dimensions: `1536` (matches OpenAI ada-002 embeddings)
   - Metric: `cosine`
   - Pod Type: `starter`
3. Get your environment details:
   - Environment: Found in index details (e.g., "gcp-starter")
   - Index name: The name you chose when creating the index
   - API Key: From your Pinecone console

### Environment Variables Setup
Create a `.env.local` file with:
```bash
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Pinecone Vector Database
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=your_environment_here # e.g., gcp-starter
PINECONE_INDEX=your_index_name_here # e.g., eu-lens
```

## System Architecture

### Frontend
- Next.js 14 with TypeScript
- React components for chat interface
- Tailwind CSS for styling

### Backend
- Next.js API routes
- OpenAI GPT-4 for response generation
- Pinecone for vector similarity search
- Document ingestion system for EU legal texts

### Data Flow
1. Documents are processed and stored as embeddings in Pinecone
2. User questions are embedded and matched with relevant documents
3. Matched contexts are used by GPT-4 to generate accurate responses

## Document Management

### Current Document Sources
- GDPR (data.europa.eu/eli/reg/2016/679)

### Document Processing Pipeline
1. Document fetching from EUR-Lex
2. Text chunking for optimal embedding
3. OpenAI embedding generation
4. Pinecone vector storage

## API Endpoints

### /api/chat
- Method: POST
- Purpose: Process user questions and generate responses
- Input: User message
- Output: AI-generated response with legal context

## CLI Tools

### Document Ingestion CLI
Location: `src/scripts/ingest-document.ts`
Purpose: Add new documents to the vector database
Usage: `npm run ingest-doc -- --url <document-url> --name <document-name>`

Example:
```bash
npm run ingest-doc -- --url "http://data.europa.eu/eli/reg/2016/679" --name "GDPR"
```

## Change Log

### Initial Setup (Current)
- Basic Next.js application structure
- Chat interface implementation
- Document ingestion system
- Vector search integration
- OpenAI integration
- Added Pinecone setup instructions

## Planned Features
- Document chunking optimization
- Batch document processing
- Document update tracking
- Source citation in responses 