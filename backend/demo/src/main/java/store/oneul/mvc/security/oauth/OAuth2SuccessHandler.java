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
// 실제 ID Token 받아서 처리하는 진짜 로그인 후처리 담당
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final GoogleIdTokenVerifier tokenVerifier;
    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService; // 🔥 추가

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
            String accessToken = jwtProvider.createToken(user.getUserId());
            String refreshToken = refreshTokenService.createAndSaveRefreshToken(user.getUserId());


            System.out.println("✅ AccessToken: " + accessToken);
            System.out.println("✅ RefreshToken (Redis 저장됨): " + refreshToken);

            boolean signupCompleted = Boolean.TRUE.equals(user.getSignupCompleted());

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            String json = String.format(
                "{\"token\":\"%s\", \"refresh\":\"%s\", \"signupCompleted\":%s}",
                accessToken,
                refreshToken,
                signupCompleted ? "true" : "false"
            );
            response.getWriter().write(json);

        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid ID Token");
        }
    }
}
