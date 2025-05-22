package store.oneul.mvc.security.rtr;

import java.time.Duration;
import java.util.Optional;
import java.util.UUID;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.Setter;
import store.oneul.mvc.security.jwt.JwtProvider;

@Service
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "frontend")
@Setter
public class RefreshTokenService {

    private final RefreshTokenDao refreshTokenRepository;
    private final JwtProvider jwtProvider;
    private int refreshTokenExpirationTime;

    public String createAndSaveRefreshToken(Long userId) {
        String refreshToken = UUID.randomUUID().toString();
        // refreshTokenRepository.save(String.valueOf(userId), refreshToken,
        // refreshTokenExpirationTime);
        return refreshToken;
    }

    public boolean validate(String userId, String providedToken) {
        String savedToken = refreshTokenRepository.findByUserId(userId);
        return savedToken != null && savedToken.equals(providedToken);
    }

    public void delete(String userId) {
        refreshTokenRepository.delete(userId);
    }

    public Optional<String> reissue(String refreshToken, String accessToken) {
        try {
            Long userId = jwtProvider.getUserIdFromToken(accessToken);
            String userIdStr = String.valueOf(userId);

            String saved = refreshTokenRepository.findByUserId(userIdStr);
            if (!refreshToken.equals(saved)) {
                System.out.println("[RTR] ❌ RefreshToken mismatch for userId = " + userIdStr);
                return Optional.empty();
            }

            String newAccessToken = jwtProvider.createToken(userId);

            refreshTokenRepository.delete(userIdStr);
            String newRefreshToken = UUID.randomUUID().toString();
            // refreshTokenRepository.save(userIdStr, newRefreshToken,
            // Duration.ofDays(refreshTokenExpirationTime));

            System.out.println("[RTR] ✅ Access & Refresh Token reissued for userId = " + userIdStr);

            return Optional.of(newAccessToken);
        } catch (Exception e) {
            System.out.println("[RTR] ❌ Error during token reissue: " + e.getMessage());
            return Optional.empty();
        }
    }
}
