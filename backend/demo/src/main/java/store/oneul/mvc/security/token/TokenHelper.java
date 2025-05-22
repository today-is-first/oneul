package store.oneul.mvc.security.token;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Component
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "frontend")
@Setter
public class TokenHelper {
    private String accessTokenCookieName;
    private String refreshTokenCookieName;
    private int accessTokenExpirationTime;
    private int refreshTokenExpirationTime;

    public Cookie createAccessTokenCookie(String token) {
        Cookie cookie = new Cookie(accessTokenCookieName, token);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(accessTokenExpirationTime);
        return cookie;
    }

    public Cookie createRefreshTokenCookie(String token) {
        Cookie cookie = new Cookie(refreshTokenCookieName, token);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(refreshTokenExpirationTime);
        return cookie;
    }
}
