// script.js

// DOM element validation
const inputText = document.getElementById('input-text');
const translateButton = document.getElementById('translate-button');
const outputText = document.getElementById('output-text');

if (!inputText || !translateButton || !outputText) {
  console.error('Required DOM elements are missing.');
}

// Function to handle translation
async function translateText() {
  const textToTranslate = inputText.value;

  if (!textToTranslate) {
    console.error('Input text is empty.');
    return;
  }

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text: textToTranslate })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const translatedData = await response.json();
    outputText.textContent = translatedData.translatedText;
  } catch (error) {
    console.error('Translation failed: ', error);
  }
}

// Copy to clipboard functionality
const copyButton = document.getElementById('copy-button');

if (copyButton) {
  copyButton.addEventListener('click', () => {
    const textToCopy = outputText.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Text copied to clipboard!');
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    translateText(); // Ctrl + Enter to translate
  }
});

translateButton.addEventListener('click', translateText);