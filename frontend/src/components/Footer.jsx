import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div className="space-y-3">
            <Link to="/" className="font-serif text-xl font-bold text-white">
              Life Stories
            </Link>
            <p className="text-gray-300 text-sm">
              Share your journey, connect with others, and preserve your memories for generations to come.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/write" className="text-gray-300 hover:text-white transition-colors">
                  Write Your Story
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium mb-4">Story Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['Childhood', 'Career', 'Relationships', 'Travel', 'Life Lessons', 'Personal Growth'].map((category) => (
                <Link 
                  key={category} 
                  to={`/?category=${category.toLowerCase().replace(' ', '-')}`}
                  className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Life Stories. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;