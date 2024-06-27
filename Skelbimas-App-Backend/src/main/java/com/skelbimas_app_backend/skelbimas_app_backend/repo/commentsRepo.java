package com.skelbimas_app_backend.skelbimas_app_backend.repo;

import com.skelbimas_app_backend.skelbimas_app_backend.models.comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface commentsRepo extends JpaRepository<comments, Integer> {
    List<comments> findByUserId(Integer userId);
    List<comments> findByUsername(String username);
}