# Setup AI Chat Widget

Chat widget ini mendukung beberapa AI service untuk memberikan respons yang lebih cerdas dan kontekstual.

## 🚀 Opsi AI Service

### 1. OpenAI GPT (Recommended)

**Paling cerdas dan responsif**

```bash
# Tambahkan ke .env file
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

**Setup:**

1. Daftar di [OpenAI Platform](https://platform.openai.com/)
2. Buat API key di [API Keys](https://platform.openai.com/api-keys)
3. Tambahkan ke environment variables
4. Restart aplikasi

**Keuntungan:**

- ✅ Respons paling cerdas dan kontekstual
- ✅ Memahami konteks percakapan
- ✅ Dapat menjawab pertanyaan kompleks
- ✅ Mendukung multiple languages

### 2. Hugging Face (Alternative)

**Gratis tapi terbatas**

```bash
# Tambahkan ke .env file
REACT_APP_HUGGINGFACE_API_KEY=your_huggingface_token_here
```

**Setup:**

1. Daftar di [Hugging Face](https://huggingface.co/)
2. Buat access token di [Settings > Access Tokens](https://huggingface.co/settings/tokens)
3. Tambahkan ke environment variables

### 3. Local AI Service (Custom)

**Untuk kontrol penuh**

```bash
# Tambahkan ke .env file
REACT_APP_AI_SERVICE_URL=http://localhost:3001/api/ai
```

**Setup:**

1. Buat backend service dengan endpoint `/api/ai`
2. Implementasikan AI logic sesuai kebutuhan
3. Set URL di environment variables

### 4. Fallback Mode (Default)

**Tanpa AI, menggunakan rule-based responses**

Tidak perlu setup tambahan. Chat akan menggunakan respons statis berdasarkan kata kunci.

## 🔧 Konfigurasi

### Environment Variables

Buat file `.env` di root project:

```env
# OpenAI (Recommended)
REACT_APP_OPENAI_API_KEY=sk-your-openai-key-here

# Atau Hugging Face
REACT_APP_HUGGINGFACE_API_KEY=hf_your-token-here

# Atau Local Service
REACT_APP_AI_SERVICE_URL=http://localhost:3001/api/ai
```

### Custom Configuration

Edit `src/config/aiConfig.js` untuk mengubah:

- Model yang digunakan
- Max tokens
- Temperature
- Retry logic
- Fallback responses

## 🎯 Fitur AI Chat

### Smart Responses

- **Kontekstual**: Mengingat percakapan sebelumnya
- **Personalized**: Menyesuaikan dengan kebutuhan customer
- **Multilingual**: Mendukung bahasa Indonesia dan Inggris
- **Professional**: Selalu ramah dan informatif

### Business Intelligence

- **Product Knowledge**: Mengetahui semua paket dan harga
- **Lead Qualification**: Mengidentifikasi kebutuhan customer
- **Upselling**: Menyarankan paket yang sesuai
- **Contact Routing**: Mengarahkan ke kontak yang tepat

### Fallback System

- **Graceful Degradation**: Tetap berfungsi tanpa AI
- **Retry Logic**: Otomatis retry jika gagal
- **Error Handling**: Menangani error dengan baik
- **Offline Support**: Bekerja tanpa internet

## 📊 Monitoring & Analytics

### Console Logs

```javascript
// Cek status AI service
console.log('AI Service Type:', aiService.serviceType);
console.log('Has AI Service:', aiService.hasAIService());
```

### Error Tracking

```javascript
// Monitor AI errors
aiService.onError = (error) => {
  console.error('AI Error:', error);
  // Send to analytics service
};
```

## 🚀 Deployment

### Production Setup

1. **Set environment variables** di hosting platform
2. **Enable CORS** untuk API calls
3. **Monitor API usage** dan costs
4. **Setup error tracking** (Sentry, etc.)

### Performance Optimization

- **Caching**: Cache frequent responses
- **Rate Limiting**: Prevent API abuse
- **Compression**: Minimize payload size
- **CDN**: Use CDN for static assets

## 🔒 Security

### API Key Protection

- ✅ Jangan commit API keys ke repository
- ✅ Gunakan environment variables
- ✅ Rotate keys secara berkala
- ✅ Monitor API usage

### Data Privacy

- ✅ Tidak menyimpan percakapan user
- ✅ Tidak log sensitive information
- ✅ GDPR compliant
- ✅ Secure API communication

## 🆘 Troubleshooting

### Common Issues

**1. AI tidak merespons**

```bash
# Cek console untuk error
# Pastikan API key valid
# Cek network connection
```

**2. Respons tidak relevan**

```bash
# Update system prompt di AIService.js
# Adjust temperature setting
# Check conversation context
```

**3. API quota exceeded**

```bash
# Check API usage dashboard
# Upgrade plan jika perlu
# Implement rate limiting
```

### Debug Mode

```javascript
// Enable debug logging
localStorage.setItem('ai-debug', 'true');
```

## 📈 Advanced Features

### Custom AI Models

```javascript
// Gunakan model custom
aiConfig.openai.model = 'gpt-4';
aiConfig.openai.temperature = 0.3;
```

### Conversation Memory

```javascript
// Extend conversation history
const extendedHistory = messages.slice(-20); // Last 20 messages
```

### Multi-language Support

```javascript
// Detect user language
const userLanguage = navigator.language;
// Adjust responses accordingly
```

## 🎉 Success Metrics

### Key Performance Indicators

- **Response Time**: < 2 seconds
- **Accuracy**: > 90% relevant responses
- **User Satisfaction**: > 4.5/5 rating
- **Conversion Rate**: Track chat to sales

### Analytics Integration

```javascript
// Track AI interactions
analytics.track('ai_chat_interaction', {
  service_type: aiService.serviceType,
  response_time: responseTime,
  user_satisfaction: rating,
});
```

---

**Need Help?** Contact development team atau buka issue di repository.
