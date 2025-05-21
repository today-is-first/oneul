package store.oneul.mvc.user.controller;

import java.io.IOException;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import store.oneul.mvc.security.oauth.service.OAuthService;
import store.oneul.mvc.security.token.TokenHelper;
import store.oneul.mvc.user.dto.LoginResultDTO;
import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "frontend")
@Setter
public class UserController {
	
    private final UserService userService;
    private final OAuthService oauthService;
    private final TokenHelper tokenHelper;
    private String url;
    private String redirectPath;
	
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMyInfo(@AuthenticationPrincipal UserDTO user) {
    	user = userService.findById(user.getUserId());
        return ResponseEntity.ok(user);
    }

    @PatchMapping()
    public ResponseEntity<Void> updateUserInfo(@AuthenticationPrincipal UserDTO user, @RequestBody UserDTO input) {
        user.setSignupCompleted(true);
        user.setUserTel(input.getUserTel());
        user.setNickname(input.getNickname());
        user.setUsername(input.getUsername());
        userService.updateUserInfo(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/guest-login/{guestNo}")
    public ResponseEntity<?> guestLogin(@PathVariable int guestNo, HttpServletResponse response) throws IOException {
        System.out.println("guestNo: " + guestNo);
        LoginResultDTO result = oauthService.guestLogin(guestNo);
        Cookie accessCookie = tokenHelper.createAccessTokenCookie(result.getAccessToken());
        Cookie refreshCookie = tokenHelper.createRefreshTokenCookie(result.getRefreshToken());
        System.out.println("accessCookie: " + accessCookie);
        System.out.println("refreshCookie: " + refreshCookie);
        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
        String redirectUrl = UriComponentsBuilder
            .fromUriString(url + redirectPath)
            .queryParam("signupCompleted", result.isSignupCompleted())
            .build()
            .toUriString();

        response.sendRedirect(redirectUrl);
            return ResponseEntity.ok(result);

    }

}
