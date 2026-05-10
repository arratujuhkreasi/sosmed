import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Trends from './pages/Trends';
import ContentList from './pages/ContentList';
import ContentForm from './pages/ContentForm';
import ContentDetail from './pages/ContentDetail';
import Profile from './pages/Profile';
import HookGenerator from './pages/HookGenerator';
import NicheFinder from './pages/NicheFinder';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/trends"
                element={
                  <PrivateRoute>
                    <Trends />
                  </PrivateRoute>
                }
              />
              <Route
                path="/content"
                element={
                  <PrivateRoute>
                    <ContentList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/content/new"
                element={
                  <PrivateRoute>
                    <ContentForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/content/:id"
                element={
                  <PrivateRoute>
                    <ContentDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/hooks"
                element={
                  <PrivateRoute>
                    <HookGenerator />
                  </PrivateRoute>
                }
              />
              <Route
                path="/niche-finder"
                element={
                  <PrivateRoute>
                    <NicheFinder />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
