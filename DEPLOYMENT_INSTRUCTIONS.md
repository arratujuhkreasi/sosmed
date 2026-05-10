# Deployment Instructions

## Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy Frontend
```bash
cd frontend
vercel --prod
```

### Step 4: Set Environment Variables in Vercel Dashboard
- Go to Vercel Dashboard
- Select your project
- Go to Settings > Environment Variables
- Add: `REACT_APP_API_URL` = your backend URL

---

## Backend Deployment (Railway)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Initialize Project
```bash
cd backend
railway init
```

### Step 4: Add Environment Variables
```bash
railway variables set NODE_ENV=production
railway variables set PORT=5000
railway variables set MONGO_URI=your_mongodb_atlas_uri
railway variables set JWT_SECRET=your_secure_jwt_secret
railway variables set JWT_EXPIRE=30d
```

### Step 5: Deploy
```bash
railway up
```

---

## MongoDB Atlas Setup

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (Free tier)

### Step 2: Configure Database
1. Create database user
2. Whitelist IP addresses (0.0.0.0/0 for all IPs)
3. Get connection string

### Step 3: Update Environment Variables
Replace `MONGO_URI` with your Atlas connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/horror-content-db?retryWrites=true&w=majority
```

---

## Alternative: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Create New Web Service
1. Click "New +" > "Web Service"
2. Connect your GitHub repository
3. Select backend folder

### Step 3: Configure Service
- Name: horror-content-api
- Environment: Node
- Build Command: `npm install`
- Start Command: `npm start`

### Step 4: Add Environment Variables
Add all variables from .env file

### Step 5: Deploy
Click "Create Web Service"

---

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] MongoDB Atlas configured
- [ ] Environment variables set correctly
- [ ] CORS configured for frontend domain
- [ ] Test API endpoints
- [ ] Test frontend-backend connection
- [ ] Test authentication flow
- [ ] Test all features
- [ ] Monitor logs for errors

---

## Deployment URLs

After deployment, update these in your documentation:

- Frontend URL: https://your-app.vercel.app
- Backend URL: https://your-api.railway.app
- MongoDB: mongodb+srv://...

---

## Troubleshooting

### Frontend Issues
- Check build logs in Vercel
- Verify REACT_APP_API_URL is set
- Check browser console for errors

### Backend Issues
- Check Railway/Render logs
- Verify MongoDB connection
- Check environment variables
- Verify CORS settings

### Database Issues
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check database user permissions
