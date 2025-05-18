package store.oneul.mvc.user.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.security.jwt.JwtProvider;
import store.oneul.mvc.security.rtr.RefreshTokenService;
import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
	
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;

	
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

    @PostMapping("/guest-login/{guestNo}")
    public ResponseEntity<?> guestLogin(@PathVariable int guestNo) {

        String email = "guest" + guestNo + "@oneul.store";
        UserDTO guest = userService.findByEmail(email);
        if (guest == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("❌ 해당 게스트 계정이 존재하지 않습니다");
        }

        Map<String, Object> claims = Map.of(
            "userId", guest.getUserId(),
            "username", guest.getUsername(),
            "nickname", guest.getNickname(),
            "isGuest", true
        );

        String accessToken = jwtProvider.createToken(guest.getUserId(), claims);
        String refreshToken = refreshTokenService.createAndSaveRefreshToken(guest.getUserId()); // ✅ 추가

        return ResponseEntity.ok(Map.of(
            "accessToken", accessToken,
            "refreshToken", refreshToken
        ));
    }

}
