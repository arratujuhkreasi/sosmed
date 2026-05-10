# Deployment Guide

## Prerequisites

- Node.js v14+
- MongoDB (local atau cloud seperti MongoDB Atlas)
- npm atau yarn

## Local Development

### 1. Clone Repository
```bash
git clone <repository-url>
cd horror-content-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/horror-content-db
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
```

Jalankan server:
```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

## Production Deployment

### Backend Deployment (AWS EC2 / Heroku / DigitalOcean)

#### 1. Setup Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/horror-content-db
JWT_SECRET=your_production_secret_key_very_long_and_secure
JWT_EXPIRE=30d
```

#### 2. Install Dependencies
```bash
cd backend
npm install --production
```

#### 3. Start Server
```bash
npm start
```

#### 4. Setup Process Manager (PM2)
```bash
npm install -g pm2
pm2 start server.js --name horror-content-api
pm2 save
pm2 startup
```

### Frontend Deployment (Vercel / Netlify / AWS S3)

#### 1. Build Production
```bash
cd frontend
npm run build
```

#### 2. Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

#### 3. Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### MongoDB Atlas Setup

1. Buat account di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Buat cluster baru
3. Whitelist IP address server Anda
4. Buat database user
5. Copy connection string ke `.env`

### Environment Variables untuk Production

**Backend:**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=very_long_random_secret_key_min_32_characters
JWT_EXPIRE=30d
```

**Frontend:**
Buat file `.env.production`:
```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

## Docker Deployment

### Backend Dockerfile
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Dockerfile
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongodb:27017/horror-content-db
      - JWT_SECRET=your_secret_key
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

Jalankan dengan:
```bash
docker-compose up -d
```

## Security Checklist

- [ ] Ganti JWT_SECRET dengan string random yang kuat
- [ ] Gunakan HTTPS untuk production
- [ ] Setup CORS dengan whitelist domain
- [ ] Enable rate limiting
- [ ] Setup MongoDB authentication
- [ ] Whitelist IP di MongoDB Atlas
- [ ] Gunakan environment variables untuk semua secrets
- [ ] Enable helmet.js untuk security headers
- [ ] Setup backup database regular
- [ ] Monitor logs dan errors

## Performance Optimization

### Backend
- Enable compression middleware
- Setup Redis untuk caching
- Optimize database queries dengan indexing
- Use CDN untuk static assets

### Frontend
- Code splitting
- Lazy loading components
- Image optimization
- Enable service worker untuk PWA

## Monitoring

### Backend Monitoring
- Setup PM2 monitoring
- Use logging service (Winston, Morgan)
- Setup error tracking (Sentry)

### Database Monitoring
- MongoDB Atlas monitoring
- Setup alerts untuk performance issues

## Backup Strategy

### Database Backup
```bash
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/dbname" --out=/backup/$(date +%Y%m%d)
```

### Automated Backup (Cron)
```bash
0 2 * * * /path/to/backup-script.sh
```

## Troubleshooting

### Backend tidak bisa connect ke MongoDB
- Check MONGO_URI di .env
- Verify MongoDB service running
- Check network/firewall settings

### Frontend tidak bisa connect ke Backend
- Check REACT_APP_API_URL
- Verify CORS settings di backend
- Check backend server running

### JWT Token Issues
- Verify JWT_SECRET sama di semua instances
- Check token expiration
- Clear localStorage dan login ulang
