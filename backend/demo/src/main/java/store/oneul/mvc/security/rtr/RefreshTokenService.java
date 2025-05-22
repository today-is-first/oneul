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

    private final RefreshTokenDao refreshTokenDao;
    private final JwtProvider jwtProvider;
    private int refreshTokenExpirationMinutes;

    public String createAndSaveRefreshToken(Long userId) {
        String refreshToken = UUID.randomUUID().toString();
        refreshTokenDao.save(String.valueOf(userId), refreshToken,
                Duration.ofMinutes(refreshTokenExpirationMinutes));
        return refreshToken;
    }

    public boolean validate(String userId, String providedToken) {
        String savedToken = refreshTokenDao.findByUserId(userId);
        return savedToken != null && savedToken.equals(providedToken);
    }

    public void delete(String userId) {
        refreshTokenDao.delete(userId);
    }

    public Optional<String> reissue(String refreshToken, String accessToken) {
        try {
            Long userId = jwtProvider.getUserIdFromToken(accessToken);
            String userIdStr = String.valueOf(userId);

            String saved = refreshTokenDao.findByUserId(userIdStr);
            if (!refreshToken.equals(saved)) {
                System.out.println("[RTR] ❌ RefreshToken mismatch for userId = " + userIdStr);
                return Optional.empty();
            }

            String newAccessToken = jwtProvider.createToken(userId);

            refreshTokenDao.delete(userIdStr);
            String newRefreshToken = UUID.randomUUID().toString();
            refreshTokenDao.save(userIdStr, newRefreshToken,
                    Duration.ofMinutes(refreshTokenExpirationMinutes));

            System.out.println("[RTR] ✅ Access & Refresh Token reissued for userId = " + userIdStr);

            return Optional.of(newAccessToken);
        } catch (Exception e) {
            System.out.println("[RTR] ❌ Error during token reissue: " + e.getMessage());
            return Optional.empty();
        }
    }
}
