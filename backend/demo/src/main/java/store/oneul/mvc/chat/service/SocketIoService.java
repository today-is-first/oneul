package store.oneul.mvc.chat.service;

import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOClient;

@Service
public class SocketIoService {

    public void onConnect(SocketIOClient client) {
        System.out.println("Connected to socket server");
    }

    public void onDisconnect(SocketIOClient client) {
        System.out.println("Disconnected from socket server");
    }

}
