package mx.edu.cetys.slip.controller;

import mx.edu.cetys.slip.entity.User;
import mx.edu.cetys.slip.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.findByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public record LoginRequest(String username, String password){};

    @PostMapping("/login")
    public ResponseEntity<?> validateUser(@RequestBody LoginRequest loginRequest ) {
        Optional<User> user = userService.validateUser(loginRequest.username(), loginRequest.password());
        if (user.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("userId", user.get().getId());
            response.put("username", user.get().getUsername());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
