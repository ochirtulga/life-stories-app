# Life Stories Sharing Platform

A web application that allows users to share their life stories, either as registered users or as guests.

## Project Structure

### Frontend (React)
- User authentication (register/login)
- Story creation and viewing
- User profiles
- Guest story submission

### Backend (FastAPI)
- REST API for user management
- Story creation, storage, and retrieval
- Support for both authenticated and guest content

## Getting Started

### Backend Setup

1. Create a virtual environment:
   ```
   python -m .venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   poetry shell
   poetry install
   ```

3. Run the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Create a new React app:
   ```
   npx create-react-app life-stories-frontend
   cd life-stories-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Replace the default files with the provided ones

4. Run the development server:
   ```
   npm run dev
   ```

## Features

- **User Authentication**: Register, login, and manage your account
- **Story Creation**: Share your stories with rich text formatting
- **Guest Submissions**: Allow non-registered users to share stories
- **Story Browsing**: Discover stories from other users
- **Categories**: Organize stories by different life categories

## Future Enhancements

- Media uploads (photos, audio)
- Comments and interactions
- Advanced search functionality
- Featured stories section
- Privacy controls for visibility