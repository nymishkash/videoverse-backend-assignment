---

# Video Processing API

This project provides an API for video processing tasks such as uploading videos to Cloudinary, trimming videos, and merging videos. The processed videos are also uploaded to Cloudinary, and the links to these videos are returned.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the API Server](#running-the-api-server)
- [API Endpoints](#api-endpoints)
  - [Upload Video](#upload-video)
  - [Trim Video](#trim-video)
  - [Merge Videos](#merge-videos)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- Upload a video file.
- Trim a video.
- Merge two video files.

## Prerequisites

- Node.js (v14.x or later)
- NPM (v6.x or later)
- Cloudinary account (for uploading videos)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nymishkash/videoverse-backend-assignment.git
   cd videoverse-backend-assignment
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Cloudinary configuration:

   ```bash
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   ```

## Running the API Server

To start the server, run the following command:

```bash
npm start
```

The server will start on `http://localhost:3000`.

Sure, here is the part of the README that includes user registration and login API endpoints:

---

## API Endpoints

### User Authentication

#### Register a New User

- **Endpoint:** `POST /auth/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully."
  }
  ```

#### User Login

- **Endpoint:** `POST /auth/login`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Logged in successfully.",
    "token": "your_jwt_token"
  }
  ```

### Video Processing

#### Upload a Video to Cloudinary

- **Endpoint:** `POST /videos/upload`
- **Description:** Uploads a video file to Cloudinary.
- **Request:**
  - **Form Data:**
    - `video`: Video file to upload.
- **Response:**
  ```json
  {
    "message": "Video uploaded to Cloudinary successfully.",
    "cloudinaryUrl": "cloudinary_video_url"
  }
  ```

#### Trim a Video and Upload to Cloudinary

- **Endpoint:** `POST /videos/trim`
- **Description:** Trims a video file and uploads the result to Cloudinary.
- **Request:**
  - **Form Data:**
    - `video`: Video file to trim.
  - **Body:**
    ```json
    {
      "trimStart": "start_time_in_seconds",
      "trimDuration": "duration_in_seconds"
    }
    ```
- **Response:**
  ```json
  {
    "message": "Video trimmed and uploaded to Cloudinary successfully.",
    "cloudinaryUrl": "cloudinary_trimmed_video_url"
  }
  ```

#### Merge Two Videos and Upload to Cloudinary

- **Endpoint:** `POST /videos/merge`
- **Description:** Merges two video files and uploads the result to Cloudinary.
- **Request:**
  - **Form Data:**
    - `video1`: First video file to merge.
    - `video2`: Second video file to merge.
  - **Body:**
    ```json
    {
      "prePath": "pre_processing_path"
    }
    ```
- **Response:**
  ```json
  {
    "message": "Videos merged and uploaded to Cloudinary successfully.",
    "cloudinaryUrl": "cloudinary_merged_video_url"
  }
  ```

---
