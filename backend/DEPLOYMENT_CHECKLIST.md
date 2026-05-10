# Deployment Checklist

## Pre-Deployment

- [x] Turso database created
- [x] Database tables migrated
- [x] Database connection tested
- [x] Environment variables configured
- [x] Code migrated from MongoDB to Turso
- [x] All controllers updated
- [x] Middleware updated
- [x] vercel.json created
- [x] Documentation created

## Deployment Steps

- [ ] Install Vercel CLI: npm i -g vercel
- [ ] Login to Vercel: vercel login
- [ ] Deploy: npm run deploy
- [ ] Add environment variables in Vercel dashboard
- [ ] Test deployment URL
- [ ] Verify all endpoints work

## Post-Deployment

- [ ] Test user registration
- [ ] Test user login
- [ ] Test content creation
- [ ] Test trends API
- [ ] Test performance tracking
- [ ] Update frontend API URL
- [ ] Test frontend integration
- [ ] Monitor Vercel logs
- [ ] Setup custom domain (optional)

## Environment Variables to Set in Vercel

1. TURSO_DATABASE_URL
2. TURSO_AUTH_TOKEN
3. JWT_SECRET (change from default!)
4. JWT_EXPIRE
5. NODE_ENV

All values are in VERCEL_ENV_VARS.txt

## Testing Commands

Local:
```bash
cd horror-content-app/backend
npm run dev
node test-api.js
```

Production:
```bash
curl https://your-project.vercel.app/
```

## Rollback Plan

If deployment fails:
1. Check Vercel logs
2. Verify environment variables
3. Test database connection
4. Redeploy previous version
5. Contact support if needed
