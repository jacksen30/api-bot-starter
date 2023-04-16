import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: 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,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Tell Me 7 great detailed arguments why I should";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;