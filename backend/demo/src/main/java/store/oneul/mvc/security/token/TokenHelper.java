package store.oneul.mvc.security.token;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.Cookie;


@Component
@RequiredArgsConstructor
public class TokenHelper {
    private final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    private final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
    private final int ACCESS_TOKEN_EXPIRATION_TIME = 60 * 60; // 1시간
    private final int REFRESH_TOKEN_EXPIRATION_TIME = 60 * 60 * 24 * 7; // 7일

    public Cookie createAccessTokenCookie(String token) {
        Cookie cookie = new Cookie(ACCESS_TOKEN_COOKIE_NAME, token);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(ACCESS_TOKEN_EXPIRATION_TIME);
        return cookie;
    }

    public Cookie createRefreshTokenCookie(String token) {
        Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE_NAME, token);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(REFRESH_TOKEN_EXPIRATION_TIME);
        return cookie;
    }
}
