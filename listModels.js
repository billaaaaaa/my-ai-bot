require('dotenv').config();

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        if (!data.models) {
            console.log('No models found. Response:', data);
            return;
        }
        const supportedModels = data.models
            .filter(m => m.supportedGenerationMethods.includes('generateContent'))
            .map(m => m.name.replace('models/', ''));
        console.log('Supported Models:', supportedModels);
    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
