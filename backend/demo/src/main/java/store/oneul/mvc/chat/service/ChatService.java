package store.oneul.mvc.chat.service;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChatService {

    public void handleChat(String sessionId, String message) {
        log.info("[chat] {}: {}", sessionId, message);
        // 메시지를 DB 저장하거나 브로드캐스트 등 처리
    }
}