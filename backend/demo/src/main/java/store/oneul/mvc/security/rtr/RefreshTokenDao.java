package store.oneul.mvc.security.rtr;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;

@Repository
@RequiredArgsConstructor
public class RefreshTokenDao {

    private final RedisTemplate<String, String> redisTemplate;
    private static final String PREFIX = "RT:";

    // 저장
    public void save(String userId, String refreshToken, Duration expiration) {
        redisTemplate.opsForValue().set(PREFIX + userId, refreshToken, expiration);
    }

    // 조회
    public String findByUserId(String userId) {
        return redisTemplate.opsForValue().get(PREFIX + userId);
    }

    // 삭제
    public void delete(String userId) {
        redisTemplate.delete(PREFIX + userId);
    }
}
