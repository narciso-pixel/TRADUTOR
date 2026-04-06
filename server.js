const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;

// Middleware configuration
app.use(bodyParser.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Translate endpoint with input validation
app.post('/api/translate', [
    check('text').isString().trim().notEmpty().withMessage('Text is required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;
    // Mock translation process
    const translatedText = `Translated: ${text}`;
    res.status(200).json({ translatedText });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});