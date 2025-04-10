import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ViewStory = () => {
  const { email, story_id } = useParams();
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/story?email=${email}&story_id=${story_id}`);
        if (!response.ok) {
          throw new Error('Failed to load story');
        }
        const res = await response.json();
        setStory(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [story_id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading story...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="mb-4">
        <span className="text-sm text-gray-500">
          {new Date(story.created_at).toLocaleString()} | {story.category}
        </span>
      </div>
      <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">{story.title}</h1>
      <p className="text-gray-700 whitespace-pre-line mb-6">{story.content}</p>
      <div className="text-sm text-gray-500 italic">
        — {story.is_guest ? `${story.author} (Guest)` : story.author}
      </div>
      <Link to="/" className="inline-block mt-6 text-primary-600 hover:text-primary-800">
        ← Back to Home
      </Link>
    </div>
  );
};

export default ViewStory;