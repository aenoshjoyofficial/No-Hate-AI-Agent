"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloFlow = exports.classifyFlow = exports.classifyTextTool = void 0;
const genkit_1 = require("genkit");
const z = __importStar(require("zod"));
const google_genai_1 = require("@genkit-ai/google-genai");
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const ai = (0, genkit_1.genkit)({
    plugins: [
        (0, google_genai_1.googleAI)(),
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
exports.classifyTextTool = ai.defineTool({
    name: 'classifyText',
    description: 'Classifies text for hate speech or fake news using a Hugging Face model',
    inputSchema: ClassificationInputSchema,
    outputSchema: ClassificationOutputSchema,
}, async (input) => {
    const HF_API_TOKEN = process.env.HF_API_TOKEN;
    if (!HF_API_TOKEN) {
        throw new Error('HF_API_TOKEN environment variable is not set.');
    }
    const response = await (0, node_fetch_1.default)('https://api-inference.huggingface.co/models/your-model-id', {
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
    const result = await response.json();
    return result;
});
exports.classifyFlow = ai.defineFlow({
    name: 'classifyFlow',
    inputSchema: z.string(),
    outputSchema: ClassificationOutputSchema,
}, async (text) => {
    const result = await (0, exports.classifyTextTool)({ text });
    return result;
});
exports.helloFlow = ai.defineFlow({
    name: 'helloFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
}, async (name) => {
    return `Hello, ${name}!`;
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/hello', async (req, res) => {
    const { name } = req.body;
    try {
        const result = await (0, exports.helloFlow)(name);
        res.json({ result });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/api/classify', async (req, res) => {
    const { text } = req.body;
    try {
        const result = await (0, exports.classifyFlow)(text);
        res.json({ result });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
