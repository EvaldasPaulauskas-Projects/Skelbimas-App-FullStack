# Skelbimas App FullStack

## Introduction
The Skelbimas App is a FullStack application designed for managing posts, comments, categories, user authentication, and more. It features a RESTful API that allows users to perform various operations on the underlying data.

## Technologies Used
- Spring Boot
- Java
- MySQL
- Hibernate
- REST API
- Maven

## API Endpoints

### User Management
- **POST** `/auth/register`: Register a new user.
- **POST** `/auth/login`: Log in a user.
- **POST** `/auth/refresh`: Refresh the user token.
- **GET** `/admin/get-all-users`: Retrieve all users.
- **GET** `/admin/get-users/{userId}`: Retrieve a user by ID.
- **GET** `/adminuser/get-profile`: Get the logged-in user's profile.

### Categories
- **GET** `/public/api/categories`: Retrieve all categories.
- **GET** `/public/api/categories/{id}`: Retrieve a category by ID.
- **POST** `/admin/api/categories/add`: Create a new category.
- **PUT** `/admin/api/categories/{id}`: Update a category by ID.
- **DELETE** `/admin/api/categories/{id}`: Delete a category by ID.

### Comments
- **POST** `/public/comments/add`: Add a comment.
- **GET** `/public/comments/user/{userId}`: Retrieve comments by user ID.
- **GET** `/public/comments/username/{username}`: Retrieve comments by username.
- **GET** `/public/comments`: List all comments.
- **GET** `/public/comments/{id}`: Retrieve a comment by ID.
- **PUT** `/public/comments/edit/{id}`: Update a comment by ID.
- **DELETE** `/public/comments/delete/{id}`: Delete a comment by ID.
- **POST** `/public/comments/like/{id}`: Like a comment.
- **POST** `/public/comments/dislike/{id}`: Dislike a comment.

### Posts
- **GET** `/public/posts`: Retrieve all posts.
- **GET** `/public/posts/name/{name}`: Search for a post by name.
- **GET** `/public/search/id/{id}`: Search for a post by ID.
- **POST** `/admin/post/add`: Create a new post.
- **PUT** `/admin/post/{id}`: Update a post by ID.
- **DELETE** `/admin/post/{id}`: Delete a post by ID.

## JSON Models

### User
#### Request Example for Registration
```json
{
  "email": "user@example.com",
  "username": "user123",
  "password": "securepassword"
}
```

#### Response Example for User Profile
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "user123",
  "status": "ACTIVE"
}
```

### Category
#### Request Example for Creating a Category
```json
{
  "tag": "technology",
  "description": "All about technology"
}
```

#### Response Example for a Category
```json
{
  "id": 1,
  "tag": "technology",
  "description": "All about technology"
}
```

### Comment
#### Request Example for Adding a Comment
```json
{
  "userId": 1,
  "postId": 1,
  "content": "This is a great post!"
}
```

#### Response Example for a Comment
```json
{
  "id": 1,
  "userId": 1,
  "postId": 1,
  "content": "This is a great post!",
  "likes": 5,
  "dislikes": 0
}
```

### Post
#### Request Example for Creating a Post
```json
{
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "authorId": 1
}
```

#### Response Example for a Post
```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "authorId": 1,
  "createdAt": "2024-10-01T12:00:00Z"
}
```

## Conclusion
The Skelbimas App provides a robust framework for managing user interactions, categories, comments, and posts, utilizing the Spring Boot framework and a structured RESTful API. This allows for scalable and maintainable application development, facilitating an intuitive user experience.
