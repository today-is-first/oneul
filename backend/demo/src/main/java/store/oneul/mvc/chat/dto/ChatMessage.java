package store.oneul.mvc.chat.dto;

import lombok.Data;

@Data
public class ChatMessage {
    private String sender;
    private String content;
}