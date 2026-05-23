# Lumina AI Setup Guide

## Environment Variables

The application uses environment variables to securely manage API keys and sensitive configuration. Never commit `.env` files to version control.

### Required Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Gemini API Configuration
# Get your API key from: https://ai.google.dev/
VITE_GEMINI_API_KEY=your-gemini-api-key

# Supabase Configuration
# Get these from your Supabase project settings
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Get your Gemini API Key:**
   - Visit https://ai.google.dev/
   - Click "Get API Key" 
   - Copy your API key and paste it in `.env`

3. **Configure Supabase:**
   - Go to your Supabase project settings
   - Find "API" section
   - Copy the URL and anon key
   - Update `.env` with these values

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

## Security Notes

- ✅ `.env` file is in `.gitignore` - never committed to git
- ✅ API keys are loaded via `import.meta.env.VITE_*`
- ✅ Keys are not exposed in source code
- ✅ Build process includes validation for required variables

## Features

- **AI Chat Tutor**: Powered by Google Gemini API
- **Dashboard**: Learning analytics and progress tracking
- **Authentication**: Firebase-based user management
- **Database**: Supabase PostgreSQL backend

## Testing

To test the chat interface:
```bash
npm run dev
# Visit http://localhost:5173/?chat=true
```

To test the dashboard:
```bash
# Visit http://localhost:5173/?dash=true
```
