package store.oneul.mvc.security.oauth;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import store.oneul.mvc.security.jwt.JwtProvider;
import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;
// 실제 ID Token 받아서 처리하는 진짜 로그인 후처리 담당
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired private GoogleIdTokenVerifier tokenVerifier;
    @Autowired private JwtProvider jwtProvider;
    @Autowired private UserService userService;

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
        // System.out.println("[OAuth2SuccessHandler] ID TOKEN: " + idToken);

        try {
            Map<String, Object> claims = tokenVerifier.verify(idToken);

            String email = (String) claims.get("email");
            String name = (String) claims.get("name");
            String picture = (String) claims.get("picture");

            // System.out.println("사용자: " + email + ", 이름: " + name);
            
            UserDTO user = userService.findByEmail(email);
            if (user == null) {
                user = UserDTO.builder()
                        .email(email)
                        .username(name)
                        .profileImg(picture)
                        .oauthProvider("google")
                        .build();
                userService.insertUser(user);
                user = userService.findByEmail(email); // user_id 다시 조회
            }

            String jwt = jwtProvider.createToken(user.getUserId());

            System.out.println("JWT 생성 완료: " + jwt);

            boolean signupCompleted = Boolean.TRUE.equals(user.getSignupCompleted());

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            String json = String.format(
                "{\"token\":\"%s\", \"signupCompleted\":%s}",
                jwt,
                signupCompleted ? "true" : "false"
            );
            response.getWriter().write(json);

        } catch (Exception e) {
//            System.out.println("❌ 예외 발생! 메시지:");
            e.printStackTrace();  //  예외 전체 로그 찍기
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid ID Token");
        }
    }
}
