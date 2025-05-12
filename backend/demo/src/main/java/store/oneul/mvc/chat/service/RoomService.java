package store.oneul.mvc.chat.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import store.oneul.mvc.challenge.dto.ChallengeDTO;
import store.oneul.mvc.challenge.service.ChallengeService;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoomService {
    private final ChallengeService challengeService;
    private final SocketIOServer server;

    public void handleJoin(SocketIOClient client) {

    }
}