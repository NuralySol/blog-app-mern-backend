# Blog App - MERN Stack (Backend)

This is a **Blog App** built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It allows users to create, read, update, and delete blog posts with a dynamic and user-friendly interface.

---

## Features

- Create, read, update, and delete blog posts.
- Backend built with **Node.js** and **Express.js** for handling RESTful APIs.
- Database integration with **MongoDB** using **Mongoose** for data modeling.
- Frontend developed using **React.js** for a dynamic, responsive user interface.
- Cross-Origin Resource Sharing enabled via **CORS** middleware for secure client-server communication.

---

## Tech Stack

### Frontend

- React.js
- Axios (for API requests)
- CSS (for styling)

### Backend

- Node.js
- Express.js
- Mongoose
- dotenv (for environment variable management)

### Database

- MongoDB (NoSQL database)

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

1. **Node.js** (v14 or later)
2. **npm**
3. **MongoDB**

## API Endpoints

### Base URL: `http://localhost:5001`

| **Method** | **Endpoint**       | **Description**              | **Request Body**                                                |
|------------|--------------------|------------------------------|-----------------------------------------------------------------|
| GET        | `/api/blogs`       | Fetch all blogs              | N/A                                                             |
| GET        | `/api/blogs/:id`   | Fetch a single blog by ID    | N/A                                                             |
| POST       | `/api/blogs`       | Create a new blog            | `{ "title": "New Blog", "content": "This is a new blog post.", "author": "Jane Doe" }` |
| PUT        | `/api/blogs/:id`   | Update a blog by ID          | `{ "title": "Updated Blog", "content": "Updated content." }`    |
| DELETE     | `/api/blogs/:id`   | Delete a blog by ID          | N/A                                                             |

## Schema of the APP

``` Javascript
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [100, 'Blog title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Blog content is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to the current date
    }
});
