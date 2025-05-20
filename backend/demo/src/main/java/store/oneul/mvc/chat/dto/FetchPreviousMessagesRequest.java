package store.oneul.mvc.chat.dto;

import lombok.Data;

@Data
public class FetchPreviousMessagesRequest {
    private Long challengeId;
    private Long beforeId;
}