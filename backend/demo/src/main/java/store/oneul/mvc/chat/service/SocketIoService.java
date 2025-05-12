package store.oneul.mvc.chat.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import store.oneul.mvc.challenge.dto.ChallengeDTO;
import store.oneul.mvc.challenge.service.ChallengeService;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocketIoService {
    private final ChallengeService challengeService;

    public void onConnect(SocketIOClient client) {
        System.out.println("Connected to socket server");
        // 사용자의 챌린지 구독 정보 조회
        List<ChallengeDTO> subscribedChallenges = challengeService
                .getSubscribedChallenges(client.get("userId"));

        // 각 챌린지 방에 조인
        for (ChallengeDTO challenge : subscribedChallenges) {
            String challengeRoomId = String.valueOf(challenge.getChallengeId());
            log.info("사용자 {} 가 챌린지 방 {} 에 조인됨", client.get("userId"), challengeRoomId);
            client.joinRoom(challengeRoomId);
        }
        System.out.println("각 챌린지 방에 조인됨");
    }

    public void onDisconnect(SocketIOClient client) {
        System.out.println("Disconnected from socket server");
    }

}
