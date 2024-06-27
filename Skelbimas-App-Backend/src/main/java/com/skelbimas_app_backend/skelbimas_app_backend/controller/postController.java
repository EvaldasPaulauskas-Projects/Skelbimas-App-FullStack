package com.skelbimas_app_backend.skelbimas_app_backend.controller;

import com.skelbimas_app_backend.skelbimas_app_backend.exception.ResourceNotFoundException;
import com.skelbimas_app_backend.skelbimas_app_backend.models.posts;
import com.skelbimas_app_backend.skelbimas_app_backend.service.postsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class postController {

    @Autowired
    private postsService postsservice;

    // Get all posts
    @GetMapping("/public/posts")
    public ResponseEntity<List<posts>> getAllPosts() {
        List<posts> allPosts = postsservice.getAllPosts();
        return ResponseEntity.ok().body(allPosts);
    }

    // Search post by name
    @GetMapping("/public/posts/name/{name}")
    public ResponseEntity<posts> getPostByName(@PathVariable String name) {
        posts post = postsservice.getPostByName(name);
        if (post == null) {
            throw new ResourceNotFoundException("No post found with the name '" + name + "'");
        }
        return ResponseEntity.ok().body(post);
    }

    // Search post by id
    @GetMapping("/public/search/id/{id}")
    public ResponseEntity<posts> getPostById(@PathVariable Integer id) {
        posts post = postsservice.getPostById(id);
        if (post == null) {
            throw new ResourceNotFoundException("No post found with the ID '" + id + "'");
        }
        return ResponseEntity.ok().body(post);
    }

    // Create post
    @PostMapping("/admin/post/add")
    public ResponseEntity<posts> createPost(@RequestBody posts post) {
        posts createdPost = postsservice.addPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    // Edit post by id
    @PutMapping("/admin/post/{id}")
    public ResponseEntity<posts> updatePost(@PathVariable Integer id, @RequestBody posts postDetails) {
        posts updatedPost = postsservice.updatePost(id, postDetails);
        if (updatedPost == null) {
            throw new ResourceNotFoundException("No post found with the ID '" + id + "' to update");
        }
        return ResponseEntity.ok().body(updatedPost);
    }

    // Delete post by id
    @DeleteMapping("/admin/post/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Integer id) {
        boolean deleted = postsservice.deletePost(id);
        if (!deleted) {
            throw new ResourceNotFoundException("Unable to delete post with the ID '" + id + "'");
        }
        return ResponseEntity.noContent().build();
    }
}
