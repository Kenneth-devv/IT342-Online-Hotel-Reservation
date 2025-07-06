package edu.cit.onlineHotelResrv.controller;

import edu.cit.onlineHotelResrv.Entity.Role;
import edu.cit.onlineHotelResrv.Entity.User;
import edu.cit.onlineHotelResrv.dto.UserInfoResponse;
import edu.cit.onlineHotelResrv.repository.RoleRepository;
import edu.cit.onlineHotelResrv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/users")
    public ResponseEntity<List<UserInfoResponse>> getAllUsers(Authentication authentication) {
        try {
            User adminUser = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            List<User> users = userRepository.findAll();
            List<UserInfoResponse> userResponses = users.stream()
                    .map(user -> new UserInfoResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getPhone(),
                        user.getRoles().stream().map(Role::getName).collect(Collectors.toList()),
                        user.isEnabled()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(userResponses);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/roles")
    public ResponseEntity<List<String>> getAllRoles(Authentication authentication) {
        try {
            User adminUser = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            List<Role> roles = roleRepository.findAll();
            List<String> roleNames = roles.stream()
                    .map(Role::getName)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(roleNames);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/users/{userId}/roles")
    public ResponseEntity<String> updateUserRoles(
            @PathVariable Long userId,
            @RequestBody RoleUpdateRequest request,
            Authentication authentication) {
        try {
            User adminUser = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            User userToUpdate = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Role> allRoles = roleRepository.findAll();
            
            List<Role> newRoles = allRoles.stream()
                    .filter(role -> request.getRoles().contains(role.getName()))
                    .collect(Collectors.toList());

            userToUpdate.setRoles(new java.util.HashSet<>(newRoles));
            userRepository.save(userToUpdate);

            return ResponseEntity.ok("User roles updated successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating user roles: " + e.getMessage());
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserInfoResponse> getUserById(
            @PathVariable Long userId,
            Authentication authentication) {
        try {
            User adminUser = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!adminUser.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserInfoResponse response = new UserInfoResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                user.getRoles().stream().map(Role::getName).collect(Collectors.toList()),
                user.isEnabled()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public static class RoleUpdateRequest {
        private List<String> roles;

        public RoleUpdateRequest() {}

        public List<String> getRoles() {
            return roles;
        }

        public void setRoles(List<String> roles) {
            this.roles = roles;
        }
    }
} 