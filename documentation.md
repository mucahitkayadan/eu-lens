# EU-Lens Project Documentation

## Project Overview
EU-Lens is a Next.js application that provides an AI-powered legal assistant specialized in EU law. The application uses OpenAI's GPT-4 for natural language processing and Pinecone for vector similarity search to provide accurate responses based on legal documents.

## Technical Stack
- Next.js 14.1.0
- TypeScript
- OpenAI API (GPT-4 and text-embedding-ada-002)
- Pinecone Vector Database
- Tailwind CSS

## Key Components

### RAG System
The application implements a Retrieval-Augmented Generation (RAG) system:
1. Document Processing
   - Legal documents are chunked and embedded
   - Embeddings are stored in Pinecone vector database
   - Each chunk maintains metadata about its source

2. Query Processing
   - User questions are embedded using the same model
   - Similar document chunks are retrieved from Pinecone
   - Retrieved context is used to generate responses
   - Source documents are tracked and displayed to users

3. Response Generation
   - Uses a carefully crafted system prompt
   - Combines retrieved context with GPT-4's capabilities
   - Provides source attribution for transparency

### API Routes
- `/api/chat`: Handles chat interactions, combining document context from Pinecone with OpenAI's GPT-4
- Document ingestion script for processing and storing legal documents

### System Prompt
Located in `src/prompts/system-prompt.ts`, the system prompt:
- Defines the AI's role and expertise
- Sets guidelines for response structure
- Establishes tone and language requirements
- Handles different types of legal queries
- Maintains transparency about AI limitations

### Environment Variables
Required environment variables:
- `OPENAI_API_KEY`: OpenAI API key
- `PINECONE_API_KEY`: Pinecone API key
- `PINECONE_ENVIRONMENT`: Pinecone environment
- `PINECONE_INDEX`: Pinecone index name

## Recent Changes
1. Fixed user message text visibility by ensuring white text color
2. Implemented source attribution in chat responses
3. Added a comprehensive system prompt
4. Enhanced the RAG system with better context handling
5. Updated UI to display source documents
6. Improved response quality with structured guidelines

## Current Status
- Development server running on http://localhost:3000
- OpenAI and Pinecone connections working
- Chat functionality with source attribution
- Document ingestion system in place
- Comprehensive system prompt implemented

## Next Steps
1. Test the RAG system with various legal queries
2. Ingest more EU legal documents
3. Implement source document caching
4. Add document relevance scoring
5. Improve source attribution display

## Git Repository
The project is version controlled using Git, with the following structure:
- Initial setup and configuration
- Module fixes and TypeScript updates
- RAG system implementation
- UI improvements and source attribution

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