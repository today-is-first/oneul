package store.oneul.mvc.challenge.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import store.oneul.mvc.challenge.dto.ChallengeDTO;

@Mapper
public interface ChallengeDAO {

    ChallengeDTO getMyChallenge(Map<String, Object> paramMap);

    List<ChallengeDTO> getChallenges();

    void insertChallenge(ChallengeDTO challengeDTO);

    void updateChallenge(ChallengeDTO challengeDTO);

    void deleteChallenge(Long challengeId);

    List<ChallengeDTO> getSubscribedChallenges(Long userId);

    List<ChallengeDTO> getCommunityChallenges();

	ChallengeDTO getChallengeById(Long challengeId);

}