# DEPLOYMENT HELPER SCRIPT
# Horror Content App - Automated Deployment Guide

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "HORROR CONTENT APP - DEPLOYMENT WIZARD" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This wizard will help you deploy your application." -ForegroundColor White
Write-Host ""

# Step 1: MongoDB Atlas
Write-Host "STEP 1: MongoDB Atlas Setup" -ForegroundColor Green
Write-Host "---------------------------" -ForegroundColor Green
Write-Host "1. Open browser: https://www.mongodb.com/cloud/atlas" -ForegroundColor White
Write-Host "2. Sign up or login" -ForegroundColor White
Write-Host "3. Create a FREE cluster (M0)" -ForegroundColor White
Write-Host "4. Create database user (save username & password)" -ForegroundColor White
Write-Host "5. Whitelist IP: 0.0.0.0/0 (allow all)" -ForegroundColor White
Write-Host "6. Get connection string" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "Connection string format:" -ForegroundColor Yellow
Write-Host "mongodb+srv://username:password@cluster.mongodb.net/horror-content-db" -ForegroundColor Cyan
Write-Host ""

$mongoUri = Read-Host "Paste your MongoDB connection string here"
Write-Host ""

if ($mongoUri) {
    Write-Host "✅ MongoDB URI saved!" -ForegroundColor Green
} else {
    Write-Host "⚠️  No MongoDB URI provided. You\'ll need to add it later." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to continue to Step 2..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Write-Host ""

# Step 2: Backend Deployment
Write-Host "STEP 2: Backend Deployment (Railway)" -ForegroundColor Green
Write-Host "------------------------------------" -ForegroundColor Green
Write-Host "1. Open browser: https://railway.app" -ForegroundColor White
Write-Host "2. Click \'Login with GitHub\'" -ForegroundColor White
Write-Host "3. Click \'New Project\'" -ForegroundColor White
Write-Host "4. Select \'Deploy from GitHub repo\'" -ForegroundColor White
Write-Host "5. Choose: arratujuhkreasi/sosmed" -ForegroundColor White
Write-Host "6. Root Directory: backend" -ForegroundColor White
Write-Host "7. Add Environment Variables:" -ForegroundColor White
Write-Host ""
Write-Host "   NODE_ENV=production" -ForegroundColor Cyan
Write-Host "   PORT=5000" -ForegroundColor Cyan
Write-Host "   MONGO_URI=$mongoUri" -ForegroundColor Cyan
Write-Host "   JWT_SECRET=$(Get-Random -Minimum 100000000 -Maximum 999999999)$(Get-Random -Minimum 100000000 -Maximum 999999999)" -ForegroundColor Cyan
Write-Host "   JWT_EXPIRE=30d" -ForegroundColor Cyan
Write-Host ""
Write-Host "8. Click \'Deploy\'" -ForegroundColor White
Write-Host "9. Wait for deployment to complete" -ForegroundColor White
Write-Host "10. Copy your backend URL (e.g., https://your-app.railway.app)" -ForegroundColor White
Write-Host ""

$backendUrl = Read-Host "Paste your Railway backend URL here"
Write-Host ""

if ($backendUrl) {
    Write-Host "✅ Backend URL saved!" -ForegroundColor Green
} else {
    Write-Host "⚠️  No backend URL provided. You\'ll need to add it later." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to continue to Step 3..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Write-Host ""

# Step 3: Frontend Deployment
Write-Host "STEP 3: Frontend Deployment (Vercel)" -ForegroundColor Green
Write-Host "-------------------------------------" -ForegroundColor Green
Write-Host "1. Open browser: https://vercel.com" -ForegroundColor White
Write-Host "2. Click \'Login with GitHub\'" -ForegroundColor White
Write-Host "3. Click \'Add New\' → \'Project\'" -ForegroundColor White
Write-Host "4. Import: arratujuhkreasi/sosmed" -ForegroundColor White
Write-Host "5. Root Directory: frontend" -ForegroundColor White
Write-Host "6. Framework Preset: Create React App" -ForegroundColor White
Write-Host "7. Add Environment Variable:" -ForegroundColor White
Write-Host ""
Write-Host "   REACT_APP_API_URL=$backendUrl/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "8. Click \'Deploy\'" -ForegroundColor White
Write-Host "9. Wait for deployment to complete" -ForegroundColor White
Write-Host "10. Your app will be live at: https://your-app.vercel.app" -ForegroundColor White
Write-Host ""

$frontendUrl = Read-Host "Paste your Vercel frontend URL here (optional)"
Write-Host ""

if ($frontendUrl) {
    Write-Host "✅ Frontend URL saved!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DEPLOYMENT SUMMARY" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "MongoDB URI: $mongoUri" -ForegroundColor White
Write-Host "Backend URL: $backendUrl" -ForegroundColor White
Write-Host "Frontend URL: $frontendUrl" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Test your backend: $backendUrl" -ForegroundColor White
Write-Host "2. Test your frontend: $frontendUrl" -ForegroundColor White
Write-Host "3. Register a new account" -ForegroundColor White
Write-Host "4. Test all features" -ForegroundColor White
Write-Host "5. Seed sample data (optional):" -ForegroundColor White
Write-Host "   - SSH to Railway" -ForegroundColor Gray
Write-Host "   - Run: node seeder.js" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 Deployment Complete! 🎃👻" -ForegroundColor Magenta
Write-Host ""
