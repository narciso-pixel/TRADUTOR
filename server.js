const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/translate', (req, res) => {
    const { text, targetLanguage } = req.body;
    // TODO: Implement translation logic here
    res.json({ translatedText: `Translated ${text} to ${targetLanguage}` });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
