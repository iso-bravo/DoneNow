package mx.edu.cetys.slip.service;

import mx.edu.cetys.slip.entity.Task;
import mx.edu.cetys.slip.entity.User;
import mx.edu.cetys.slip.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    public List<Task> getAllTasksForUser(Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return taskRepository.findByUser(user.get());
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public Task createTask(Task task) {
        Optional<User> user = userService.getUserById(task.getUser().getId());
        if (user.isPresent()) {
            task.setUser(user.get());
            return taskRepository.save(task);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task editTask(Long id, Task task) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate();
        
        return taskRepository.save(existingTask);
    }
}
