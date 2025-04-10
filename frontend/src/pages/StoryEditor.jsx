import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StoryEditor = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    'general', 'childhood', 'career', 'relationships', 
    'travel', 'life-lessons', 'personal-growth'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
  
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const email = user?.email || '';
    const username = user?.username || '';
    try {
      const storyData = {
        title,
        content,
        category,
        ...(isAuthenticated
          ? { email, author: username }
          : { guest_name: guestName, guest_email: guestEmail }
        )
      };
  
      const url = isAuthenticated ? '/api/v1/story' : '/api/v1/guest-story';
      const headers = {
        'Content-Type': 'application/json',
        ...(isAuthenticated
          ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
          : {})
      };
  
      const response = await fetch('http://localhost:8000' + url, {
        method: 'POST',
        headers,
        body: JSON.stringify(storyData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit story');
      }
  
      const res = await response.json();
      const data = res.data;
      navigate(`/story/${data.email}/${data.story_id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-center text-white mb-8">
        {isAuthenticated ? 'Share Your Story' : 'Share Your Story as a Guest'}
      </h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-4 md:p-8 rounded-lg shadow-md">
        {!isAuthenticated && (
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Guest Information</h2>
            <div className="mb-4">
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">
                Name or Pseudonym *
              </label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                placeholder="How you want to be identified"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="guestEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                id="guestEmail"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="For notifications about your story (not published)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="mt-1 text-sm text-gray-500 italic">
                We'll never share your email with anyone else.
              </p>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="title" className="block text-md font-medium text-gray-700 mb-1">
            Story Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Give your story a memorable title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-md font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-md font-medium text-gray-700 mb-1">
            Your Story *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="12"
            placeholder="Share your experience, journey, or memorable moments..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button 
            type="submit" 
            className={`px-6 py-3 text-white font-medium rounded-md ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-600 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Share Your Story'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryEditor;