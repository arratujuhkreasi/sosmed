# Quick Start Guide

## Local Development

1. Install dependencies:
```bash
cd horror-content-app/backend
npm install
```

2. Environment is already configured in .env file

3. Database tables are already created in Turso

4. Start development server:
```bash
npm run dev
```

5. Test API:
```bash
node test-api.js
```

## Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
cd horror-content-app/backend
npm run deploy
```

4. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Copy values from VERCEL_ENV_VARS.txt

### Method 2: Vercel Dashboard

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Set Root Directory to: backend
5. Add environment variables from VERCEL_ENV_VARS.txt
6. Click Deploy

## Environment Variables Required

- TURSO_DATABASE_URL (already in VERCEL_ENV_VARS.txt)
- TURSO_AUTH_TOKEN (already in VERCEL_ENV_VARS.txt)
- JWT_SECRET (change to random string for production)
- JWT_EXPIRE (default: 30d)
- NODE_ENV (set to: production)

## API Endpoints

Base URL (local): http://localhost:5000
Base URL (production): https://your-project.vercel.app

### Public Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/trends
- GET /api/trends/search?keyword=horror

### Protected Endpoints (require JWT token)
- GET /api/auth/profile
- PUT /api/auth/profile
- GET /api/content
- POST /api/content
- GET /api/content/:id
- PUT /api/content/:id
- DELETE /api/content/:id
- POST /api/performa
- GET /api/performa/content/:contentId

## Testing

### Register a user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "creator"
  }
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d {
    "email": "test@example.com",
    "password": "password123"
  }
```

## Documentation Files

- README.md - Complete documentation
- VERCEL_DEPLOYMENT.md - Detailed deployment guide
- TURSO_MIGRATION_SUMMARY.md - Migration summary
- VERCEL_ENV_VARS.txt - Environment variables for Vercel
- QUICK_START.md - This file

## Support

If you encounter issues:
1. Check .env file has correct values
2. Verify database connection: node db/migrate.js
3. Check Vercel logs in dashboard
4. Review error messages in console
