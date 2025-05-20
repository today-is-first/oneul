package store.oneul.mvc.chat.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnEvent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import store.oneul.mvc.chat.dao.ChatDAO;
import store.oneul.mvc.chat.dto.ChatMessage;
import store.oneul.mvc.chat.dto.FetchPreviousMessagesRequest;

@Component
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final SocketIOServer server;
    private final ChatDAO chatDAO;

    @OnEvent("chat")
    public void onChat(SocketIOClient client, ChatMessage message) {
        log.info("[chat] {}: {} - {}", client.getSessionId(), message.getUserId(), message.getContent());
        chatDAO.createChat(message.getChallengeId(), message);
        server.getRoomOperations(String.valueOf(message.getChallengeId())).sendEvent("chat", message);
    }

    @OnEvent("messages")
    public void onMessages(SocketIOClient client) {
        Long userId = client.get("userId");
        log.info("[messages] {}", userId);
        List<ChatMessage> chatMessages = chatDAO.getChats(userId);
        client.sendEvent("messages", chatMessages);
    }

    @OnEvent("fetchPreviousMessages")
    public void onFetchPreviousMessages(SocketIOClient client, FetchPreviousMessagesRequest request) {
        log.info("[fetchPreviousMessages] challengeId: {}, beforeId: {}", request.getChallengeId(), request.getBeforeId());
        List<ChatMessage> chatMessages = chatDAO.getPreviousChats(request.getChallengeId(), request.getBeforeId());
        client.sendEvent("previousMessages", Map.of(
            "challengeId", request.getChallengeId(),
            "messages", chatMessages
        ));
    }
}