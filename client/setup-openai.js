#!/usr/bin/env node

/**
 * Setup OpenAI untuk Chat AI
 * Script ini membantu setup OpenAI API key
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('🚀 Setup OpenAI untuk Chat AI');
console.log('===============================\n');

// Cek apakah file .env sudah ada
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (fs.existsSync(envPath)) {
  console.log('✅ File .env sudah ada');
  console.log('📝 Edit file .env dan tambahkan:');
  console.log('   REACT_APP_OPENAI_API_KEY=sk-your-api-key-here\n');
} else {
  console.log('📝 Membuat file .env...');

  const envContent = `# OpenAI API Key untuk Chat AI
# Dapatkan API key dari: https://platform.openai.com/api-keys
REACT_APP_OPENAI_API_KEY=sk-your-openai-api-key-here

# Ganti 'sk-your-openai-api-key-here' dengan API key yang Anda dapatkan dari OpenAI Platform
# Contoh: REACT_APP_OPENAI_API_KEY=sk-1234567890abcdef...
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ File .env berhasil dibuat');
}

// Cek apakah file .env.example sudah ada
if (!fs.existsSync(envExamplePath)) {
  const envExampleContent = `# OpenAI API Key untuk Chat AI
# Dapatkan API key dari: https://platform.openai.com/api-keys
REACT_APP_OPENAI_API_KEY=sk-your-openai-api-key-here

# Ganti 'sk-your-openai-api-key-here' dengan API key yang Anda dapatkan dari OpenAI Platform
# Contoh: REACT_APP_OPENAI_API_KEY=sk-1234567890abcdef...
`;

  fs.writeFileSync(envExamplePath, envExampleContent);
  console.log('✅ File .env.example berhasil dibuat');
}

console.log('\n📋 Langkah-langkah selanjutnya:');
console.log('1. Daftar di OpenAI Platform: https://platform.openai.com/');
console.log('2. Buat API key di: https://platform.openai.com/api-keys');
console.log('3. Edit file .env dan ganti API key');
console.log('4. Restart aplikasi: npm start');
console.log('5. Test chat AI di website!');

console.log('\n💰 Biaya OpenAI:');
console.log('- GPT-3.5-turbo: $0.002 per 1K tokens (sangat murah!)');
console.log('- 1 chat session: ~$0.01-0.05');
console.log('- 100 chat sessions: ~$1-5');

console.log('\n🔒 Security Tips:');
console.log('- Jangan commit .env ke repository');
console.log('- Monitor usage di OpenAI dashboard');
console.log('- Rotate keys secara berkala');

console.log('\n📊 Monitoring:');
console.log('- Usage: https://platform.openai.com/usage');
console.log('- API Keys: https://platform.openai.com/api-keys');
console.log('- Billing: https://platform.openai.com/account/billing');

console.log('\n🎉 Setelah setup selesai, chat AI akan:');
console.log('- Merespons dengan cerdas berdasarkan konteks');
console.log('- Mengetahui semua paket dan harga');
console.log('- Menyarankan solusi yang tepat');
console.log('- Mengarahkan ke kontak yang sesuai');
console.log('- Bekerja 24/7 tanpa lelah!');

rl.close();
