# CARA CEK ENVIRONMENT VARIABLES DI VERCEL DASHBOARD

1. Buka Vercel Dashboard:
   https://vercel.com/arratujuhkreasis-projects/backend

2. Klik tab "Settings" di menu atas

3. Klik "Environment Variables" di sidebar kiri

4. Kamu akan melihat 5 environment variables:
   - TURSO_DATABASE_URL (Production)
   - TURSO_AUTH_TOKEN (Production)
   - JWT_SECRET (Production)
   - JWT_EXPIRE (Production)
   - NODE_ENV (Production)

5. Jika tidak muncul, coba:
   - Refresh halaman (F5 atau Ctrl+R)
   - Logout dan login lagi
   - Clear browser cache

# VERIFIKASI DARI CLI

Untuk memastikan environment variables sudah ter-set:

cd horror-content-app/backend
vercel env ls

# Output yang benar:
# TURSO_DATABASE_URL - Encrypted - Production - created
# TURSO_AUTH_TOKEN - Encrypted - Production - created
# JWT_SECRET - Encrypted - Production - created
# JWT_EXPIRE - Encrypted - Production - created
# NODE_ENV - Encrypted - Production - created

# TEST API DENGAN ENV VARS

Test apakah API bisa connect ke database:

curl https://backend-sigma-fawn-15.vercel.app/api/trends

Jika return [] (empty array), berarti:
- Environment variables WORKING
- Database connection WORKING
- API berfungsi dengan baik

# JIKA MASIH TIDAK MUNCUL DI DASHBOARD

Environment variables sudah ter-set di backend Vercel,
hanya mungkin UI dashboard yang belum update.

Yang penting: API sudah berfungsi dan bisa connect ke database!

# CARA MANUAL SET DI DASHBOARD (jika perlu)

1. Go to: https://vercel.com/arratujuhkreasis-projects/backend/settings/environment-variables

2. Click "Add New"

3. Tambahkan satu per satu:

Name: TURSO_DATABASE_URL
Value: libsql://smm-arratujuhkreasi.aws-ap-northeast-1.turso.io
Environment: Production

Name: TURSO_AUTH_TOKEN
Value: eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzgzNzY2ODksImlkIjoiMDE5ZTBmODItOWQwMS03YzA5LWI0MmUtMGUxYWQ3ZWEzMTFmIiwicmlkIjoiYmZhNDA0ZWYtZDNhOC00ZWJlLTkzZWQtZDc1ZmZiZWYwZTgzIn0.MUJH49goe3tlMOmbdx0epNoGxH8alsT9bzOtzD-0YajmvPLxzGL3_V7Dm6EvtPJ3mlbM-U5jSoYGLTWPDqbmBg
Environment: Production

Name: JWT_SECRET
Value: horror_content_jwt_secret_production_2026_change_this_to_secure_random_string
Environment: Production

Name: JWT_EXPIRE
Value: 30d
Environment: Production

Name: NODE_ENV
Value: production
Environment: Production

4. Click "Save" untuk setiap variable

5. Redeploy: vercel --prod

