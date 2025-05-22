package store.oneul.mvc.security.token;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import store.oneul.mvc.security.rtr.RefreshTokenService;

@Component
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "frontend")
@Setter
public class TokenHelper {
    private String accessTokenCookieName;
    private String refreshTokenCookieName;
    private int accessTokenCookieExpirationTime;
    private int refreshTokenCookieExpirationTime;

    private final RefreshTokenService refreshTokenService;

    public Cookie createAccessTokenCookie(String token) {
        Cookie cookie = new Cookie(accessTokenCookieName, token);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(accessTokenCookieExpirationTime);
        return cookie;
    }

    public Cookie createRefreshTokenCookie(String refreshToken) {
        Cookie cookie = new Cookie(refreshTokenCookieName, refreshToken);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(refreshTokenCookieExpirationTime);
        return cookie;
    }
}
