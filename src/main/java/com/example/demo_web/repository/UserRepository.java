package com.example.demo_web.repository;

import com.example.demo_web.model.User;
import com.example.demo_web.response.BaseResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    Optional<User>  findUserByUsernameAndPassword(String username,String password);
    User findUserById(int id);
}
