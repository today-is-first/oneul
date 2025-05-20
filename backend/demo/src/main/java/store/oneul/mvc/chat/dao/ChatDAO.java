package store.oneul.mvc.chat.dao;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import store.oneul.mvc.chat.dto.ChatMessage;
import java.util.List;

@Mapper
public interface ChatDAO {
    public void createChat(@Param("challengeId") Long challengeId, @Param("chatMessage") ChatMessage chatMessage);

    public void updateChat(@Param("challengeId") Long challengeId, @Param("chatMessage") ChatMessage chatMessage);

    public void deleteChat(@Param("challengeId") Long challengeId, @Param("id") Long id);

    public ChatMessage getChat(@Param("challengeId") Long challengeId, @Param("id") Long id);

    public List<ChatMessage> getChats(@Param("userId") Long userId);

    public List<ChatMessage> getPreviousChats(@Param("challengeId") Long challengeId, @Param("beforeId") Long beforeId);
}
