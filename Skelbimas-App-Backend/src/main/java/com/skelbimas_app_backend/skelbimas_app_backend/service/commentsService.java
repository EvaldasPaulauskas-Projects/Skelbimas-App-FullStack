package com.skelbimas_app_backend.skelbimas_app_backend.service;
import com.skelbimas_app_backend.skelbimas_app_backend.exception.ResourceNotFoundException;
import com.skelbimas_app_backend.skelbimas_app_backend.models.comments;
import com.skelbimas_app_backend.skelbimas_app_backend.repo.commentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class commentsService {

    @Autowired
    private commentsRepo commentsrepo;

    public comments addComment(comments newComment) {
        newComment.setLikes(0);
        newComment.setDislikes(0);
        newComment.setDate(LocalDateTime.now());
        return commentsrepo.save(newComment);
    }

    public List<comments> getCommentsByUserId(Integer userId) {
        List<comments> comments = commentsrepo.findByUserId(userId);
        if (comments.isEmpty()) {
            throw new ResourceNotFoundException("No comments found for userId: " + userId);
        }
        return comments;
    }

    public List<comments> getCommentsByUsername(String username) {
        List<comments> comments = commentsrepo.findByUsername(username);
        if (comments.isEmpty()) {
            throw new ResourceNotFoundException("No comments found for username: " + username);
        }
        return comments;
    }

    public List<comments> getAllComments() {
        return commentsrepo.findAll();
    }

    public Optional<comments> getCommentById(Integer id) {
        Optional<comments> comment = commentsrepo.findById(id);
        if (comment.isEmpty()) {
            throw new ResourceNotFoundException("Comment not found with id: " + id);
        }
        return comment;
    }

    public comments updateComment(Integer id, comments updatedComment) {
        return commentsrepo.findById(id).map(comment -> {
            comment.setBookId(updatedComment.getBookId());
            comment.setComment(updatedComment.getComment());
            comment.setLikes(updatedComment.getLikes());
            comment.setDislikes(updatedComment.getDislikes());
            comment.setDate(LocalDateTime.now()); // Automatically set the date
            return commentsrepo.save(comment);
        }).orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
    }

    public void deleteComment(Integer id) {
        comments existingComment = commentsrepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id " + id));
        commentsrepo.delete(existingComment);
    }

    public comments likeComment(Integer id) {
        return commentsrepo.findById(id).map(comment -> {
            comment.setLikes(comment.getLikes() + 1);
            return commentsrepo.save(comment);
        }).orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
    }

    public comments unlikeComment(Integer id) {
        comments existingComment = commentsrepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id " + id));
        if (existingComment.getLikes() > 0) {
            existingComment.setLikes(existingComment.getLikes() - 1);
        }
        return commentsrepo.save(existingComment);
    }

    public comments dislikeComment(Integer id) {
        return commentsrepo.findById(id).map(comment -> {
            comment.setDislikes(comment.getDislikes() + 1);
            return commentsrepo.save(comment);
        }).orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
    }

    public comments undislikeComment(Integer id) {
        comments existingComment = commentsrepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id " + id));
        if (existingComment.getDislikes() > 0) {
            existingComment.setDislikes(existingComment.getDislikes() - 1);
        }
        return commentsrepo.save(existingComment);
    }
}