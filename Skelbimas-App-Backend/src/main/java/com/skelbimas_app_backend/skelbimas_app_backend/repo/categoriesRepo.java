package com.skelbimas_app_backend.skelbimas_app_backend.repo;

import com.skelbimas_app_backend.skelbimas_app_backend.models.categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface categoriesRepo extends JpaRepository<categories, Integer> {
    categories findByTag(String tag);
}