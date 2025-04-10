import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/stories');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const res = await response.json();
        setStories(res.data); // <- grabs only the actual list of stories
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div>
      {/* Hero section */}
      <section className="bg-primary-600 text-white py-12 md:py-24 px-4 rounded-lg mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6">Share Your Life Story With The World</h1>
          <p className="text-lg md:text-xl mb-8">Every life is unique. Every story matters. Preserve your memories and connect with others through shared experiences.</p>
          <Link 
            to="/write" 
            className="bg-white text-black hover:bg-gray-700 hover:text-white px-6 py-3 rounded-md font-medium text-lg transition-colors duration-200"
          >
            Start Writing
          </Link>
        </div>
      </section>

      {/* Featured stories section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">Recent Stories</h2>
          <Link to="/?view=all" className="text-white hover:text-primary-800 font-medium">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-400 border-t-primary-700"></div>
            <p className="mt-2 text-gray-600">Loading stories...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            {error}
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No stories have been shared yet. Be the first!</p>
            <Link 
              to="/write" 
              className="mt-4 inline-block bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md font-medium"
            >
              Share Your Story
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.story_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {story.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                    <span className="ml-auto text-xs text-gray-500">
                      {new Date(story.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-2 hover:text-primary-700">
                    <Link to={`/story/${story.email}/${story.story_id}`}>
                      {story.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {story.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {story.is_guest ? `${story.author} (Guest)` : story.author}
                    </span>
                    <Link 
                      to={`/story/${story.email}/${story.story_id}`}
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories section */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Childhood', 'Career', 'Relationships', 'Travel', 'Life Lessons', 'Personal Growth', 'General'].map((category) => (
            <Link 
              key={category}
              to={`/?category=${category.toLowerCase().replace(' ', '-')}`}
              className="bg-white hover:bg-gray-50 p-6 rounded-lg shadow-md text-center transition-colors"
            >
              <h3 className="font-medium text-lg text-gray-800">{category}</h3>
              <p className="text-sm text-gray-500 mt-2">Explore stories about {category.toLowerCase()}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Ready to Share Your Story?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Whether you're looking to preserve memories for future generations or connect with others through shared experiences, your story matters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/register" 
            className="bg-primary-600 text-gray-700 hover:bg-gray-700 hover:text-white px-6 py-3 rounded-md font-medium"
          >
            Create Account
          </Link>
          <Link 
            to="/write" 
            className="bg-white text-primary-700 border border-primary-600 hover:bg-gray-50 px-6 py-3 rounded-md font-medium"
          >
            Write as Guest
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;