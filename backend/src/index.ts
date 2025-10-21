import { genkit } from 'genkit';
import * as z from 'zod';
import { googleAI } from '@genkit-ai/google-genai';
import express from 'express';

const ai = genkit({
  plugins: [
    googleAI(),
  ],
});

export const helloFlow = ai.defineFlow(
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
    const result = await helloFlow(name);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
