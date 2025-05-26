# GitHub Copilot Instructions for Vercel AI SDK Python Streaming Preview

## Project Overview

This repository contains a demo application showcasing the Vercel AI SDK with Python backend streaming. The project demonstrates how to:

1. Stream chat completions from a Python FastAPI backend
2. Display the streaming responses using the Vercel AI SDK's `useChat` hook in a Next.js frontend
3. Implement the Data Stream Protocol for efficient communication

## Architecture

The application consists of two main parts:

1. **Frontend**: Next.js application with TypeScript and React
   - Located in `/app` and `/components` directories
   - Uses Tailwind CSS for styling
   - Leverages the Vercel AI SDK for handling AI responses

2. **Backend**: Python FastAPI application
   - Located in `/api` directory
   - Implements streaming endpoints for AI providers (OpenAI, Anthropic, etc.)
   - Follows the Data Stream Protocol specification

## Coding Conventions

### Frontend (TypeScript/React)

- Use TypeScript for all frontend code
- Follow functional component patterns with React hooks
- Use the `useChat` hook from the Vercel AI SDK for handling chat state and streaming
- Implement error handling for all async operations
- Follow the naming convention of kebab-case for files and PascalCase for components

Example component structure:
```tsx
import { useChat } from 'ai/react';

export function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
}
```

### Backend (Python)

- Use FastAPI for creating API endpoints
- Implement async handlers for streaming responses
- Follow PEP 8 style guidelines
- Use type annotations for function parameters and return values
- Implement proper error handling and status codes

Example endpoint structure:
```python
@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Implementation
        yield StreamingResponse(...)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )
```

## Testing

### Frontend Testing

- Jest is used for unit and component testing
- Test files are located in `/tests/frontend`
- Follow naming convention: `[component-name].test.tsx`
- Mock external dependencies and API calls
- Test both success and error cases

Example test structure:
```tsx
import { render, screen } from '@testing-library/react';
import { ComponentToTest } from '@/components/component-to-test';

describe('ComponentToTest', () => {
  it('renders component correctly', () => {
    render(<ComponentToTest />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Backend Testing

- Pytest is used for backend testing
- Test files are located in `/tests/backend`
- Test both success and error cases for API endpoints
- Mock external API calls to third-party services

## Common Patterns

### State Management

- Use React hooks (`useState`, `useEffect`, etc.) for component state
- Use `useChat` hook from Vercel AI SDK for chat state management
- Implement error handling for all async operations

### Styling

- Use Tailwind CSS for styling components
- Utility function `cn()` combines class names (found in `/lib/utils.ts`)
- Follow dark mode patterns with `dark:` Tailwind classes

### Error Handling

- Implement proper error boundaries in React components
- Use try/catch blocks for async operations
- Display user-friendly error messages
- Log detailed errors for debugging

## Environment Setup

- Create a `.env` file based on `.env.example`
- Required environment variables include API keys for AI providers
- Setup virtual environment for Python dependencies

## Useful Commands

- `pnpm dev`: Start the development server
- `pnpm build`: Build the production version
- `pnpm lint`: Run ESLint
- `pnpm test`: Run frontend tests
- `pytest tests/`: Run backend tests

## Best Practices

1. Keep components small and focused
2. Implement proper error handling
3. Write comprehensive tests
4. Follow type safety practices with TypeScript
5. Use async/await for asynchronous operations
6. Document complex logic with comments
7. Follow the existing code style and patterns