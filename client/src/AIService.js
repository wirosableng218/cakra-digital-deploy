import { aiConfig, getAvailableAIService, getAIServiceURL } from './config/aiConfig';

// AI Service untuk Chat Widget
class AIService {
  constructor() {
    this.serviceType = getAvailableAIService();
    this.apiKey = aiConfig.openai.apiKey;
    this.baseURL = getAIServiceURL(this.serviceType);
    this.fallbackResponses = this.getFallbackResponses();
    this.retryCount = 0;
  }

  getFallbackResponses() {
    return {
      // Greetings
      halo: 'Halo! Selamat datang di Cakra Digital Innovation. Saya siap membantu Anda dengan layanan website development dan software installation kami.',
      hai: 'Hai! Bagaimana kabar Anda? Ada yang bisa saya bantu terkait layanan kami?',
      hello: 'Hello! Welcome to Cakra Digital Innovation. I can help you with our website development and software installation services.',

      // Services
      layanan:
        'Kami menyediakan berbagai layanan:\n\n🌐 Website Development:\n- Basic (Rp 699.000)\n- Standard (Rp 1.199.000) - Most Popular\n- Pro (Rp 2.775.000)\n- Business (Rp 4.785.000)\n\n💻 Software Installation:\n- Basic Installation (Rp 500.000)\n- Professional Setup (Rp 1.200.000)\n- Enterprise Solution (Rp 2.500.000)',

      website:
        'Untuk layanan website development, kami memiliki 4 paket:\n\n✅ Basic (Rp 699.000):\n- Website 5 halaman\n- Design responsif\n- 500mb disk space\n- 1 email account\n- SEO dasar\n- Free domain .my.id\n\n✅ Standard (Rp 1.199.000) - MOST POPULAR:\n- Website 10 halaman\n- Design custom premium\n- Responsif & mobile-friendly\n- SEO optimization\n- 1GB disk space\n- 1 akun email profesional\n- Free domain .my.id\n- 2x revisi gratis\n- Estimasi 5-10 hari kerja\n\n✅ Pro (Rp 2.775.000):\n- Website unlimited halaman\n- Premium template design\n- 10GB disk space\n- Free email accounts\n- Free domain .COM\n- 3x revisi gratis\n- Estimasi 7-14 hari kerja\n\n✅ Business (Rp 4.785.000):\n- Website unlimited halaman\n- Custom design\n- 10GB disk space\n- Private CPanel\n- 10x revisi gratis\n- Estimasi 14-21 hari kerja\n- Bonus: Google Ads 1 bulan (senilai Rp 1.400.000)',

      harga:
        'Berikut daftar harga lengkap kami:\n\n🌐 WEBSITE DEVELOPMENT:\n• Basic: Rp 699.000\n• Standard: Rp 1.199.000 (Most Popular)\n• Pro: Rp 2.775.000 (Diskon 44.5%)\n• Business: Rp 4.785.000 (Diskon 38.5%)\n\n💻 SOFTWARE INSTALLATION:\n• Basic: Rp 500.000\n• Professional: Rp 1.200.000\n• Enterprise: Rp 2.500.000\n\nSemua harga sudah termasuk hosting, domain, dan support!',

      paket:
        'Kami memiliki 4 paket website development:\n\n1️⃣ BASIC (Rp 699.000)\n- Entry level, cocok untuk usaha kecil\n- Website 5 halaman\n- Design responsif\n\n2️⃣ STANDARD (Rp 1.199.000) ⭐ MOST POPULAR\n- Cocok untuk bisnis menengah\n- Website 10 halaman\n- SEO optimization\n- 2x revisi gratis\n\n3️⃣ PRO (Rp 2.775.000)\n- Advanced features\n- Unlimited halaman\n- Premium template\n- 3x revisi gratis\n\n4️⃣ BUSINESS (Rp 4.785.000)\n- Enterprise solution\n- Custom design\n- Private CPanel\n- 10x revisi gratis\n- Bonus Google Ads 1 bulan',

      // Contact
      kontak: 'Untuk menghubungi kami:\n\n📱 WhatsApp: +62 812-3456-7890\n📧 Email: info@cakradigital.com\n🌐 Website: www.cakradigital.com\n\nJam operasional: Senin - Jumat, 09:00 - 17:00 WIB',

      wa: 'Anda bisa menghubungi kami via WhatsApp di +62 812-3456-7890 untuk konsultasi langsung!',

      email: 'Email kami: info@cakradigital.com\n\nKami akan merespons dalam 1x24 jam pada hari kerja.',

      // Process
      proses:
        'Proses pengerjaan website:\n\n1️⃣ Konsultasi & Brief\n2️⃣ Design & Mockup\n3️⃣ Development\n4️⃣ Testing\n5️⃣ Launch & Training\n\nEstimasi waktu:\n• Basic: 3-5 hari\n• Standard: 5-10 hari\n• Pro: 7-14 hari\n• Business: 14-21 hari',

      revisi:
        'Kami memberikan revisi gratis sesuai paket:\n\n• Basic: 1x revisi gratis\n• Standard: 2x revisi gratis\n• Pro: 3x revisi gratis\n• Business: 10x revisi gratis\n\nRevisi meliputi perubahan design, konten, dan fitur sesuai kebutuhan Anda.',

      // Support
      support:
        'Kami memberikan support sesuai paket:\n\n• Basic: 1 bulan support gratis\n• Standard: 30 hari support gratis\n• Pro: Support sesuai kebutuhan\n• Business: Support premium + Google Ads setup\n\nSupport meliputi:\n- Maintenance website\n- Update konten\n- Troubleshooting\n- Training penggunaan',

      // Default responses
      default:
        'Terima kasih atas pertanyaan Anda! Untuk informasi lebih detail, silakan hubungi tim kami:\n\n📱 WhatsApp: +62 812-3456-7890\n📧 Email: info@cakradigital.com\n\nAtau kunjungi halaman pricing untuk melihat paket lengkap kami.',
    };
  }

