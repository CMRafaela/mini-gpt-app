import express from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error('Erro: A variável de ambiente OPENAI_API_KEY não está definida.');
  process.exit(1);
}

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [{ role: 'user', content: userMessage }],
    });

    const aiResponse = completion.choices[0]?.message?.content;
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao chamar a API da OpenAI.');
  }
});

app.get('/', (req, res) => {
  res.send('Servidor Express está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
