package com.skelbimas_app_backend.skelbimas_app_backend.repo;


import com.skelbimas_app_backend.skelbimas_app_backend.models.posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface postsRepo extends JpaRepository<posts, Integer> {
    Optional<posts> findByName(String name);
}