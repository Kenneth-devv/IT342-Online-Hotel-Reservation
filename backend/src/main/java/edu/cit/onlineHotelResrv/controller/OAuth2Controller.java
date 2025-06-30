package edu.cit.onlineHotelResrv.controller;

import com.hotel.reservation.model.User;
import com.hotel.reservation.payload.JwtAuthenticationResponse;
import com.hotel.reservation.repository.UserRepository;
import com.hotel.reservation.security.JwtTokenProvider;
import com.hotel.reservation.security.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/oauth2")
public class OAuth2Controller {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    public OAuth2Controller(JwtTokenProvider tokenProvider, UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
    }

    @GetMapping("/success")
    public JwtAuthenticationResponse oauth2Success(Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User(name, email, "OAUTH2_USER");
                    return userRepository.save(newUser);
                });

        UserPrincipal userPrincipal = UserPrincipal.create(user);
        String token = tokenProvider.generateToken(userPrincipal);

        return new JwtAuthenticationResponse(token);
    }
}
