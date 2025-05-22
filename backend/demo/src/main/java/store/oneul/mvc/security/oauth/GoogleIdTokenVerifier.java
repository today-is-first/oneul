package store.oneul.mvc.security.oauth;

import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;

import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;

import java.net.URL;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// 구글에서 발급한 토큰 맞는지 JWK 키로 확인
@Component
public class GoogleIdTokenVerifier {

    private static final String GOOGLE_JWK_URL = "https://www.googleapis.com/oauth2/v3/certs";

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    public Map<String, Object> verify(String idToken) throws Exception {
        System.out.println("[GoogleIdTokenVerifier] 시작 - 토큰 파싱");

        SignedJWT signedJWT = SignedJWT.parse(idToken);
        JWKSource<SecurityContext> keySource = new RemoteJWKSet<>(new URL(GOOGLE_JWK_URL));
        ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
        JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(
                signedJWT.getHeader().getAlgorithm(), keySource);
        jwtProcessor.setJWSKeySelector(keySelector);

        JWTClaimsSet claims = jwtProcessor.process(signedJWT, null);

        // System.out.println("issuer: " + claims.getIssuer());
        // System.out.println("audience: " + claims.getAudience());
        // System.out.println("expected CLIENT_ID: " + clientId);

        if (!claims.getIssuer().equals("https://accounts.google.com")) {
            System.out.println("Invalid issuer: " + claims.getIssuer());
            throw new IllegalArgumentException("Invalid issuer");
        }

        if (!claims.getAudience().contains(clientId)) {
            System.out.println("Invalid audience: " + claims.getAudience());
            throw new IllegalArgumentException("Invalid audience");
        }

        System.out.println("[GoogleIdTokenVerifier] 검증 성공 - 유효한 ID 토큰");

        return claims.getClaims();
    }
}
