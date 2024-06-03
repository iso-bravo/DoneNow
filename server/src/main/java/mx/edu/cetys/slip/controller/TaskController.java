package mx.edu.cetys.slip.controller;

import mx.edu.cetys.slip.entity.Task;
import mx.edu.cetys.slip.entity.User;
import mx.edu.cetys.slip.service.TaskService;
import mx.edu.cetys.slip.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/tasks")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final TaskService taskService;
    private final UserService userService;

    @Autowired
    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getAllTasksForUser(@PathVariable Long userId) {
        List<Task> tasks = taskService.getAllTasksForUser(userId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody TaskRequest taskRequest) {
        if (taskRequest.getTitle() == null || taskRequest.getTitle().isEmpty() ||
                taskRequest.getDescription() == null || taskRequest.getDescription().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<User> user = userService.getUserById(taskRequest.getUserId());
        if (user.isPresent()) {
            Task task = new Task();
            task.setTitle(taskRequest.getTitle());
            task.setDescription(taskRequest.getDescription());
            task.setDueDate();
            task.setUser(user.get());

            Task createdTask = taskService.createTask(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> editTask(@PathVariable Long id, @RequestBody Task task) {
        if (task.getTitle() == null || task.getTitle().isEmpty() || task.getDescription() == null || task.getDescription().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Task editedTask = taskService.editTask(id, task);
        return ResponseEntity.ok(editedTask);
    }

    public static class TaskRequest {
        private Long userId;
        private String title;
        private String description;
        private LocalDate dueDate;


        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public LocalDate getDueDate() {
            return dueDate;
        }

        public void setDueDate() {
            this.dueDate = LocalDate.now();
        }
    }
}

