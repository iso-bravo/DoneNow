package mx.edu.cetys.slip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class SlipApplication {

	public static void main(String[] args) {
		SpringApplication.run(SlipApplication.class, args);
	}

}
