package store.oneul.mvc.chat.dto;

import lombok.Data;

@Data
public class ChatMessage {
    private String content;
    private Long challengeId;
    private String createdAt;
    private Long id;
    private String nickname;
    private Long userId;
}