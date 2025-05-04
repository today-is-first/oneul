package store.oneul.mvc.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
//email 기반 JWT 발급 + 검증
@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secretKeyStr;

    private SecretKey getSecretKey() {
        byte[] keyBytes = secretKeyStr.getBytes(); // 또는 Base64 디코딩: Base64.getDecoder().decode(secretKeyStr);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(Long userId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId)) // userId를 문자열로 변환해 subject에 저장
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
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
