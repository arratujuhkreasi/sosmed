# Installation Checklist

## ✅ Pre-Installation Checklist

### System Requirements
- [ ] Node.js v14 or higher installed
- [ ] npm or yarn installed
- [ ] MongoDB installed (local) OR MongoDB Atlas account
- [ ] Git installed (optional)
- [ ] Code editor (VS Code recommended)

### Verify Installation
```bash
node --version    # Should show v14+
npm --version     # Should show 6+
mongod --version  # Should show MongoDB version (if local)
```

---

## 📦 Installation Steps

### Step 1: Project Setup
- [ ] Navigate to project directory
- [ ] Verify all files are present (63 files total)

### Step 2: Backend Setup
- [ ] Navigate to `backend` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Configure `.env` file:
  - [ ] Set `MONGO_URI`
  - [ ] Set `JWT_SECRET` (use strong random string)
  - [ ] Set `PORT` (default: 5000)
- [ ] Verify MongoDB is running

### Step 3: Frontend Setup
- [ ] Navigate to `frontend` folder
- [ ] Run `npm install`
- [ ] (Optional) Create `.env` file
- [ ] Set `REACT_APP_API_URL` if needed

### Step 4: Database Seeding (Optional)
- [ ] Navigate to `backend` folder
- [ ] Run `node seeder.js`
- [ ] Verify sample data created

---

## 🚀 Running the Application

### Start Backend
- [ ] Open terminal in `backend` folder
- [ ] Run `npm run dev`
- [ ] Verify server starts on port 5000
- [ ] Check console for "MongoDB Connected" message
- [ ] Test API: Open `http://localhost:5000` in browser

### Start Frontend
- [ ] Open new terminal in `frontend` folder
- [ ] Run `npm start`
- [ ] Verify app opens in browser at `http://localhost:3000`
- [ ] Check for no console errors

---

## ✅ Verification Checklist

### Backend Verification
- [ ] Server running without errors
- [ ] MongoDB connected successfully
- [ ] API responds at `http://localhost:5000`
- [ ] Test endpoint: `GET http://localhost:5000/api/trends`

### Frontend Verification
- [ ] App loads in browser
- [ ] No console errors
- [ ] Home page displays correctly
- [ ] Navigation works

### Functionality Testing

#### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Redirect to dashboard after login
- [ ] Logout works
- [ ] Protected routes redirect to login

#### Dashboard
- [ ] Statistics display correctly
- [ ] Recent content shows (if any)
- [ ] Trending topics display

#### Trends
- [ ] Trends list displays
- [ ] Category filter works
- [ ] Search functionality works
- [ ] Trend cards display correctly

#### Content Management
- [ ] Create new content
- [ ] View content list
- [ ] Filter by status works
- [ ] Edit content
- [ ] Delete content
- [ ] View content details

#### Profile
- [ ] View profile information
- [ ] Update profile works
- [ ] Password change works

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- [ ] Check MongoDB is running: `mongod`
- [ ] Verify MONGO_URI in `.env`
- [ ] Check network/firewall settings
- [ ] Try MongoDB Atlas if local fails

**Port Already in Use**
- [ ] Change PORT in `.env`
- [ ] Kill process using port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:5000 | xargs kill -9
  ```

**Dependencies Error**
- [ ] Delete `node_modules` folder
- [ ] Delete `package-lock.json`
- [ ] Run `npm install` again
- [ ] Try `npm cache clean --force`

### Frontend Issues

**Cannot Connect to Backend**
- [ ] Verify backend is running
- [ ] Check REACT_APP_API_URL
- [ ] Check CORS settings in backend
- [ ] Clear browser cache

**Build Errors**
- [ ] Delete `node_modules`
- [ ] Run `npm install` again
- [ ] Check Node.js version
- [ ] Try `npm start` with `--reset-cache`

**Blank Page**
- [ ] Check browser console for errors
- [ ] Verify all imports are correct
- [ ] Check React version compatibility

---

## 📝 Post-Installation

### Configuration
- [ ] Change JWT_SECRET to secure random string
- [ ] Update MongoDB URI for production
- [ ] Configure CORS for production domain
- [ ] Set NODE_ENV to production

### Security
- [ ] Never commit `.env` file
- [ ] Use strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Set up rate limiting
- [ ] Configure helmet.js

### Testing
- [ ] Test all user flows
- [ ] Test on different browsers
- [ ] Test responsive design
- [ ] Test error scenarios

### Documentation
- [ ] Read README.md
- [ ] Review API.md
- [ ] Check USER_GUIDE.md
- [ ] Understand ARCHITECTURE.md

---

## 🎉 Success Criteria

Your installation is successful if:

✅ Backend server runs without errors
✅ Frontend app loads in browser
✅ MongoDB connection established
✅ User can register and login
✅ Dashboard displays correctly
✅ Trends page shows data
✅ Content CRUD operations work
✅ No console errors
✅ Responsive design works
✅ Navigation functions properly

---

## 📞 Support

If you encounter issues:

1. Check this checklist again
2. Review error messages carefully
3. Check documentation in `docs/` folder
4. Search for similar issues
5. Open GitHub issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Screenshots if applicable

---

## 🚀 Next Steps

After successful installation:

1. [ ] Explore the application
2. [ ] Read USER_GUIDE.md
3. [ ] Create your first content
4. [ ] Customize for your needs
5. [ ] Consider contributing

---

**Installation Date**: _____________
**Installed By**: _____________
**Version**: 1.0.0
**Status**: [ ] Success  [ ] Issues

---

**Happy Coding! 🎃**
