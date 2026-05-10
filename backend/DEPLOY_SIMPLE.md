# CARA DEPLOY KE VERCEL - SIMPLE VERSION

## Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

## Step 2: Login
```bash
vercel login
```

## Step 3: Deploy
```bash
cd horror-content-app/backend
vercel --prod
```

## Step 4: Set Environment Variables

Buka Vercel Dashboard > Project Settings > Environment Variables

Tambahkan 5 variables ini (copy dari VERCEL_ENV_VARS.txt):

1. TURSO_DATABASE_URL
2. TURSO_AUTH_TOKEN  
3. JWT_SECRET (ganti dengan random string!)
4. JWT_EXPIRE
5. NODE_ENV

## Step 5: Redeploy
```bash
vercel --prod
```

## Done!

Backend kamu sudah live di Vercel!

URL: https://your-project-name.vercel.app

Test dengan:
```bash
curl https://your-project-name.vercel.app/
```

Harusnya return:
```json
{
  "message": "Horror Content API is running..."
}
```

## Troubleshooting

Kalau ada error:
1. Cek Vercel logs di dashboard
2. Pastikan semua env vars sudah di-set
3. Cek VERCEL_DEPLOYMENT.md untuk detail
