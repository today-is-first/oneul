package store.oneul.mvc.chat.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.corundumstudio.socketio.SocketIOServer;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import store.oneul.mvc.security.jwt.JwtProvider;

@Configuration
@ConfigurationProperties(prefix = "netty-socketio")
@RequiredArgsConstructor
@Getter
@Setter
public class SocketIoConfig {

    private String hostname;
    private int port;
    private final JwtProvider jwtProvider;

    @Bean
    public SocketIOServer socketIoServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname(hostname);
        config.setPort(port);
        config.setAllowCustomRequests(true);
        config.setOrigin("*");
        config.setPingTimeout(60000);
        config.setPingInterval(25000);
        config.setUpgradeTimeout(10000);
        config.setAllowHeaders("*");

        SocketIOServer server = new SocketIOServer(config);

        // 연결 시 인증 처리
        server.addConnectListener(client -> {
            String token = client.getHandshakeData().getSingleUrlParam("token");
            System.out.println("[Socket.IO] 토큰: " + token);
            if (token != null && token.startsWith("Bearer ")) {
                try {
                    Long userId = jwtProvider.getUserIdFromToken(token.substring(7));
                    client.set("userId", userId);
                    System.out.println("[Socket.IO] ✅ 인증 성공: userId = " + userId);
                } catch (Exception e) {
                    System.out.println("[Socket.IO] ❌ 인증 실패: " + e.getMessage());
                    client.disconnect();
                }
            } else {
                System.out.println("[Socket.IO] ❌ 토큰 없음");
                client.disconnect();
            }
        });

        return server;
    }
}