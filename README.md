# EU-Lens

EU-Lens is an AI-powered legal assistant that helps users understand and navigate EU laws and regulations. The application provides accurate answers to legal questions by referencing official EU legal documents.

## Features

- Real-time chat interface for legal questions
- Integration with official EUR-Lex documents
- AI-powered responses using GPT-4
- Semantic search for relevant legal context
- Up-to-date information from official sources

## Tech Stack

- Next.js 14 with TypeScript
- OpenAI GPT-4 for natural language processing
- Pinecone for vector similarity search
- Tailwind CSS for styling
- Vercel for deployment

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- OpenAI API key
- Pinecone account and API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eu-lens.git
   cd eu-lens
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables file and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

4. Populate the vector database with EU law documents:
   ```bash
   npm run populate-db
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `PINECONE_API_KEY`: Your Pinecone API key
- `PINECONE_ENVIRONMENT`: Your Pinecone environment
- `PINECONE_INDEX`: Your Pinecone index name

## Development

### Project Structure

```
eu-lens/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ChatInterface.tsx
│   ├── lib/
│   ├── types/
│   └── utils/
├── public/
└── scripts/
    └── populate-db.ts
```

### Adding New Documents

To add new EU law documents to the system:

1. Add the document URL to the `documents` array in `scripts/populate-db.ts`
2. Run the population script:
   ```bash
   npm run populate-db
   ```

## Deployment

The application is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 