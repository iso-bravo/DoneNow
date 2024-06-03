package mx.edu.cetys.slip.service;

import mx.edu.cetys.slip.entity.User;
import mx.edu.cetys.slip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> validateUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
}
