const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class Eliza {
    async respond(input) {
      //const prompt = `Paciente: ${input}\nTerapeuta: `;
  
      try {
        const messages = [
            { "role": "system", "content": "You are Eliza, a computer program acting as a Rogerian psychotherapist. You speak in portuguese only." },
            { "role": "user", "content": input }
          ];

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
  