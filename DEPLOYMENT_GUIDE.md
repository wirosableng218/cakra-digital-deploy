# Panduan Deployment Terpisah

## Development vs Production

### 1. Branch Strategy
- `main` → Production (Vercel Production)
- `development` → Preview (Vercel Preview)
- `feature/*` → Preview (Vercel Preview)

### 2. Setup Commands

```bash
# Buat branch development
git checkout -b development

# Push ke development
git push origin development

# Preview URL akan dibuat otomatis
```

### 3. Merge ke Production
```bash
# Saat siap ke production
git checkout main
git merge development
git push origin main
# Production akan ter-update
```

### 4. Environment Setup
- `.env.local` → Local development
- `.env.production` → Production (di Vercel dashboard)

### 5. Manual Deployment (Optional)
```bash
# Deploy manual ke production
vercel --prod

# Preview deployment
vercel
```

## Best Practices
1. Test di Preview URL sebelum merge ke main
2. Gunakan environment variables yang berbeda
3. Review changes sebelum production deployment
4. Backup production sebelum major changes
