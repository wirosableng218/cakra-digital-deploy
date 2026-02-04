# Cakra Digital Innovation - React App with Vercel Deployment

Aplikasi React dengan API serverless yang siap di-deploy ke Vercel.

## 🚀 Fitur

- **React Frontend**: Aplikasi React modern dengan React Router
- **Serverless API**: API menggunakan Vercel Functions
- **MySQL Database**: Koneksi database MySQL
- **Responsive Design**: UI yang responsif untuk desktop dan mobile
- **API Testing**: Halaman test untuk API endpoints

## 📁 Struktur Proyek

```
cakra-digital-innovation/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Komponen React
│   │   ├── api.js         # API utility functions
│   │   └── ...
│   └── package.json
├── api/                   # Vercel serverless functions
│   ├── index.js          # Main API handler
│   └── package.json
├── vercel.json           # Vercel configuration
├── .env.example          # Environment variables template
└── README.md
```

## 🛠️ Setup Lokal

### Prerequisites

- Node.js (v18 atau lebih tinggi)
- MySQL database

### Installation

1. Clone repository:
```bash
git clone <repository-url>
cd cakra-digital-innovation
```

2. Install dependencies:
```bash
npm run install-all
```

3. Setup environment variables:
```bash
cp .env.example .env
# Edit .env dengan database credentials Anda
```

4. Setup database:
```sql
CREATE DATABASE cakra_digital;
USE cakra_digital;

-- Buat tabel users (contoh)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel contacts (contoh)
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Jalankan aplikasi:
```bash
npm start
```

Aplikasi akan berjalan di:
- Frontend: http://localhost:3002
- API: http://localhost:5000

## 🚀 Deployment ke Vercel

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Setup Environment Variables di Vercel

Login ke Vercel dashboard dan set environment variables:
- `DB_HOST`: MySQL host
- `DB_USER`: MySQL username  
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: Database name

### 3. Deploy

```bash
vercel --prod
```

Atau connect repository GitHub Anda dengan Vercel untuk auto-deployment.

## 📡 API Endpoints

### GET /api/health
Check API health status.

### GET /api/users
Get list of users.

### POST /api/contact
Submit contact form.
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "message": "Hello World"
}
```

## 🧪 Testing API

Buka http://localhost:3002/api-test untuk halaman testing API.

## 📝 Environment Variables

Copy `.env.example` ke `.env` dan konfigurasi:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cakra_digital
```

Untuk production, set variables ini di Vercel dashboard.

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License
