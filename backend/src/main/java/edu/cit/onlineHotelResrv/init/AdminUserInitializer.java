package edu.cit.onlineHotelResrv.init;

import edu.cit.onlineHotelResrv.Entity.Role;
import edu.cit.onlineHotelResrv.Entity.User;
import edu.cit.onlineHotelResrv.repository.RoleRepository;
import edu.cit.onlineHotelResrv.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Optional;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserInitializer(UserRepository userRepository,
                                RoleRepository roleRepository,
                                PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String adminEmail = "admin@hotel.com";

        if (userRepository.existsByEmail(adminEmail)) {
            System.out.println("Admin user already exists.");
            return;
        }

        Optional<Role> adminRoleOpt = roleRepository.findByName("ADMIN");
        if (adminRoleOpt.isEmpty()) {
            throw new RuntimeException("Role 'ADMIN' not found. Please insert it into the database.");
        }

        Role adminRole = adminRoleOpt.get();

        User admin = new User();
        admin.setUsername(adminEmail);
        admin.setEmail(adminEmail);
        admin.setPassword(passwordEncoder.encode("admin123")); // Set default password
        admin.setFirstName("System");
        admin.setLastName("Admin");
        admin.setPhone("0000000000");
        admin.setEnabled(true);
        admin.setRoles(Collections.singleton(adminRole));

        userRepository.save(admin);
        System.out.println("Admin user created successfully.");
    }
}
