package com.skelbimas_app_backend.skelbimas_app_backend.service;

import com.skelbimas_app_backend.skelbimas_app_backend.models.posts;
import com.skelbimas_app_backend.skelbimas_app_backend.repo.postsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class postsService  {

    @Autowired
    private postsRepo postsrepo;

    public List<posts> getAllPosts() {
        return postsrepo.findAll();
    }

    public posts getPostById(Integer id) {
        Optional<posts> optionalBook = postsrepo.findById(id);
        return optionalBook.orElse(null);
    }

    public posts getPostByName(String name) {
        Optional<posts> optionalBook = postsrepo.findByName(name);
        return optionalBook.orElse(null);
    }

    public posts addPost(posts post) {
        return postsrepo.save(post);
    }

    public posts updatePost(Integer id, posts postDetails) {
        Optional<posts> optionalBook = postsrepo.findById(id);
        if (optionalBook.isPresent()) {
            posts post = optionalBook.get();
            post.setName(postDetails.getName());
            post.setDescription(postDetails.getDescription());
            post.setPrice(postDetails.getPrice());
            post.setPhoto(postDetails.getPhoto());
            post.setCity(postDetails.getCity());
            post.setCategory(postDetails.getCategory());
            return postsrepo.save(post);
        }
        return null;
    }

    public boolean deletePost(Integer id) {
        Optional<posts> optionalpost = postsrepo.findById(id);
        if (optionalpost.isPresent()) {
            postsrepo.delete(optionalpost.get());
            return true; // Book deleted successfully
        }
        return false; // Book with given ID not found
    }
}