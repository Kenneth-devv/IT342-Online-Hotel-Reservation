package edu.cit.onlineHotelResrv.controller;

import edu.cit.onlineHotelResrv.Entity.Role;
import edu.cit.onlineHotelResrv.Entity.User;
import edu.cit.onlineHotelResrv.dto.LoginRequest;
import edu.cit.onlineHotelResrv.dto.LoginResponse;
import edu.cit.onlineHotelResrv.dto.SignupRequest;
import edu.cit.onlineHotelResrv.dto.SignupResponse;
import edu.cit.onlineHotelResrv.dto.UserInfoResponse;
import edu.cit.onlineHotelResrv.repository.RoleRepository;
import edu.cit.onlineHotelResrv.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new SignupResponse("Username is already taken!", false));
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new SignupResponse("Email is already in use!", false));
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setEmail(signupRequest.getEmail());
        user.setPhone(signupRequest.getPhone());
        user.setEnabled(true);

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Error: Role USER not found."));
        user.setRoles(Collections.singleton(userRole));

        userRepository.save(user);

        return ResponseEntity.ok(new SignupResponse("User registered successfully!", true));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(new LoginResponse("Login successful"));
    }

    @GetMapping("/redirect")
    public ResponseEntity<String> redirectBasedOnRole(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        System.out.println("Authentication: " + authentication);
        authentication.getAuthorities().forEach(auth -> System.out.println("Role: " + auth.getAuthority()));

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        for (GrantedAuthority authority : authorities) {
            String role = authority.getAuthority();
            String cleanRole = role.startsWith("ROLE_") ? role.substring(5) : role;
            switch (cleanRole) {
                case "ADMIN":
                    return ResponseEntity.ok("/admin/dashboard");
                case "RECEPTIONIST":
                    return ResponseEntity.ok("/receptionist/dashboard");
                case "RESERVATION_STAFF":
                    return ResponseEntity.ok("/reservation/dashboard");
                case "ACCOUNTING":
                    return ResponseEntity.ok("/accounting/dashboard");
                case "USER":
                    return ResponseEntity.ok("/hotelpage");
            }
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Role not recognized");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/status")
    public ResponseEntity<?> getAuthStatus(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
        }

        User user = userRepository.findByUsername(authentication.getName())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        return ResponseEntity.ok(new UserInfoResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getPhone(),
            authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList(),
            user.isEnabled()
        ));
    }
}