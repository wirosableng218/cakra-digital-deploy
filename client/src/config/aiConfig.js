// Konfigurasi AI Service
export const aiConfig = {
  // OpenAI Configuration
  openai: {
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
    baseURL: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-3.5-turbo',
    maxTokens: 500,
    temperature: 0.7,
  },

  // Alternative AI Services
  alternatives: {
    // Hugging Face
    huggingface: {
      apiKey: process.env.REACT_APP_HUGGINGFACE_API_KEY || '',
      baseURL: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    },

    // Local AI Service
    local: {
      baseURL: process.env.REACT_APP_AI_SERVICE_URL || 'http://localhost:3001/api/ai',
    },
  },

  // Fallback Configuration
  fallback: {
    enabled: true,
    responseDelay: 1000, // ms
    maxRetries: 3,
  },
};

// Helper function untuk cek ketersediaan AI service
export const getAvailableAIService = () => {
  if (aiConfig.openai.apiKey) {
    return 'openai';
  }
  if (aiConfig.alternatives.huggingface.apiKey) {
    return 'huggingface';
  }
  if (aiConfig.alternatives.local.baseURL) {
    return 'local';
  }
  return 'fallback';
};

// Helper function untuk mendapatkan AI service URL
export const getAIServiceURL = (service) => {
  switch (service) {
    case 'openai':
      return aiConfig.openai.baseURL;
    case 'huggingface':
      return aiConfig.alternatives.huggingface.baseURL;
    case 'local':
      return aiConfig.alternatives.local.baseURL;
    default:
      return null;
  }
};
