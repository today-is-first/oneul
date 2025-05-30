package store.oneul.mvc.chat.handler;

import org.springframework.stereotype.Component;

import com.corundumstudio.socketio.SocketIOServer;

import store.oneul.mvc.chat.service.ChatService;
import store.oneul.mvc.chat.dto.ChatMessage;
import store.oneul.mvc.chat.dto.FetchPreviousMessagesRequest;

@Component
public class ChatEventHandler {

    private final ChatService chatService;

    public ChatEventHandler(SocketIOServer server, ChatService chatService) {
        this.chatService = chatService;

        server.addEventListener("chat", ChatMessage.class, (client, data, ackSender) -> {
            System.out.println("chat event received");
            this.chatService.onChat(client, data);

        });

        server.addEventListener("messages",ChatMessage.class, (client, data, ackSender) -> {
            System.out.println("messages event received");
            this.chatService.onMessages(client);
        });

        server.addEventListener("fetchPreviousMessages", FetchPreviousMessagesRequest.class, (client, data, ackSender) -> {
            System.out.println("fetchPreviousMessages event received");
            this.chatService.onFetchPreviousMessages(client, data);
        });
    }
}