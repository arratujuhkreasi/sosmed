# Quick Start Guide

## 🚀 Instalasi Cepat

### Prerequisites
- Node.js v14+
- MongoDB (local atau MongoDB Atlas)
- npm atau yarn

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd horror-content-app
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` dan sesuaikan konfigurasi:
```env
MONGO_URI=mongodb://localhost:27017/horror-content-db
JWT_SECRET=your_secret_key_here
```

Jalankan backend:
```bash
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### 3. Setup Frontend

Buka terminal baru:

```bash
cd frontend
npm install
npm start
```

Frontend akan berjalan di `http://localhost:3000`

### 4. (Opsional) Seed Data

Untuk mengisi database dengan data contoh:

```bash
cd backend
node seeder.js
```

Data yang akan dibuat:
- 2 user (admin & creator)
- 8 trending topics

Login credentials:
- Admin: `admin@horrorapp.com` / `admin123`
- Creator: `john@example.com` / `password123`

## ✨ Fitur Utama

✅ **Authentication** - Register, Login, JWT
✅ **Content Management** - CRUD konten horror
✅ **Trends Discovery** - Temukan topik trending
✅ **Performance Tracking** - Track views, likes, engagement
✅ **Niche Finder** - Temukan niche baru
✅ **Hook Generator** - Buat hook menarik
✅ **Dashboard** - Overview statistik
✅ **Responsive Design** - Mobile friendly

## 📚 Dokumentasi

- [README.md](../README.md) - Overview lengkap
- [API.md](./API.md) - API documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [USER_GUIDE.md](./USER_GUIDE.md) - User manual

## 🐛 Troubleshooting

### Backend tidak bisa connect ke MongoDB
```bash
# Pastikan MongoDB running
mongod --version

# Atau gunakan MongoDB Atlas (cloud)
# Update MONGO_URI di .env dengan connection string Atlas
```

### Port sudah digunakan
```bash
# Ubah PORT di backend/.env
PORT=5001

# Atau kill process yang menggunakan port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill -9
```

### Frontend tidak bisa connect ke Backend
```bash
# Pastikan backend running di port 5000
# Check REACT_APP_API_URL di frontend/.env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🛠️ Development Commands

### Backend
```bash
npm run dev      # Development mode dengan nodemon
npm start        # Production mode
node seeder.js   # Import sample data
node seeder.js -d # Delete all data
```

### Frontend
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
```

## 💻 Tech Stack

**Frontend:**
- React 18
- React Router v6
- Axios
- React Toastify
- Recharts

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js

## 👥 User Roles

1. **Admin** - Manage trends, full access
2. **Creator** - Create & manage own content
3. **Visitor** - View trends & public content

## 🎯 Next Steps

1. Register akun baru atau login dengan sample user
2. Explore trends di halaman Trends
3. Buat konten pertama Anda
4. Track performa konten
5. Optimize berdasarkan data

## 🤝 Contributing

Lihat [CONTRIBUTING.md](../CONTRIBUTING.md) untuk guidelines.

## 📝 License

MIT License - lihat [LICENSE](../LICENSE)

---

**Happy Coding! 🎃**
