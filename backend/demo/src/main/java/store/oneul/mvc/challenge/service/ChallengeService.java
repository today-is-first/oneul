package store.oneul.mvc.challenge.service;

import java.util.List;
import java.util.Map;

import store.oneul.mvc.challenge.dto.ChallengeDTO;

public interface ChallengeService {
    public void insertChallenge(ChallengeDTO challengeDTO);

    public void updateChallenge(ChallengeDTO challengeDTO);

    public void deleteChallenge(Long challengeId);

    public ChallengeDTO getMyChallenge(Map<String, Object> paramMap);

    public List<ChallengeDTO> getChallenges();

    public List<ChallengeDTO> getSubscribedChallenges(Long userId);

    public List<ChallengeDTO> getCommunityChallenges();
    
    public ChallengeDTO getChallenge(Long challengeId);

    public void joinChallenge(Long challengeId, Long userId, String roomPassword);

}
