# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Semua endpoint yang memerlukan autentikasi harus menyertakan token JWT di header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication Endpoints

#### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "creator",
  "channelName": "Horror Stories Channel"
}
```

**Response:**
```json
{
  "_id": "123456",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "creator",
  "channelName": "Horror Stories Channel",
  "token": "jwt_token_here"
}
```

#### Login User
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "123456",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "creator",
  "channelName": "Horror Stories Channel",
  "token": "jwt_token_here"
}
```

#### Get User Profile
```
GET /auth/profile
```
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "_id": "123456",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "creator",
  "channelName": "Horror Stories Channel"
}
```

#### Update User Profile
```
PUT /auth/profile
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Updated",
  "channelName": "New Channel Name"
}
```

### Content Endpoints

#### Create Content
```
POST /content
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "judul": "Hantu di Rumah Tua",
  "deskripsi": "Cerita tentang rumah berhantu yang ditinggalkan selama 50 tahun",
  "tag": ["horror", "ghost", "haunted-house"],
  "niche": "Indonesian Horror",
  "hook": "Apa yang terjadi ketika seorang pria memasuki rumah yang ditinggalkan selama 50 tahun?",
  "duration": 60,
  "status": "draft"
}
```

**Response:**
```json
{
  "_id": "content123",
  "user": "123456",
  "judul": "Hantu di Rumah Tua",
  "deskripsi": "Cerita tentang rumah berhantu yang ditinggalkan selama 50 tahun",
  "tag": ["horror", "ghost", "haunted-house"],
  "niche": "Indonesian Horror",
  "hook": "Apa yang terjadi ketika seorang pria memasuki rumah yang ditinggalkan selama 50 tahun?",
  "duration": 60,
  "status": "draft",
  "createdAt": "2026-05-10T00:00:00.000Z",
  "updatedAt": "2026-05-10T00:00:00.000Z"
}
```

#### Get All User Contents
```
GET /content
```
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "content123",
    "user": {
      "_id": "123456",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "judul": "Hantu di Rumah Tua",
    "deskripsi": "Cerita tentang rumah berhantu",
    "tag": ["horror", "ghost"],
    "status": "published",
    "createdAt": "2026-05-10T00:00:00.000Z"
  }
]
```

#### Get Content by ID
```
GET /content/:id
```
**Headers:** `Authorization: Bearer <token>`

#### Update Content
```
PUT /content/:id
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "published"
}
```

#### Delete Content
```
DELETE /content/:id
```
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Content removed"
}
```

### Performance Endpoints

#### Create Performance Data
```
POST /performa
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "contentId": "content123",
  "views": 10000,
  "likes": 500,
  "comments": 50,
  "shares": 20,
  "watchTime": 8000
}
```

#### Get Performance by Content
```
GET /performa/content/:contentId
```
**Headers:** `Authorization: Bearer <token>`

#### Get Performance Analytics
```
GET /performa/content/:contentId/analytics
```
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "totalRecords": 5,
  "latestPerformance": {
    "views": 10000,
    "likes": 500,
    "comments": 50,
    "engagementRate": 5.7
  },
  "totalViews": 45000,
  "averageEngagementRate": "5.20",
  "trend": []
}
```

### Trends Endpoints

#### Get All Trends
```
GET /trends?category=horror&limit=10
```

**Query Parameters:**
- `category` (optional): horror, creepypasta, urban-legend, paranormal, true-crime
- `limit` (optional): default 10

**Response:**
```json
[
  {
    "_id": "trend123",
    "topic": "Pocong Challenge",
    "category": "horror",
    "keywords": ["pocong", "challenge", "viral"],
    "popularity": 8500,
    "trendingScore": 95,
    "source": "YouTube Trending",
    "isActive": true,
    "createdAt": "2026-05-10T00:00:00.000Z"
  }
]
```

#### Search Trends
```
GET /trends/search?keyword=ghost
```

**Query Parameters:**
- `keyword` (required): search keyword

#### Get Trend by ID
```
GET /trends/:id
```

#### Create Trend (Admin Only)
```
POST /trends
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "topic": "Pocong Challenge",
  "category": "horror",
  "keywords": ["pocong", "challenge", "viral"],
  "popularity": 8500,
  "trendingScore": 95,
  "source": "YouTube Trending"
}
```

#### Update Trend (Admin Only)
```
PUT /trends/:id
```
**Headers:** `Authorization: Bearer <token>`

#### Delete Trend (Admin Only)
```
DELETE /trends/:id
```
**Headers:** `Authorization: Bearer <token>`

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid user data"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "User role creator is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "message": "Content not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Server Error"
}
```
