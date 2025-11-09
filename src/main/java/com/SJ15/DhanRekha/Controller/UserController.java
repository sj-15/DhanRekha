package com.SJ15.DhanRekha.Controller;

import com.SJ15.DhanRekha.Entity.User;
import com.SJ15.DhanRekha.Repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;

import java.net.URI;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        // basic: if mobile exists, return existing
        return userRepository.findByMobile(user.getMobile())
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    User saved = userRepository.save(user);
                    return ResponseEntity.created(URI.create("/api/users/" + saved.getId())).body(saved);
                });
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
