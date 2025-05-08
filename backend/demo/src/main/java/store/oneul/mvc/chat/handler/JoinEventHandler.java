package store.oneul.mvc.chat.handler;

import org.springframework.stereotype.Component;

import com.corundumstudio.socketio.SocketIOServer;

import store.oneul.mvc.chat.service.RoomService;

@Component
public class JoinEventHandler {

    private final RoomService roomService;

    public JoinEventHandler(SocketIOServer server, RoomService roomService) {
        this.roomService = roomService;

        server.addEventListener("join", String.class, (client, roomId, ackSender) -> {
            this.roomService.handleJoin(client.getSessionId().toString(), roomId);
        });
    }
}