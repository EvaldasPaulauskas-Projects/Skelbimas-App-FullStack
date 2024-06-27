package com.skelbimas_app_backend.skelbimas_app_backend.repo;

import com.skelbimas_app_backend.skelbimas_app_backend.models.appUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface appUsersRepo extends JpaRepository<appUsers, Integer> {

    Optional<appUsers> findByEmail(String email);
}