  // System prompt untuk AI
  getSystemPrompt() {
    return `Anda adalah AI Assistant untuk Cakra Digital Innovation, perusahaan yang menyediakan layanan website development dan software installation.

INFORMASI PERUSAHAAN:
- Nama: Cakra Digital Innovation
- Layanan: Website Development & Software Installation
- Kontak: WhatsApp +62 812-3456-7890, Email info@cakradigital.com

PAKET WEBSITE DEVELOPMENT:
1. Basic (Rp 699.000): Website 5 halaman, design responsif, 500mb disk space, 1 email account, SEO dasar, Free domain .my.id, 1x revisi gratis
2. Standard (Rp 1.199.000) - MOST POPULAR: Website 10 halaman, design custom premium, responsif & mobile-friendly, SEO optimization, 1GB disk space, 1 akun email profesional, Free domain .my.id, 2x revisi gratis, estimasi 5-10 hari kerja
3. Pro (Rp 2.775.000): Website unlimited halaman, premium template design, 10GB disk space, free email accounts, Free domain .COM, 3x revisi gratis, estimasi 7-14 hari kerja
4. Business (Rp 4.785.000): Website unlimited halaman, custom design, 10GB disk space, private CPanel, 10x revisi gratis, estimasi 14-21 hari kerja, bonus Google Ads 1 bulan (senilai Rp 1.400.000)

PAKET SOFTWARE INSTALLATION:
1. Basic Installation (Rp 500.000): Instalasi software standar, konfigurasi dasar, testing fungsi, dokumentasi instalasi, support 1 bulan
2. Professional Setup (Rp 1.200.000): Instalasi software premium, konfigurasi advanced, optimasi performa, security setup, backup configuration, training penggunaan, support 3 bulan
3. Enterprise Solution (Rp 2.500.000): Instalasi software enterprise, konfigurasi custom, integration dengan sistem, security hardening, monitoring setup, backup & recovery, training lengkap, support 6 bulan, maintenance 3 bulan

ATURAN RESPONS:
- Selalu ramah dan profesional
- Berikan informasi yang akurat tentang layanan kami
- Jika tidak tahu, arahkan ke kontak yang tepat
- Gunakan emoji untuk membuat respons lebih menarik
- Jawab dalam bahasa Indonesia kecuali diminta bahasa lain
- Fokus pada membantu customer memilih paket yang tepat
- Selalu berikan kontak WhatsApp dan email di akhir respons`;
  }

  // Cek apakah ada AI service yang tersedia
  hasAIService() {
    return this.serviceType !== 'fallback' && this.serviceType !== 'quota_exceeded';
  }

