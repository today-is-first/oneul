package store.oneul.mvc.security.jwt;

import java.util.Base64;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import store.oneul.mvc.security.rtr.RefreshTokenDao;

//email 기반 JWT 발급 + 검증
@Component
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "jwt")
@Setter
public class JwtProvider {

    private String secret;
    private int accessTokenExpirationTime;
    private final RefreshTokenDao refreshTokenDao;

    private SecretKey getSecretKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(Long userId) {
        System.out.println("[JwtProvider] 액세스 토큰 생성 시작 - userId: " + userId);
        System.out.println("[JwtProvider] 액세스 토큰 만료 시간: " + System.currentTimeMillis() + accessTokenExpirationTime);
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationTime))
                .signWith(getSecretKey())
                .compact();
    }

    public String createToken(Long userId, Map<String, Object> claims) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .addClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationTime))
                .signWith(getSecretKey())
                .compact();
    }

    public Long getUserIdFromToken(String refreshToken) {
        refreshTokenDao.findByToken(refreshToken);
        return 1L;
    }

}
