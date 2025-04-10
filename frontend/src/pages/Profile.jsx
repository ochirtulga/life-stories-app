// src/pages/Profile.jsx
import React from 'react';

const Profile = () => {
  // This should eventually be fetched from an API or localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  user.bio = user.bio || 'No bio available';
  
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded text-gray-800">
        <p className="text-center text-lg">User info not available. Please login.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded text-gray-800">
      <h2 className="text-3xl font-bold mb-6">Your Profile</h2>
      <div className="space-y-4 text-lg">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
      </div>
    </div>
  );
}; 

export default Profile;