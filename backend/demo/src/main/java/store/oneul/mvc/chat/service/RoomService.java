package store.oneul.mvc.chat.service;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RoomService {

    public void handleJoin(String sessionId, String roomId) {
        log.info("[join] {} joined room {}", sessionId, roomId);
        // 참가 처리 로직, 룸 상태 업데이트 등
    }
}