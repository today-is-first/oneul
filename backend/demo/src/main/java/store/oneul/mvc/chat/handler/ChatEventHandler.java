package store.oneul.mvc.chat.handler;

import org.springframework.stereotype.Component;

import com.corundumstudio.socketio.SocketIOServer;

import store.oneul.mvc.chat.service.ChatService;

@Component
public class ChatEventHandler {

    private final ChatService chatService;

    public ChatEventHandler(SocketIOServer server, ChatService chatService) {
        this.chatService = chatService;

        server.addEventListener("chat", String.class, (client, data, ackSender) -> {
            this.chatService.handleChat(client.getSessionId().toString(), data);
        });
    }
}