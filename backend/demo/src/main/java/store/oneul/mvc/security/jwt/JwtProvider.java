package store.oneul.mvc.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

//email 기반 JWT 발급 + 검증
@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secretKeyStr;

    private static final long ACCESS_TOKEN_VALIDITY = 15 * 60 * 1000L;
    
    private SecretKey getSecretKey() {
    	byte[] keyBytes = Base64.getDecoder().decode(secretKeyStr);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(Long userId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY))
                .signWith(getSecretKey())
                .compact();
    }

    public String createToken(Long userId, Map<String, Object> claims) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .addClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY))
                .signWith(getSecretKey())
                .compact();
    }

    public Long getUserIdFromToken(String token) {
        return Long.parseLong(
            Jwts.parser()
                .setSigningKey(getSecretKey())
                .parseClaimsJws(token)
                .getBody()
                .getSubject()
        );
    }

}
