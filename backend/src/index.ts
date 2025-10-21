import { genkit } from 'genkit';
import * as z from 'zod';
import { googleAI } from '@genkit-ai/google-genai';
import express from 'express';
import fetch from 'node-fetch';

const ai = genkit({
  plugins: [
    googleAI(),
  ],
});

// Define the input schema for the classification tool
const ClassificationInputSchema = z.object({
  text: z.string().describe('The text to classify for hate speech or fake news'),
});

// Define the output schema for the classification tool
const ClassificationOutputSchema = z.array(z.object({
  label: z.string(),
  score: z.number(),
}));

// Define the custom tool for Hugging Face Inference API
export const classifyTextTool = ai.defineTool(
  {
    name: 'classifyText',
    description: 'Classifies text for hate speech or fake news using a Hugging Face model',
    inputSchema: ClassificationInputSchema,
    outputSchema: ClassificationOutputSchema,
  },
  async (input) => {
    const HF_API_TOKEN = process.env.HF_API_TOKEN;
    if (!HF_API_TOKEN) {
      throw new Error('HF_API_TOKEN environment variable is not set.');
    }

    const response = await fetch('https://api-inference.huggingface.co/models/your-model-id', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: input.text }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Hugging Face API error: ${response.status} - ${errorBody}`);
    }

    const result = await response.json() as z.infer<typeof ClassificationOutputSchema>;
    return result;
  }
);

export const classifyFlow = ai.defineFlow(
  {
    name: 'classifyFlow',
    inputSchema: z.string(),
    outputSchema: ClassificationOutputSchema,
  },
  async (text) => {
    const result = await classifyTextTool({ text });
    return result;
  }
);

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

app.post('/api/classify', async (req, res) => {
  const { text } = req.body;
  try {
    const result = await classifyFlow(text);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