  // Cek apakah ada API key OpenAI
  hasOpenAIKey() {
    return this.apiKey && this.apiKey.length > 0;
  }

  // Generate response menggunakan AI service
  async generateAIResponse(userMessage, conversationHistory = []) {
    if (!this.hasAIService()) {
      return this.getFallbackResponse(userMessage);
    }

    try {
      let response;

      switch (this.serviceType) {
        case 'openai':
          response = await this.generateOpenAIResponse(userMessage, conversationHistory);
          break;
        case 'huggingface':
          response = await this.generateHuggingFaceResponse(userMessage);
          break;
        case 'local':
          response = await this.generateLocalResponse(userMessage, conversationHistory);
          break;
        default:
          response = this.getFallbackResponse(userMessage);
      }

      this.retryCount = 0; // Reset retry count on success
      return response;
    } catch (error) {
      console.error('AI Service Error:', error);

      // Retry logic
      if (this.retryCount < aiConfig.fallback.maxRetries) {
        this.retryCount++;
        console.log(`Retrying AI request (${this.retryCount}/${aiConfig.fallback.maxRetries})`);
        await this.simulateThinking();
        return this.generateAIResponse(userMessage, conversationHistory);
      }

      return this.getFallbackResponse(userMessage);
    }
  }

  // OpenAI API implementation
  async generateOpenAIResponse(userMessage, conversationHistory = []) {
    const messages = [{ role: 'system', content: this.getSystemPrompt() }, ...conversationHistory, { role: 'user', content: userMessage }];

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: aiConfig.openai.model,
          messages: messages,
          max_tokens: aiConfig.openai.maxTokens,
          temperature: aiConfig.openai.temperature,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);

        // Handle quota exceeded error
        if (response.status === 429 && errorData.error?.code === 'insufficient_quota') {
          console.log('⚠️ OpenAI quota exceeded, switching to fallback mode');
          this.serviceType = 'quota_exceeded';
          return this.getFallbackResponse(userMessage);
        }

        throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from OpenAI API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Request Error:', error);
      throw error;
    }
  }

  // Hugging Face API implementation
  async generateHuggingFaceResponse(userMessage) {
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${aiConfig.alternatives.huggingface.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: userMessage,
        parameters: {
          max_length: 200,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API Error: ${response.status}`);
    }

    const data = await response.json();
    return data[0]?.generated_text || this.getFallbackResponse(userMessage);
  }

  // Local AI service implementation
  async generateLocalResponse(userMessage, conversationHistory = []) {
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        history: conversationHistory,
        context: this.getSystemPrompt(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Local AI Service Error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || this.getFallbackResponse(userMessage);
  }

  // Fallback response berdasarkan kata kunci
  getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Check for specific keywords
    if (message.includes('halo') || message.includes('hai') || message.includes('hello')) {
      return this.fallbackResponses['halo'];
    }
    if (message.includes('layanan') || message.includes('service')) {
      return this.fallbackResponses['layanan'];
    }
    if (message.includes('website') || message.includes('web')) {
      return this.fallbackResponses['website'];
    }
    if (message.includes('harga') || message.includes('price') || message.includes('cost')) {
      return this.fallbackResponses['harga'];
    }
    if (message.includes('paket') || message.includes('package') || message.includes('plan')) {
      return this.fallbackResponses['paket'];
    }
    if (message.includes('kontak') || message.includes('contact') || message.includes('hubungi')) {
      return this.fallbackResponses['kontak'];
    }
    if (message.includes('wa') || message.includes('whatsapp')) {
      return this.fallbackResponses['wa'];
    }
    if (message.includes('email')) {
      return this.fallbackResponses['email'];
    }
    if (message.includes('proses') || message.includes('process') || message.includes('cara')) {
      return this.fallbackResponses['proses'];
    }
    if (message.includes('revisi') || message.includes('revision')) {
      return this.fallbackResponses['revisi'];
    }
    if (message.includes('support') || message.includes('bantuan')) {
      return this.fallbackResponses['support'];
    }

    return this.fallbackResponses['default'];
  }

  // Simulasi AI thinking time
  async simulateThinking() {
    const thinkingTime = Math.random() * 1000 + 500; // 500-1500ms
    return new Promise((resolve) => setTimeout(resolve, thinkingTime));
  }
}

export default AIService;
