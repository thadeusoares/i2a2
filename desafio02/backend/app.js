require('dotenv').config();
const express = require('express');
const path = require('path');
const Eliza = require('./eliza.js'); // Importe sua classe Eliza

const app = express();
const eliza = new Eliza();

// Sirva arquivos estáticos do diretório "public"
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para processar a entrada do usuário
app.post('/chat', express.json(), async (req, res) => {
    const userMessage = req.body.message;
    const elizaResponse = await eliza.respond(userMessage);
    
    res.json({ response: elizaResponse });
  });
  

// Sirva o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
