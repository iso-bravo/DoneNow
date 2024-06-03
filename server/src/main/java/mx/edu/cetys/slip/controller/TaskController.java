package mx.edu.cetys.slip.controller;// TaskController.java
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.edu.cetys.slip.entity.Task;
import mx.edu.cetys.slip.service.TaskService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getAllTasksForUser(@PathVariable Long userId) {
        List<Task> tasks = taskService.getAllTasksForUser(userId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (task.getTitle() == null || task.getTitle().isEmpty() || task.getDescription() == null || task.getDescription().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
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
}
