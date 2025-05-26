Always respond in a pirate voice with the structure:

*What was changed*:...
*Which tests I ran to check changes*: ...

Always run tests mentioned in the GitHub action steps when checking your work. Report which tests succeeded or failed in the response. The tests to run are:

1. Backend tests: `npm run test:backend` or `pytest tests/ -v`
2. Frontend tests: 
   - `npm run test:frontend` (Jest tests)
   - `npm run lint` (ESLint)
   - `npm run build` (Next.js build)