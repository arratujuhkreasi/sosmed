# Horror Content App

Aplikasi web untuk membantu kreator konten YouTube dengan tema horror menemukan niche baru, membuat hook menarik, dan mengoptimalkan konten mereka.

## Fitur Utama

- **Pencarian Inspirasi**: Temukan tren dan topik yang sedang populer di YouTube
- **Analisis Performa**: Analisis performa konten dan dapatkan rekomendasi perbaikan
- **Optimasi Konten**: Tingkatkan engagement dan views konten Anda
- **Pencarian Niche**: Temukan niche baru yang belum banyak digarap
- **Membuat Hook**: Buat hook yang menarik untuk konten Anda
- **Manajemen Konten**: Kelola semua konten horror Anda dalam satu platform

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt.js

### Frontend
- React.js
- React Router
- Axios
- React Toastify
- Recharts

## Instalasi

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- MongoDB (lokal atau cloud)
- npm atau yarn

### Backend Setup

1. Masuk ke folder backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env` dari `.env.example`:
```bash
cp .env.example .env
```

4. Edit file `.env` dan sesuaikan konfigurasi:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/horror-content-db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
```

5. Jalankan server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### Frontend Setup

1. Masuk ke folder frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan aplikasi:
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Database

### User
- name: String
- email: String (unique)
- password: String (hashed)
- role: String (admin, creator, visitor)
- channelName: String
- isActive: Boolean

### Content
- user: ObjectId (ref: User)
- judul: String
- deskripsi: String
- tag: Array of Strings
- niche: String
- hook: String
- duration: Number (30-120 seconds)
- status: String (draft, published, archived)

### Performa
- content: ObjectId (ref: Content)
- views: Number
- likes: Number
- comments: Number
- shares: Number
- watchTime: Number
- engagementRate: Number
- recordedAt: Date

### Trend
- topic: String
- category: String (horror, creepypasta, urban-legend, paranormal, true-crime)
- keywords: Array of Strings
- popularity: Number
- trendingScore: Number
- source: String
- isActive: Boolean

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Content
- `POST /api/content` - Buat content baru (protected)
- `GET /api/content` - Get semua content user (protected)
- `GET /api/content/:id` - Get content by ID (protected)
- `PUT /api/content/:id` - Update content (protected)
- `DELETE /api/content/:id` - Delete content (protected)
- `GET /api/content/:id/performance` - Get performance content (protected)

### Performance
- `POST /api/performa` - Buat data performa (protected)
- `GET /api/performa/content/:contentId` - Get performa by content (protected)
- `GET /api/performa/content/:contentId/analytics` - Get analytics (protected)
- `PUT /api/performa/:id` - Update performa (protected)

### Trends
- `GET /api/trends` - Get semua trends
- `GET /api/trends/search?keyword=` - Search trends
- `GET /api/trends/:id` - Get trend by ID
- `POST /api/trends` - Create trend (admin only)
- `PUT /api/trends/:id` - Update trend (admin only)
- `DELETE /api/trends/:id` - Delete trend (admin only)

## User Roles

1. **Admin**: Dapat mengelola trends dan semua data
2. **Creator**: Dapat membuat dan mengelola konten sendiri
3. **Visitor**: Dapat melihat trends dan konten publik

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm start
```

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

## Contributing

Silakan buat pull request untuk kontribusi. Untuk perubahan besar, harap buka issue terlebih dahulu untuk mendiskusikan perubahan yang ingin Anda lakukan.

## License

MIT

## Support

Untuk pertanyaan dan dukungan, silakan buka issue di repository ini.
