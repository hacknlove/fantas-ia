# Cuentos con Fantas-IA

A Next.js application for creating AI-powered interactive stories.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cuentos-con-fantasia.git
cd cuentos-con-fantasia
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Turso credentials:
```env
TURSO_AUTH_TOKEN=your_auth_token
TURSO_DATABASE_URL=your_database_url
```

4. Initialize the database:
```bash
cat scripts/schema.sql | curl -X POST -H "Authorization: Bearer $TURSO_AUTH_TOKEN" --data-binary @- $TURSO_DATABASE_URL
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Create interactive stories with AI assistance
- Manage characters and storylines
- Generate AI-powered illustrations
- Real-time story editing and preview
- SQLite database with Turso for data persistence

## Tech Stack

- Next.js 13+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Turso (SQLite)