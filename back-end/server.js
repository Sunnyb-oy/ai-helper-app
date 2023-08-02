require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/generate-idea', async (req, res) => {
    const { contentType, goal, feel, experience, investment, time, teamSize, strengths, weaknesses, topVideos } = req.body;

    const prompt = `Given that a YouTuber creates ${contentType} content with the goal of ${goal}, wants people to feel ${feel} about them, has experience in ${experience}, is willing to invest ${investment} and commit ${time}, has a team of ${teamSize}, considers their strengths to be ${strengths} and weaknesses to be ${weaknesses}, and their top videos are ${topVideos}, generate a Mr Beast-style video idea.`;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens: 100,
        });

        const idea = response.data.choices[0].message.content.trim();

        res.json({idea});
    } catch (error) {
        console.error('Error making request to OpenAI API:', error);
        res.status(500).json({error: 'Error generating video idea'});
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
