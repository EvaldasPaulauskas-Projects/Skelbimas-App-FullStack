# Skelbimas App Frontend

## Introduction
This is the frontend for the Skelbimas App, built using React. It interacts with a RESTful API to manage user authentication, posts, comments, and categories.

## Technologies Used
- React
- Axios
- JavaScript

## Services

### UserService
This service manages user authentication and profile-related tasks.

- **login(email, password)**  
  Sends a POST request to `/auth/login` with the user email and password for authentication.

  ```javascript
  UserService.login("user@example.com", "password123");
  ```

- **register(userData)**  
  Sends a POST request to `/auth/register` with the user data for registration.

  ```javascript
  UserService.register({
    email: "user@example.com",
    username: "user123",
    password: "password123"
  });
  ```

- **getAllUsers(token)**  
  Retrieves all users from `/admin/get-all-users` using the provided token for authentication.

  ```javascript
  UserService.getAllUsers(token);
  ```

- **getYourProfile(token)**  
  Retrieves the profile of the currently logged-in user from `/adminuser/get-profile`.

  ```javascript
  UserService.getYourProfile(token);
  ```

- **getUserById(userId, token)**  
  Retrieves a user by ID from `/admin/get-users/{userId}`.

  ```javascript
  UserService.getUserById(1, token);
  ```

- **logout()**  
  Removes the token and role from local storage, effectively logging out the user.

  ```javascript
  UserService.logout();
  ```

### PostService
This service handles creating, retrieving, editing, and deleting posts.

- **getAllPosts()**  
  Retrieves all posts from `/public/posts`.

  ```javascript
  PostService.getAllPosts();
  ```

- **getPostById(id)**  
  Retrieves a post by its ID from `/public/search/id/{id}`.

  ```javascript
  PostService.getPostById(1);
  ```

- **addPost(json, token)**  
  Adds a new post with the provided JSON and authentication token.

  ```javascript
  PostService.addPost({
    title: "New Post",
    content: "This is a new post."
  }, token);
  ```

- **editPostById(id, json, token)**  
  Updates a post by ID.

  ```javascript
  PostService.editPostById(1, {
    title: "Updated Title",
    content: "Updated content"
  }, token);
  ```

- **deletePostById(id, token)**  
  Deletes a post by ID.

  ```javascript
  PostService.deletePostById(1, token);
  ```

### CommentService
This service manages comments for posts.

- **getAllComments()**  
  Retrieves all comments from `/public/comments`.

  ```javascript
  CommentService.getAllComments();
  ```

- **addComment(json)**  
  Adds a new comment.

  ```javascript
  CommentService.addComment({
    postId: 1,
    userId: 2,
    content: "Great post!"
  });
  ```

- **likeComment(id)**  
  Likes a comment by its ID.

  ```javascript
  CommentService.likeComment(1);
  ```

- **dislikeComment(id)**  
  Dislikes a comment by its ID.

  ```javascript
  CommentService.dislikeComment(1);
  ```

- **editComment(id, json)**  
  Edits a comment by its ID.

  ```javascript
  CommentService.editComment(1, {
    content: "Updated comment"
  });
  ```

- **deleteComment(id)**  
  Deletes a comment by its ID.

  ```javascript
  CommentService.deleteComment(1);
  ```

### CategorieeService
This service handles categories for posts.

- **getAllCategories()**  
  Retrieves all categories from `/public/api/categories`.

  ```javascript
  CategorieeService.getAllCategories();
  ```

- **getCategoryById(id)**  
  Retrieves a category by its ID.

  ```javascript
  CategorieeService.getCategoryById(1);
  ```

- **addACategory(json, token)**  
  Adds a new category with the provided JSON and token.

  ```javascript
  CategorieeService.addACategory({
    tag: "technology",
    description: "Posts about technology"
  }, token);
  ```

- **editACategory(id, json, token)**  
  Updates a category by its ID.

  ```javascript
  CategorieeService.editACategory(1, {
    tag: "science",
    description: "Posts about science"
  }, token);
  ```

- **deleteACategory(id, token)**  
  Deletes a category by its ID.

  ```javascript
  CategorieeService.deleteACategory(1, token);
  ```

## Conclusion
The Skelbimas App Frontend provides a complete set of services for managing users, posts, comments, and categories. With Axios for making API requests and React as the frontend framework, the app is designed to be scalable and maintainable.

