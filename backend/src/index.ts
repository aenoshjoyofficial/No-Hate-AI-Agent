import { configure, defineFlow } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import * as z from 'zod';
import express from 'express';
import { run } from 'genkit/flow';

configure({
  plugins: [
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const helloFlow = defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (name) => {
    return `Hello, ${name}!`;
  }
);

const app = express();
app.use(express.json());

app.post('/api/hello', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await run(helloFlow, name);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
