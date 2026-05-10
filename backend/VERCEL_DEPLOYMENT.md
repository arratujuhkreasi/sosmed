# Vercel Deployment Guide

## Prerequisites
- Vercel account
- Vercel CLI installed: `npm i -g vercel`

## Environment Variables Setup

Add these environment variables to your Vercel project:

```bash
NODE_ENV=production
TURSO_DATABASE_URL=libsql://smm-arratujuhkreasi.aws-ap-northeast-1.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzgzNzY2ODksImlkIjoiMDE5ZTBmODItOWQwMS03YzA5LWI0MmUtMGUxYWQ3ZWEzMTFmIiwicmlkIjoiYmZhNDA0ZWYtZDNhOC00ZWJlLTkzZWQtZDc1ZmZiZWYwZTgzIn0.MUJH49goe3tlMOmbdx0epNoGxH8alsT9bzOtzD-0YajmvPLxzGL3_V7Dm6EvtPJ3mlbM-U5jSoYGLTWPDqbmBg
JWT_SECRET=your_production_jwt_secret_key_change_this
JWT_EXPIRE=30d
```

## Deployment Steps

### Option 1: Using Vercel CLI

1. Login to Vercel:
```bash
vercel login
```

2. Navigate to backend directory:
```bash
cd horror-content-app/backend
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New" > "Project"
3. Import your Git repository
4. Set root directory to `backend`
5. Add environment variables in project settings
6. Deploy

### Option 3: Using Vercel CLI with Environment Variables

```bash
cd horror-content-app/backend
vercel --prod \
  -e TURSO_DATABASE_URL=libsql://smm-arratujuhkreasi.aws-ap-northeast-1.turso.io \
  -e TURSO_AUTH_TOKEN=your_token_here \
  -e JWT_SECRET=your_jwt_secret \
  -e JWT_EXPIRE=30d
```

## Database Migration

The database tables are already created. If you need to recreate them:

```bash
node db/migrate.js
```

## Testing the Deployment

After deployment, test the API:

```bash
curl https://your-vercel-url.vercel.app/
```

Expected response:
```json
{
  "message": "Horror Content API is running..."
}
```

## API Endpoints

- `GET /` - Health check
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/content` - Get all contents (protected)
- `POST /api/content` - Create content (protected)
- `GET /api/trends` - Get trends
- `POST /api/performa` - Create performance data (protected)

## Troubleshooting

### Database Connection Issues
- Verify TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are set correctly
- Check Turso dashboard for database status

### JWT Issues
- Make sure JWT_SECRET is set and matches across all environments

### CORS Issues
- Update CORS settings in server.js if needed for your frontend domain

## Next Steps

1. Update frontend API URL to point to Vercel deployment
2. Test all endpoints
3. Monitor logs in Vercel dashboard
4. Set up custom domain (optional)
