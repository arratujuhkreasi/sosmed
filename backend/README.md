# Horror Content Backend - Turso Edition

Backend API untuk Horror Content App menggunakan Express.js, Turso (SQLite), dan Drizzle ORM.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Turso (LibSQL/SQLite)
- **ORM**: Drizzle ORM
- **Authentication**: JWT
- **Deployment**: Vercel

## Database Schema

### Users
- id (UUID)
- name
- email (unique)
- password (hashed)
- role (admin/creator/visitor)
- channelName
- isActive
- timestamps

### Contents
- id (UUID)
- userId (FK to users)
- judul
- deskripsi
- tag (JSON array)
- niche
- hook
- duration
- status (draft/published/archived)
- timestamps

### Trends
- id (UUID)
- topic
- category (horror/creepypasta/urban-legend/paranormal/true-crime)
- keywords (JSON array)
- popularity
- trendingScore
- source
- isActive
- timestamps

### Performas
- id (UUID)
- contentId (FK to contents)
- views
- likes
- comments
- shares
- watchTime
- engagementRate (calculated)
- recordedAt
- timestamps

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and update values:

```env
NODE_ENV=development
PORT=5000

# Turso Database
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

## Database Setup

Run migration to create tables:

```bash
node db/migrate.js
```

## Development

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

## Production

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Content
- `GET /api/content` - Get all user contents (protected)
- `GET /api/content/:id` - Get content by ID (protected)
- `POST /api/content` - Create new content (protected)
- `PUT /api/content/:id` - Update content (protected)
- `DELETE /api/content/:id` - Delete content (protected)
- `GET /api/content/:id/performance` - Get content performance (protected)

### Trends
- `GET /api/trends` - Get all trends
- `GET /api/trends/:id` - Get trend by ID
- `POST /api/trends` - Create new trend (protected)
- `PUT /api/trends/:id` - Update trend (protected)
- `DELETE /api/trends/:id` - Delete trend (protected)
- `GET /api/trends/search?keyword=` - Search trends

### Performance
- `POST /api/performa` - Create performance data (protected)
- `GET /api/performa/content/:contentId` - Get performance by content (protected)
- `GET /api/performa/analytics/:contentId` - Get performance analytics (protected)
- `PUT /api/performa/:id` - Update performance data (protected)

## Deployment to Vercel

### Quick Deploy

```bash
npm run deploy
```

### Manual Deploy

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
vercel --prod
```

4. Set environment variables di Vercel dashboard atau gunakan:
```bash
vercel env add TURSO_DATABASE_URL
vercel env add TURSO_AUTH_TOKEN
vercel env add JWT_SECRET
vercel env add JWT_EXPIRE
```

Lihat [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) untuk panduan lengkap.

## Project Structure

```
backend/
├── config/          # Configuration files
│   └── db.js        # Database connection
├── controllers/    # Route controllers
│   ├── authController.js
│   ├── contentController.js
│   ├── performaController.js
│   └── trendController.js
├── db/             # Database layer
│   ├── schema.js    # Drizzle schema
│   ├── index.js     # Database client
│   ├── helpers.js   # Query helpers
│   └── migrate.js   # Migration script
├── middleware/     # Express middleware
│   ├── auth.js
│   └── errorHandler.js
├── routes/         # API routes
│   ├── authRoutes.js
│   ├── contentRoutes.js
│   ├── performaRoutes.js
│   └── trendRoutes.js
├── utils/          # Utility functions
│   └── generateToken.js
├── .env            # Environment variables
├── .env.example    # Environment template
├── server.js       # Express app
├── vercel.json     # Vercel config
└── package.json    # Dependencies
```

## Migration from MongoDB

Project ini sudah di-migrate dari MongoDB ke Turso:

- ✅ Mongoose models → Drizzle schema
- ✅ MongoDB queries → Drizzle queries
- ✅ ObjectId → UUID
- ✅ Timestamps handling
- ✅ Relations (foreign keys)
- ✅ JSON fields (arrays)

## Testing

Test database connection:

```bash
node -e "require('dotenv').config(); const { client } = require('./db'); client.execute('SELECT 1').then(() => console.log('Connected!')).catch(console.error);"
```

## License

ISC
