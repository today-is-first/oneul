package store.oneul.mvc.security.token;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import store.oneul.mvc.security.rtr.RefreshTokenService;


@Component
@RequiredArgsConstructor
@Setter
@ConfigurationProperties(prefix = "frontend")
public class TokenHelper {
    private String accessTokenCookieName;
    private String refreshTokenCookieName;
    private int accessTokenExpirationTime;
    private int refreshTokenExpirationTime;
    private final RefreshTokenService refreshTokenService;
 
    public Cookie createAccessTokenCookie(String token) {
        Cookie cookie = new Cookie(accessTokenCookieName, token);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(accessTokenExpirationTime);
        return cookie;
    }
    // Refresh Token 쿠키 생성
    public Cookie createRefreshTokenCookie(String token, long userId) {
        // Redis에서 저장된 refreshToken을 가져옵니다.
        String refreshToken = refreshTokenService.findByUserId(userId);

        if (refreshToken == null) {
            // Redis에 refreshToken이 없다면 새로 생성 후 저장
            refreshToken = refreshTokenService.createAndSaveRefreshToken(userId);
        }

        // 쿠키에 Redis에서 가져온 refreshToken을 설정
        Cookie cookie = new Cookie(refreshTokenCookieName, refreshToken);
        cookie.setHttpOnly(false); // 보안을 강화하려면 true로 설정
        cookie.setSecure(false); // HTTPS에서만 전송되도록 설정
        cookie.setPath("/");
        cookie.setMaxAge(refreshTokenExpirationTime);

        return cookie;
    }


}
