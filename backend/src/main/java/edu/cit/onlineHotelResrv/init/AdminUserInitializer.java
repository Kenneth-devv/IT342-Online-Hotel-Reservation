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
        String hotelManagerEmail = "hotel@reserveease.com";

        // Create admin user
        if (!userRepository.existsByEmail(adminEmail)) {
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
        } else {
            System.out.println("Admin user already exists.");
        }

        // Create hotel-specific manager accounts
        createHotelManagerAccount("grandhyatt@reserveease.com", "Grand Hyatt Manila", 1L, "grandhyatt123");
        createHotelManagerAccount("shangrila@reserveease.com", "Shangri-La at the Fort", 3L, "shangrila123");
        createHotelManagerAccount("grandhotel@reserveease.com", "Luxurious Grand Hotel Cebu", 5L, "grandhotel123");
    }

    private void createHotelManagerAccount(String email, String hotelName, Long hotelId, String password) {
        if (!userRepository.existsByEmail(email)) {
            Optional<Role> hotelManagerRoleOpt = roleRepository.findByName("HOTEL_MANAGER");
            if (hotelManagerRoleOpt.isEmpty()) {
                // Create HOTEL_MANAGER role if it doesn't exist
                Role hotelManagerRole = new Role("HOTEL_MANAGER");
                roleRepository.save(hotelManagerRole);
                System.out.println("HOTEL_MANAGER role created.");
            }

            Role hotelManagerRole = roleRepository.findByName("HOTEL_MANAGER").get();

            User hotelManager = new User();
            hotelManager.setUsername(email);
            hotelManager.setEmail(email);
            hotelManager.setPassword(passwordEncoder.encode(password));
            hotelManager.setFirstName(hotelName.split(" ")[0]); // First word as first name
            hotelManager.setLastName("Manager");
            hotelManager.setPhone("1234567890");
            hotelManager.setHotelId(hotelId);
            hotelManager.setEnabled(true);
            hotelManager.setRoles(Collections.singleton(hotelManagerRole));

            userRepository.save(hotelManager);
            System.out.println("Hotel Manager for " + hotelName + " created successfully.");
        } else {
            System.out.println("Hotel Manager for " + hotelName + " already exists.");
        }
    }
}
