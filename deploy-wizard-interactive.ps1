# ========================================
# HORROR CONTENT APP - DEPLOYMENT GUIDE
# ========================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "║     🎃 HORROR CONTENT APP - DEPLOYMENT GUIDE 🎃       ║" -ForegroundColor Yellow
Write-Host "║                                                        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "Saya akan membantu Anda deploy aplikasi step-by-step." -ForegroundColor White
Write-Host "Ikuti instruksi dengan teliti." -ForegroundColor White
Write-Host ""
Write-Host "Press ENTER to start..." -ForegroundColor Gray
Read-Host

Clear-Host

# ========================================
# STEP 1: MongoDB Atlas
# ========================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 1 of 3: Setup MongoDB Atlas (Database)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 INSTRUCTIONS:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Buka browser dan kunjungi:" -ForegroundColor White
Write-Host "   👉 https://www.mongodb.com/cloud/atlas" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Klik 'Try Free' atau 'Sign In'" -ForegroundColor White
Write-Host ""
Write-Host "3. Setelah login, klik 'Build a Database'" -ForegroundColor White
Write-Host ""
Write-Host "4. Pilih 'FREE' (M0) tier" -ForegroundColor White
Write-Host "   - Provider: AWS" -ForegroundColor Gray
Write-Host "   - Region: Pilih yang terdekat (Singapore/Jakarta)" -ForegroundColor Gray
Write-Host "   - Cluster Name: Cluster0 (default)" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Klik 'Create'" -ForegroundColor White
Write-Host ""
Write-Host "6. Security Quickstart:" -ForegroundColor White
Write-Host "   a. Username: horrorapp" -ForegroundColor Gray
Write-Host "   b. Password: (generate atau buat sendiri)" -ForegroundColor Gray
Write-Host "   c. SIMPAN username & password ini!" -ForegroundColor Red
Write-Host ""
Write-Host "7. Network Access:" -ForegroundColor White
Write-Host "   - IP Address: 0.0.0.0/0 (Allow access from anywhere)" -ForegroundColor Gray
Write-Host ""
Write-Host "8. Klik 'Connect' pada cluster Anda" -ForegroundColor White
Write-Host ""
Write-Host "9. Pilih 'Connect your application'" -ForegroundColor White
Write-Host ""
Write-Host "10. Copy connection string (akan terlihat seperti ini):" -ForegroundColor White
Write-Host "    mongodb+srv://horrorapp:<password>@cluster0.xxxxx.mongodb.net/" -ForegroundColor Gray
Write-Host ""
Write-Host "11. Replace <password> dengan password Anda" -ForegroundColor White
Write-Host "12. Tambahkan database name di akhir: /horror-content-db" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sudah selesai setup MongoDB Atlas?" -ForegroundColor Yellow
Write-Host "Paste connection string Anda di bawah ini:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Format: mongodb+srv://username:password@cluster.mongodb.net/horror-content-db" -ForegroundColor Gray
Write-Host ""

$mongoUri = Read-Host "MongoDB Connection String"

