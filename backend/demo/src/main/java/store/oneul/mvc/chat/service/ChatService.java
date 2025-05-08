package store.oneul.mvc.chat.service;

import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;

import lombok.extern.slf4j.Slf4j;
import store.oneul.mvc.chat.dto.ChatMessage;
import com.corundumstudio.socketio.annotation.OnEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final SocketIOServer server;


    @OnEvent("chat")
    public void onChat(SocketIOClient client, ChatMessage message) {
        log.info("[chat] {}: {} - {}", client.getSessionId(), message.getSender(), message.getContent());

        // 브로드캐스트 (원하면 sender 빼고 content만 보낼 수도 있음)
        server.getBroadcastOperations().sendEvent("chat", message);
    }
}