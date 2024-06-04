package mx.edu.cetys.slip.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mx.edu.cetys.slip.entity.Task;
import mx.edu.cetys.slip.entity.User;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
