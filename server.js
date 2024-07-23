const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
    apiKey: 'YOUR_API_KEY',
});

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt }
            ],
            model: 'gpt-3.5-turbo', // Use the GPT-3.5-turbo model
        });

        // Log the entire response for debugging
        console.log('OpenAI response:', completion);

        if (completion.choices && completion.choices.length > 0) {
            res.json({ result: completion.choices[0].message.content });
        } else {
            res.status(500).json({ error: 'No choices found in OpenAI response' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
