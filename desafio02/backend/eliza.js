const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class Eliza {
    async respond(input) {
      //const prompt = `Paciente: ${input}\nTerapeuta: `;
  
      try {
        // Divida a entrada em linhas usando o caractere de quebra de linha
        const lines = input.split('\n');

        const messages = [
            { "role": "system", "content": "You are Eliza, a computer program acting as a Rogerian psychotherapist. You speak in portuguese only." }
        ];
        lines.forEach(line => {
          messages.push({ "role": "user", "content": line });
        });

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature:0.2,
            max_tokens:100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
          });
  
        return response.data.choices[0].message.content;
      } catch (error) {
        console.error(error);
        return 'Desculpe, algo deu errado. Por favor, tente novamente mais tarde.';
      }
    }
  }
  
module.exports = Eliza;
  