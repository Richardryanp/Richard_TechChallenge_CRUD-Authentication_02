# RnD_Division

A backend project using Express and Prisma ORM.

This Tech Challenge consisted of two main requirements:
- CRUD (Create, Read, Update, Delete)
- Authentication (JWT-based login & registration)

Even though the challenge could have been done as two separate projects, both CRUD and authentication were combined into one backend to better reflect how real-world APIs are built.

## Features

- User authentication (register, login)
- CRUD operations for posts
- JWT-based authentication middleware
- Error handling middleware
- Prisma ORM for database access

## Project Structure

```
prisma/
  schema.prisma      # Database schema
  seed.js            # Seed script
  migrations/        # Prisma migrations
src/
  app.js             # Express app setup
  server.js          # Server entry point
  controllers/       # Route controllers
    auth.controller.js
    post.controller.js
  lib/
    prisma.js        # Prisma client setup
  middleware/
    auth.middleware.js
    error.middleware.js
  routes/
    auth.routes.js   # Auth routes
    post.routes.js   # Post routes
  services/
    auth.service.js  # Auth logic
    post.service.js  # Post logic
  utils/
    response.js      # Response helpers
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your database in `prisma/schema.prisma`.
3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Seed the database (optional):
   ```bash
   node prisma/seed.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## Usage

- API endpoints for authentication and posts are available under `/api/auth` and `/api/posts`.
- JWT token required for protected routes.

## API Routes

### Authentication

| Method | Path               | Description       | Access        |
| ------ | ------------------ | ----------------- | ------------- |
| POST   | /api/auth/register | Register new user | Public        |
| POST   | /api/auth/login    | Login user        | Public        |
| GET    | /api/auth/profile  | Get user profile  | Authenticated |

### Posts

| Method | Path           | Description    | Access        |
| ------ | -------------- | -------------- | ------------- |
| POST   | /api/posts/    | Create post    | Authenticated |
| GET    | /api/posts/    | Get all posts  | Authenticated |
| GET    | /api/posts/:id | Get post by ID | Authenticated |
| PUT    | /api/posts/:id | Update post    | Authenticated |
| DELETE | /api/posts/:id | Delete post    | Authenticated |

### Roles

- All authenticated routes require a valid JWT token.
- Admins have access to all posts (Using the JWT token provided)

## Using the API

### Authentication

#### Register

- **Endpoint:** POST /api/auth/register
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:** User object (id, name, email, role)

#### Login

- **Endpoint:** POST /api/auth/login
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:** JWT token and user object

#### Get Profile

- **Endpoint:** GET /api/auth/profile
- **Headers:**
  - Authorization: Bearer `<JWT token>`
- **Response:** User object

### Posts

#### Create Post

- **Endpoint:** POST /api/posts/
- **Headers:**
  - Authorization: Bearer `<JWT token>`
- **Body:**
  ```json
  {
    "title": "Post Title",
    "content": "Post content",
    "published": true // optional
  }
  ```
- **Response:** Post object

#### Get All Posts

- **Endpoint:** GET /api/posts/
- **Headers:**
  - Authorization: Bearer `<JWT token>`
- **Query Params:**
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)
- **Response:** List of posts with pagination

#### Get Post by ID

- **Endpoint:** GET /api/posts/:id
- **Headers:**
  - Authorization: Bearer `<JWT token>`
- **Params:**
  - `id`: Post ID
- **Response:** Post object

#### Update Post

- **Endpoint:** PUT /api/posts/:id
- **Headers:**
  - Authorization: Bearer `<JWT token>`
- **Params:**
  - `id`: Post ID
- **Body:**
  ```json
  {
    "title": "Updated Title", // optional
    "content": "Updated content", // optional
    "published": false // optional
  }
  ```
- **Response:** Updated post object

#### Delete Post

- **Endpoint:** DELETE /api/posts/:id
- **Headers:**
  - Authorization: Bearer `<JWT token>`
- **Params:**
  - `id`: Post ID
- **Response:** Success message
