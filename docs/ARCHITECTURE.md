# Architecture Documentation

## System Architecture

### High-Level Architecture

```
┌─────────────────┐
│                 │
│   Frontend      │
│   (React)       │
│                 │
└────────┬────────┘
         │
         │ HTTP/REST API
         │
┌────────▼────────┐
│                 │
│   Backend       │
│   (Node.js)     │
│   (Express)     │
│                 │
└────────┬────────┘
         │
         │ MongoDB Driver
         │
┌────────▼────────┐
│                 │
│   Database      │
│   (MongoDB)     │
│                 │
└─────────────────┘
```

## Frontend Architecture

### Component Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js
│   └── PrivateRoute.js
├── pages/              # Page components
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   ├── Trends.js
│   ├── ContentList.js
│   └── ContentForm.js
├── context/            # React Context
│   └── AuthContext.js
├── services/           # API services
│   ├── api.js
│   ├── authService.js
│   ├── contentService.js
│   ├── trendService.js
│   └── performaService.js
├── utils/              # Utility functions
│   ├── helpers.js
│   └── constants.js
├── styles/             # CSS files
│   ├── index.css
│   ├── App.css
│   ├── Navbar.css
│   ├── Auth.css
│   ├── Dashboard.css
│   ├── Trends.css
│   ├── Content.css
│   └── Home.css
├── App.js              # Main app component
└── index.js            # Entry point
```

### State Management

- **AuthContext**: Manages user authentication state
- **Local State**: Component-level state with useState
- **API State**: Data fetching and caching

### Routing

- React Router v6
- Protected routes with PrivateRoute component
- Public routes for login/register

## Backend Architecture

### Directory Structure

```
backend/
├── config/             # Configuration files
│   └── db.js          # Database connection
├── controllers/        # Request handlers
│   ├── authController.js
│   ├── contentController.js
│   ├── performaController.js
│   └── trendController.js
├── middleware/         # Custom middleware
│   ├── auth.js        # Authentication middleware
│   └── errorHandler.js
├── models/            # Mongoose models
│   ├── User.js
│   ├── Content.js
│   ├── Performa.js
│   └── Trend.js
├── routes/            # API routes
│   ├── authRoutes.js
│   ├── contentRoutes.js
│   ├── performaRoutes.js
│   └── trendRoutes.js
├── utils/             # Utility functions
│   └── generateToken.js
├── .env               # Environment variables
├── .env.example       # Environment template
├── server.js          # Entry point
└── seeder.js          # Database seeder
```

### API Design

#### RESTful Principles

- **GET**: Retrieve resources
- **POST**: Create new resources
- **PUT**: Update existing resources
- **DELETE**: Remove resources

#### Authentication Flow

```
1. User registers/logs in
2. Server validates credentials
3. Server generates JWT token
4. Client stores token in localStorage
5. Client includes token in Authorization header
6. Server validates token on protected routes
```

#### Middleware Chain

```
Request → CORS → Body Parser → Routes → Auth Middleware → Controller → Response
                                                ↓
                                         Error Handler
```

## Database Architecture

### Schema Design

#### User Schema
```javascript
{
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  role: String (enum),
  channelName: String,
  isActive: Boolean,
  timestamps: true
}
```

#### Content Schema
```javascript
{
  user: ObjectId (ref: User),
  judul: String,
  deskripsi: String,
  tag: [String],
  niche: String,
  hook: String,
  duration: Number,
  status: String (enum),
  timestamps: true
}
```

#### Performa Schema
```javascript
{
  content: ObjectId (ref: Content),
  views: Number,
  likes: Number,
  comments: Number,
  shares: Number,
  watchTime: Number,
  engagementRate: Number (calculated),
  recordedAt: Date,
  timestamps: true
}
```

#### Trend Schema
```javascript
{
  topic: String,
  category: String (enum),
  keywords: [String],
  popularity: Number,
  trendingScore: Number,
  source: String,
  isActive: Boolean,
  timestamps: true
}
```

### Indexes

- User.email (unique)
- Content.user
- Content.status
- Performa.content
- Trend.category
- Trend.trendingScore

## Security Architecture

### Authentication

- JWT (JSON Web Tokens)
- Bcrypt for password hashing
- Token expiration (30 days default)

### Authorization

- Role-based access control (RBAC)
- Middleware checks user role
- Protected routes require authentication

### Data Validation

- Express Validator for input validation
- Mongoose schema validation
- Client-side validation

### Security Headers

- CORS configuration
- Helmet.js (recommended for production)
- Rate limiting (recommended for production)

## Performance Considerations

### Frontend

- Code splitting with React.lazy
- Memoization with useMemo/useCallback
- Optimized re-renders
- Image optimization

### Backend

- Database indexing
- Query optimization
- Connection pooling
- Caching (Redis recommended)

### Database

- Proper indexing strategy
- Aggregation pipelines for analytics
- Regular backups

## Scalability

### Horizontal Scaling

- Stateless backend design
- Load balancer ready
- Session management with JWT

### Vertical Scaling

- Optimized queries
- Efficient data structures
- Resource monitoring

### Database Scaling

- MongoDB sharding
- Read replicas
- Connection pooling

## Deployment Architecture

### Development
```
Localhost:3000 (Frontend) → Localhost:5000 (Backend) → Localhost:27017 (MongoDB)
```

### Production
```
Vercel/Netlify (Frontend) → AWS EC2/Heroku (Backend) → MongoDB Atlas (Database)
                                      ↓
                                Load Balancer
                                      ↓
                              Multiple Instances
```

## Monitoring & Logging

### Backend Logging

- Winston for structured logging
- Morgan for HTTP request logging
- Error tracking with Sentry

### Performance Monitoring

- PM2 for process management
- MongoDB Atlas monitoring
- Application metrics

## Future Enhancements

### Phase 2

- Real-time notifications (Socket.io)
- Advanced analytics dashboard
- Content recommendation engine
- Social media integration

### Phase 3

- AI-powered hook generation
- Video upload and processing
- Collaboration features
- Mobile app (React Native)

### Phase 4

- Microservices architecture
- GraphQL API
- Advanced caching layer
- CDN integration
