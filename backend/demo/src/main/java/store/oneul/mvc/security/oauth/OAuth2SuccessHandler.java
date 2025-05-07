package store.oneul.mvc.security.oauth;

import java.io.IOException;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import store.oneul.mvc.security.jwt.JwtProvider;
import store.oneul.mvc.security.rtr.RefreshTokenService;
import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;

import jakarta.servlet.http.Cookie;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.HashMap;


// 실제 ID Token 받아서 처리하는 진짜 로그인 후처리 담당
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final GoogleIdTokenVerifier tokenVerifier;
    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService; // 🔥 추가

    private final String FRONTEND_URL = "http://localhost:5173";
    private final String REDIRECT_PATH = "/oauth/redirect";
    private final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    private final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
    private final int ACCESS_TOKEN_EXPIRATION_TIME = 60 * 60; // 1시간
    private final int REFRESH_TOKEN_EXPIRATION_TIME = 60 * 60 * 24 * 7; // 7일

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        if (!(oAuth2User instanceof OidcUser oidcUser)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Not an OIDC user");
            return;
        }

        if (oidcUser.getIdToken() == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "ID Token is missing");
            return;
        }

        String idToken = oidcUser.getIdToken().getTokenValue();

        try {
            Map<String, Object> claims = tokenVerifier.verify(idToken);

            String email = (String) claims.get("email");
            String name = (String) claims.get("name");
            String picture = (String) claims.get("picture");

            UserDTO user = userService.findByEmail(email);
            if (user == null) {
                user = UserDTO.builder()
                        .email(email)
                        .username(name)
                        .profileImg(picture)
                        .oauthProvider("google")
                        .build();
                userService.insertUser(user);
                user = userService.findByEmail(email);
            }

            // 🔹 Access + Refresh Token 발급
            Map<String, Object> accessTokenClaims = new HashMap<>();
            accessTokenClaims.put("userName", user.getUsername());
            accessTokenClaims.put("userEmail", user.getEmail());
            accessTokenClaims.put("userProfile", user.getProfileImg());

            String accessToken = jwtProvider.createToken(user.getUserId(), accessTokenClaims);
            String refreshToken = refreshTokenService.createAndSaveRefreshToken(user.getUserId());


            System.out.println("✅ AccessToken: " + accessToken);
            System.out.println("✅ RefreshToken (Redis 저장됨): " + refreshToken);

            boolean signupCompleted = Boolean.TRUE.equals(user.getSignupCompleted());

            // ✅ JWT 쿠키로 저장 (HttpOnly, Secure 옵션 포함)
            Cookie accessTokenCookie = new Cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken);
            accessTokenCookie.setHttpOnly(false);
            accessTokenCookie.setSecure(false); // TODO : 배포 후 true로 변경
            accessTokenCookie.setPath("/");
            accessTokenCookie.setMaxAge(ACCESS_TOKEN_EXPIRATION_TIME); // 1시간

            Cookie refreshTokenCookie = new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
            refreshTokenCookie.setHttpOnly(false);
            refreshTokenCookie.setSecure(false); // TODO : 배포 후 true로 변경   
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(REFRESH_TOKEN_EXPIRATION_TIME); // 7일
            
            response.addCookie(accessTokenCookie);
            response.addCookie(refreshTokenCookie);

            // ✅ signupCompleted만 URL 파라미터로 전달
            String redirectUrl = UriComponentsBuilder
                    .fromUriString(FRONTEND_URL + REDIRECT_PATH)
                    .queryParam("signupCompleted", signupCompleted)
                    .build()
                    .toUriString();

            response.sendRedirect(redirectUrl);

        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid ID Token");
        }
    }
}
