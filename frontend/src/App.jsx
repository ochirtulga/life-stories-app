import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import StoryEditor from './pages/StoryEditor';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import ViewStory from './pages/ViewStory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Navbar isAuthenticated={isAuthenticated} logout={logout} />
        <main className="flex-grow max-w-7xl mx-auto w-full py-6 sm:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/" /> : <Register login={login} />} 
            />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <Login login={login} />} 
            />
            <Route path="/write" element={<StoryEditor isAuthenticated={isAuthenticated} />} />
            <Route path="/story/:email/:story_id" element={<ViewStory />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;