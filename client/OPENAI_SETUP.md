# 🚀 Setup OpenAI untuk Chat AI

## Langkah 1: Daftar OpenAI Account

1. **Kunjungi OpenAI Platform:**

   - Buka [https://platform.openai.com/](https://platform.openai.com/)
   - Klik "Sign Up" untuk membuat account baru

2. **Verifikasi Email:**
   - Cek email dan klik link verifikasi
   - Lengkapi profil Anda

## Langkah 2: Buat API Key

1. **Login ke OpenAI Platform:**

   - Masuk ke [https://platform.openai.com/](https://platform.openai.com/)

2. **Buat API Key:**
   - Klik menu "API Keys" di sidebar kiri
   - Klik "Create new secret key"
   - Beri nama: "Cakra Digital Chat AI"
   - **Copy API key** (format: `sk-...`)
   - ⚠️ **PENTING**: Simpan API key dengan aman, tidak bisa dilihat lagi!

## Langkah 3: Setup Environment Variables

### **Buat file `.env` di root project:**

```env
# OpenAI API Key untuk Chat AI
REACT_APP_OPENAI_API_KEY=sk-your-openai-api-key-here
```

### **Contoh file `.env`:**

```env
# Ganti dengan API key yang Anda dapatkan
REACT_APP_OPENAI_API_KEY=sk-1234567890abcdef1234567890abcdef1234567890abcdef
```

## Langkah 4: Restart Aplikasi

```bash
# Stop aplikasi (Ctrl+C)
# Start ulang aplikasi
npm start
```

## Langkah 5: Test Chat AI

1. **Buka website** di browser
2. **Klik chat widget** di pojok kanan bawah
3. **Ketik pesan** seperti "halo" atau "harga website"
4. **Lihat respons AI** yang cerdas!

## 🔧 Troubleshooting

### **Error: "API key not found"**

```bash
# Pastikan file .env ada di root project
# Pastikan nama variable benar: REACT_APP_OPENAI_API_KEY
# Restart aplikasi setelah menambah .env
```

### **Error: "Invalid API key"**

```bash
# Cek API key di OpenAI Platform
# Pastikan API key aktif dan valid
# Cek billing/credits di OpenAI dashboard
```

### **Error: "Rate limit exceeded"**

```bash
# Cek usage di OpenAI dashboard
# Upgrade plan jika perlu
# Tunggu beberapa menit
```

## 💰 Biaya OpenAI

### **Pricing (per 1K tokens):**

- **GPT-3.5-turbo**: $0.002 (sangat murah!)
- **GPT-4**: $0.03 (lebih mahal tapi lebih cerdas)

### **Estimasi Biaya Chat:**

- **1 chat session**: ~$0.01-0.05
- **100 chat sessions**: ~$1-5
- **1000 chat sessions**: ~$10-50

### **Tips Menghemat:**

- Gunakan GPT-3.5-turbo (sudah sangat cerdas)
- Set max_tokens rendah (500 sudah cukup)
- Monitor usage di dashboard

## 🎯 Fitur yang Didapat

### **Smart AI Responses:**

- ✅ Memahami konteks percakapan
- ✅ Menjawab pertanyaan kompleks
- ✅ Menyarankan paket yang sesuai
- ✅ Multilingual (Indonesia & Inggris)
- ✅ Professional & ramah

### **Business Intelligence:**

- ✅ Lead qualification
- ✅ Product knowledge
- ✅ Upselling suggestions
- ✅ Contact routing

## 🔒 Security Tips

### **API Key Protection:**

- ✅ Jangan commit `.env` ke repository
- ✅ Gunakan environment variables
- ✅ Rotate keys secara berkala
- ✅ Monitor usage di dashboard

### **Production Setup:**

- ✅ Set environment variables di hosting
- ✅ Enable CORS untuk API calls
- ✅ Monitor API usage dan costs
- ✅ Setup error tracking

## 📊 Monitoring

### **OpenAI Dashboard:**

- **Usage**: [https://platform.openai.com/usage](https://platform.openai.com/usage)
- **API Keys**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Billing**: [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)

### **Console Logs:**

```javascript
// Cek status AI service
console.log('AI Service Type:', aiService.serviceType);
console.log('Has AI Service:', aiService.hasAIService());
```

## 🎉 Success!

Setelah setup selesai, chat AI Anda akan:

- **Merespons dengan cerdas** berdasarkan konteks
- **Mengetahui semua paket** dan harga
- **Menyarankan solusi** yang tepat
- **Mengarahkan ke kontak** yang sesuai
- **Bekerja 24/7** tanpa lelah!

---

**Need Help?** Contact development team atau buka issue di repository.
