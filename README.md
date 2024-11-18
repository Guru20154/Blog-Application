# Blog App

A simple blog application where users can create, read, and comment on blogs. The app features a user authentication system and allows logged-in users to add and view comments for each blog post. This app is built with React.js for the frontend, Express.js for the backend, and MongoDB for storing blog data and user information.


## Main Page
![alt text](/Images/image-7.png)

## Search Functionality
![alt text](/Images/image-8.png)

## Tags Categorisation 
![alt text](/Images/image-9.png)

## Blog Creation
![alt text](/Images/image-10.png)

## User Profile With Update and Delete of Blogs
![alt text](/Images/image-11.png)

## Blogs & Comments
![alt text](/Images/image-5.png)

## Login
![alt text](/Images/image-12.png)

## SignUp
![alt text](/Images/image-13.png)

## Home Page Without Login
![alt text](/Images/image-15.png)

## Features

- **Create Blog Post**: Users can create and publish blog posts with a title, description, body (supporting text and images), and tags.
- **View Blog Details**: Users can view the details of a blog post, including the title, description, body content, and tags.
- **Comment on Blogs**: Logged-in users can add comments to blog posts. Comments are displayed in reverse chronological order (latest first).
- **User Authentication**: Users can sign up, log in, and log out. JWT tokens are used for authentication, and user information is stored in cookies for secure access.
- **Tags**: Blogs can have multiple tags that are displayed as buttons for easy categorization and searchability.
- **Pagination for Comments**: Only 5 comments are shown initially for each blog. Users can load more comments by clicking a "Load More" button.

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Backend**: Express.js
- **Database**: MongoDB (using Mongoose for object modeling)
- **Authentication**: JWT (JSON Web Token) for secure user authentication
- **Cloud Storage**: Cloudinary for image and media file uploads

## Installation

### Prerequisites

- Node.js & Express
- MongoDB
- Cloudinary account (for media file storage)
- React

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install frontend dependencies:
    ```bash
    cd fre+ontend
    npm install
    ```

3. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

4. Set up MongoDB and create a database for the app.

5. Create a .env file in the server directory and configure the environment variables:

    ```makefile
    PORT=8000
    MONGO_URI=<your-mongo-db-uri>
    CORS_ORIGIN=http://localhost:3000
    ACCESS_TOKEN_SECRET=<your-access-token-secret>
    ACCESS_TOKEN_EXPIRY=1h
    REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
    REFRESH_TOKEN_EXPIRY=7d
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    ```
Explanation of environment variables:

- `PORT`: The port on which the backend server will run (default is 8000).
- `MONGO_URI`: The connection string to your MongoDB instance.
- `CORS_ORIGIN`: The allowed origin for CORS (usually your frontend URL).
- `ACCESS_TOKEN_SECRET`: The secret key used to sign access tokens.
- `ACCESS_TOKEN_EXPIRY`: The expiration time for the access token (e.g., 1h for 1 hour).
- `REFRESH_TOKEN_SECRET`: The secret key used to sign refresh tokens.
- `REFRESH_TOKEN_EXPIRY`: The expiration time for the refresh token (e.g., 7d for 7 days).
- `CLOUDINARY_CLOUD_NAME`: The Cloudinary cloud name for media uploads.
- `CLOUDINARY_API_KEY`: The Cloudinary API key for authentication.
- `CLOUDINARY_API_SECRET`: The Cloudinary API secret for authentication.

6. Run the application:

    - Start the backend server:
    ```bash
    npm run dev
    ```
    - Start the frontend development server:
    ```bash
    npm run dev
    ```
    The app will now be running on http://localhost:3000 for the frontend and http://localhost:8000 for the backend.

# API Documentation

## Authentication Routes

- **`POST /api/v1/users/login`**  
  Log in an existing user.

- **`POST /api/v1/users/logout`**  
  Log out the current user (requires JWT authentication).

- **`POST /api/v1/users/refresh-token`**  
  Refresh access token using a valid refresh token.

- **`GET /api/v1/users/current-user`**  
  Get the current logged-in user's details (requires JWT authentication).

## Blog Routes

- **`GET /api/v1/users/blogs/:id`**  
  Get a single blog post by ID.

- **`PUT /api/v1/users/blogs/:id`**  
  Update a blog post (requires JWT authentication). Uploads a cover image.

- **`DELETE /api/v1/users/blogs/:id`**  
  Delete a blog post (requires JWT authentication).

- **`GET /api/v1/users/blogs`**  
  Get a list of all blogs.

- **`POST /api/v1/users/blogs`**  
  Create a new blog post (requires JWT authentication). Supports cover image upload.

## Comment Routes

- **`POST /api/v1/users/comments`**  
  Add a new comment to a blog post (requires JWT authentication).

- **`GET /api/v1/users/comments/:id`**  
  Get all comments for a specific blog post (requires JWT authentication).

## User Routes

- **`GET /api/v1/users/userBlogs`**  
  Get a list of blogs created by the current user (requires JWT authentication).

## Frontend Structure

- **`src/components`**  
  Contains reusable components like CommentList, and Navbar.

- **`src/pages`**  
  Contains the pages for displaying the blog details and user-related pages.

- **`src/utils`**  
  Contains utility functions such as fetchData for API calls.

- **`src/redux`**  
  Contains Redux-related code for managing state like user authentication and blog comments.

## Backend Structure

- **`src/models`**  
  Contains Mongoose models for User, Blog and Comment.

- **`src/routes`**  
  Contains route handlers for user, blog and comment endpoints.

- **`src/controllers`**  
  Contains controllers to handle business logic for user, blog and comment operations.

- **`src/middleware`**  
  Contains middleware for JWT authentication and error handling. Also contains multer middleware to upload non-text files.

- **`src/utils`**  
  Contains utility functions for various tasks such as API Response / Errors, uploading files on cloudinary etc.

## Environment Variables

- **`PORT`**  
  The port on which the server will run (default is 8000).

- **`MONGO_URI`**  
  Your MongoDB connection string.

- **`CORS_ORIGIN`**  
  The allowed origin for CORS (usually your frontend URL).

- **`ACCESS_TOKEN_SECRET`**  
  The secret key used to sign access tokens.

- **`ACCESS_TOKEN_EXPIRY`**  
  The expiration time for the access token (e.g., 1h for 1 hour).

- **`REFRESH_TOKEN_SECRET`**  
  The secret key used to sign refresh tokens.

- **`REFRESH_TOKEN_EXPIRY`**  
  The expiration time for the refresh token (e.g., 7d for 7 days).

- **`CLOUDINARY_CLOUD_NAME`**  
  The Cloudinary cloud name for media uploads.

- **`CLOUDINARY_API_KEY`**  
  The Cloudinary API key for authentication.

- **`CLOUDINARY_API_SECRET`**  
  The Cloudinary API secret for authentication.
