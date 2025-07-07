package edu.cit.onlineHotelResrv;

import edu.cit.onlineHotelResrv.Entity.Role;
import edu.cit.onlineHotelResrv.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class OnlineHotelResrvApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineHotelResrvApplication.class, args);
	}

	@Bean
	CommandLineRunner initRoles(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(new Role("USER"));
			}
			if (roleRepository.findByName("ADMIN").isEmpty()) {
				roleRepository.save(new Role("ADMIN"));
			}
			if (roleRepository.findByName("HOTEL_MANAGER").isEmpty()) {
				roleRepository.save(new Role("HOTEL_MANAGER"));
			}
		};
	}

	@Configuration
	public class PasswordEncoderRunner {
		@Bean
		public CommandLineRunner encodePassword() {
			return args -> {
				String rawPassword = "Zheq3rpg";
				String encodedPassword = new BCryptPasswordEncoder().encode(rawPassword);
				System.out.println("Encoded password: " + encodedPassword);
			};
		}
	}
}
