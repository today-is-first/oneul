package store.oneul.mvc.chat.controller;

import org.springframework.stereotype.Controller;

import com.corundumstudio.socketio.SocketIOServer;

import store.oneul.mvc.chat.service.SocketIoService;

@Controller
public class SocketIoController {
    private final SocketIOServer server;
    private final SocketIoService socketIoService;

    public SocketIoController(SocketIOServer server, SocketIoService socketIoService) {
        this.server = server;
        this.socketIoService = socketIoService;
        server.addConnectListener(socketIoService::onConnect);
        server.addDisconnectListener(socketIoService::onDisconnect);
    }
}