package edu.cit.onlineHotelResrv.security;

import edu.cit.onlineHotelResrv.Entity.Role;
import edu.cit.onlineHotelResrv.Entity.User;
import edu.cit.onlineHotelResrv.repository.RoleRepository;
import edu.cit.onlineHotelResrv.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public OAuth2LoginSuccessHandler(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String fullName = oAuth2User.getAttribute("name");

        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            Role userRole = roleRepository.findByName("USER")
                    .orElseThrow(() -> new IllegalStateException("USER role not found"));

            String[] nameParts = fullName != null ? fullName.split(" ", 2) : new String[]{"Google", "User"};

            User newUser = new User();
            newUser.setUsername(email);
            newUser.setEmail(email);
            newUser.setFirstName(nameParts[0]);
            newUser.setLastName(nameParts.length > 1 ? nameParts[1] : "User");
            newUser.setPhone("000-000-0000");
            newUser.setPassword("");
            newUser.setEnabled(true);
            newUser.setRoles(Collections.singleton(userRole));

            userRepository.save(newUser);
        }

        response.sendRedirect("http://localhost:3000/hotelpage");
    }
}
