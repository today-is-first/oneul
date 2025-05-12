package store.oneul.mvc.chat.service;

import org.springframework.stereotype.Component;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import lombok.extern.slf4j.Slf4j;
import store.oneul.mvc.chat.dto.ChatMessage;
import com.corundumstudio.socketio.annotation.OnEvent;
import lombok.RequiredArgsConstructor;
import store.oneul.mvc.chat.dao.ChatDAO;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final SocketIOServer server;
    private final ChatDAO chatDAO;

    @OnEvent("chat")
    public void onChat(SocketIOClient client, ChatMessage message) {
        log.info("[chat] {}: {} - {}", client.getSessionId(), message.getNickname(), message.getContent());
        chatDAO.createChat(message.getChallengeId(), message);
        server.getRoomOperations(message.getChallengeId().toString()).sendEvent("chat", message);        

    }

    @OnEvent("messages")
    public void onMessages(SocketIOClient client) {
        System.out.println("🔄 onMessages");
        Long userId = (Long) client.get("userId");
        System.out.println("🔄 userId: " + userId);
        log.info("[messages] {}", userId);
        List<ChatMessage> chats = chatDAO.getChats(userId);
        System.out.println("🔄 chats: " + chats);
        client.sendEvent("messages", chats);
    }
}