if (-not $mongoUri) {
    Write-Host ""
    Write-Host "⚠️  Connection string kosong!" -ForegroundColor Red
    Write-Host "Anda bisa lanjutkan nanti dengan menambahkan manual." -ForegroundColor Yellow
    Write-Host ""
    $mongoUri = "<YOUR_MONGODB_URI_HERE>"
} else {
    Write-Host ""
    Write-Host "✅ MongoDB URI tersimpan!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Press ENTER to continue to Step 2..." -ForegroundColor Gray
Read-Host

Clear-Host

# ========================================
# STEP 2: Backend Deployment (Railway)
# ========================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 2 of 3: Deploy Backend ke Railway" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 INSTRUCTIONS:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Buka browser dan kunjungi:" -ForegroundColor White
Write-Host "   👉 https://railway.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Klik 'Login' dan pilih 'Login with GitHub'" -ForegroundColor White
Write-Host ""
Write-Host "3. Authorize Railway untuk akses GitHub Anda" -ForegroundColor White
Write-Host ""
Write-Host "4. Klik 'New Project'" -ForegroundColor White
Write-Host ""
Write-Host "5. Pilih 'Deploy from GitHub repo'" -ForegroundColor White
Write-Host ""
Write-Host "6. Cari dan pilih: 'arratujuhkreasi/sosmed'" -ForegroundColor White
Write-Host ""
Write-Host "7. Klik 'Deploy Now'" -ForegroundColor White
Write-Host ""
Write-Host "8. Setelah deploy, klik pada service yang baru dibuat" -ForegroundColor White
Write-Host ""
Write-Host "9. Klik tab 'Variables'" -ForegroundColor White
Write-Host ""
Write-Host "10. Tambahkan Environment Variables berikut:" -ForegroundColor White
Write-Host ""
Write-Host "    Variable Name          | Value" -ForegroundColor Gray
Write-Host "    ─────────────────────────────────────────────" -ForegroundColor Gray
Write-Host "    NODE_ENV              | production" -ForegroundColor Cyan
Write-Host "    PORT                  | 5000" -ForegroundColor Cyan
Write-Host "    MONGO_URI             | $mongoUri" -ForegroundColor Cyan

$jwtSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
Write-Host "    JWT_SECRET            | $jwtSecret" -ForegroundColor Cyan
Write-Host "    JWT_EXPIRE            | 30d" -ForegroundColor Cyan
Write-Host ""
Write-Host "11. Klik 'Add' untuk setiap variable" -ForegroundColor White
Write-Host ""
Write-Host "12. Klik tab 'Settings'" -ForegroundColor White
Write-Host ""
Write-Host "13. Scroll ke 'Service' section" -ForegroundColor White
Write-Host ""
Write-Host "14. Set 'Root Directory' ke: backend" -ForegroundColor White
Write-Host ""
Write-Host "15. Railway akan auto-redeploy" -ForegroundColor White
Write-Host ""
Write-Host "16. Klik tab 'Deployments' dan tunggu hingga selesai" -ForegroundColor White
Write-Host ""
Write-Host "17. Klik tab 'Settings' lagi" -ForegroundColor White
Write-Host ""
Write-Host "18. Scroll ke 'Networking' dan klik 'Generate Domain'" -ForegroundColor White
Write-Host ""
Write-Host "19. Copy domain URL yang digenerate (contoh: your-app.railway.app)" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sudah selesai deploy backend?" -ForegroundColor Yellow
Write-Host "Paste Railway domain URL Anda di bawah ini:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Format: https://your-app.railway.app" -ForegroundColor Gray
Write-Host ""

$backendUrl = Read-Host "Backend URL"

if (-not $backendUrl) {
    Write-Host ""
    Write-Host "⚠️  Backend URL kosong!" -ForegroundColor Red
    Write-Host "Anda bisa lanjutkan nanti dengan menambahkan manual." -ForegroundColor Yellow
    Write-Host ""
    $backendUrl = "<YOUR_BACKEND_URL_HERE>"
} else {
    # Remove trailing slash if exists
    $backendUrl = $backendUrl.TrimEnd(''/'')
    Write-Host ""
    Write-Host "✅ Backend URL tersimpan!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Press ENTER to continue to Step 3..." -ForegroundColor Gray
Read-Host

Clear-Host

# ========================================
# STEP 3: Frontend Deployment (Vercel)
# ========================================
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "STEP 3 of 3: Deploy Frontend ke Vercel" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 INSTRUCTIONS:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Buka browser dan kunjungi:" -ForegroundColor White
Write-Host "   👉 https://vercel.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Klik 'Sign Up' atau 'Login'" -ForegroundColor White
Write-Host ""
Write-Host "3. Pilih 'Continue with GitHub'" -ForegroundColor White
Write-Host ""
Write-Host "4. Authorize Vercel untuk akses GitHub Anda" -ForegroundColor White
Write-Host ""
Write-Host "5. Klik 'Add New...' → 'Project'" -ForegroundColor White
Write-Host ""
Write-Host "6. Cari dan pilih: 'arratujuhkreasi/sosmed'" -ForegroundColor White
Write-Host ""
Write-Host "7. Klik 'Import'" -ForegroundColor White
Write-Host ""
Write-Host "8. Configure Project:" -ForegroundColor White
Write-Host "   - Framework Preset: Create React App" -ForegroundColor Gray
Write-Host "   - Root Directory: frontend" -ForegroundColor Gray
Write-Host ""
Write-Host "9. Expand 'Environment Variables'" -ForegroundColor White
Write-Host ""
Write-Host "10. Tambahkan variable berikut:" -ForegroundColor White
Write-Host ""
Write-Host "    Name: REACT_APP_API_URL" -ForegroundColor Cyan
Write-Host "    Value: $backendUrl/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "11. Klik 'Add'" -ForegroundColor White
Write-Host ""
Write-Host "12. Klik 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "13. Tunggu hingga deployment selesai (2-3 menit)" -ForegroundColor White
Write-Host ""
Write-Host "14. Setelah selesai, Vercel akan menampilkan URL aplikasi Anda" -ForegroundColor White
Write-Host "    (contoh: https://your-app.vercel.app)" -ForegroundColor Gray
Write-Host ""
Write-Host "15. Klik 'Visit' untuk membuka aplikasi" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sudah selesai deploy frontend?" -ForegroundColor Yellow
Write-Host "Paste Vercel URL Anda di bawah ini (optional):" -ForegroundColor Yellow
Write-Host ""
Write-Host "Format: https://your-app.vercel.app" -ForegroundColor Gray
Write-Host ""

$frontendUrl = Read-Host "Frontend URL (tekan ENTER jika belum)"

if ($frontendUrl) {
    Write-Host ""
    Write-Host "✅ Frontend URL tersimpan!" -ForegroundColor Green
} else {
    $frontendUrl = "<WILL_BE_PROVIDED_BY_VERCEL>"
}

Clear-Host

# ========================================
# DEPLOYMENT SUMMARY
# ========================================
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                        ║" -ForegroundColor Green
Write-Host "║           🎉 DEPLOYMENT SUMMARY 🎉                    ║" -ForegroundColor Yellow
Write-Host "║                                                        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📊 DEPLOYMENT INFORMATION" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "🗄️  Database (MongoDB Atlas):" -ForegroundColor Green
Write-Host "   $mongoUri" -ForegroundColor White
Write-Host ""
Write-Host "⚙️  Backend (Railway):" -ForegroundColor Green
Write-Host "   $backendUrl" -ForegroundColor White
Write-Host ""
Write-Host "🎨 Frontend (Vercel):" -ForegroundColor Green
Write-Host "   $frontendUrl" -ForegroundColor White
Write-Host ""
Write-Host "🔐 JWT Secret:" -ForegroundColor Green
Write-Host "   $jwtSecret" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ NEXT STEPS" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Test Backend API:" -ForegroundColor White
Write-Host "   Open: $backendUrl" -ForegroundColor Cyan
Write-Host "   Should see: {'message': 'Horror Content API is running...'}" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Test Frontend:" -ForegroundColor White
Write-Host "   Open: $frontendUrl" -ForegroundColor Cyan
Write-Host "   Should see: Horror Content App homepage" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Register New Account:" -ForegroundColor White
Write-Host "   - Click 'Register'" -ForegroundColor Gray
Write-Host "   - Fill in your details" -ForegroundColor Gray
Write-Host "   - Login and test features" -ForegroundColor Gray
Write-Host ""
Write-Host "4. (Optional) Seed Sample Data:" -ForegroundColor White
Write-Host "   - Go to Railway dashboard" -ForegroundColor Gray
Write-Host "   - Open your service" -ForegroundColor Gray
Write-Host "   - Click 'Deploy' tab" -ForegroundColor Gray
Write-Host "   - Click on latest deployment" -ForegroundColor Gray
Write-Host "   - Click 'View Logs'" -ForegroundColor Gray
Write-Host "   - In Railway CLI: railway run node seeder.js" -ForegroundColor Gray
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📝 SAVE THIS INFORMATION" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "Informasi di atas telah disimpan ke file:" -ForegroundColor White
Write-Host "deployment-info.txt" -ForegroundColor Cyan
Write-Host ""

# Save to file
$deploymentInfo = @"
HORROR CONTENT APP - DEPLOYMENT INFORMATION
============================================

Deployment Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

MongoDB Atlas:
$mongoUri

Backend (Railway):
$backendUrl

Frontend (Vercel):
$frontendUrl

JWT Secret:
$jwtSecret

Environment Variables for Backend:
-----------------------------------
NODE_ENV=production
PORT=5000
MONGO_URI=$mongoUri
JWT_SECRET=$jwtSecret
JWT_EXPIRE=30d

Environment Variables for Frontend:
------------------------------------
REACT_APP_API_URL=$backendUrl/api

Sample Login Credentials (after seeding):
------------------------------------------
Admin:
  Email: admin@horrorapp.com
  Password: admin123

Creator:
  Email: john@example.com
  Password: password123

"@

$deploymentInfo | Out-File -FilePath "deployment-info.txt" -Encoding UTF8

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎃 DEPLOYMENT WIZARD COMPLETE! 👻" -ForegroundColor Magenta
Write-Host ""
Write-Host "Your Horror Content App is now LIVE! 🔥" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
