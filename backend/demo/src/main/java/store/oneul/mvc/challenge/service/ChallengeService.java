package store.oneul.mvc.challenge.service;

import java.util.List;

import store.oneul.mvc.challenge.dto.ChallengeDTO;

public interface ChallengeService {
    public void insertChallenge(ChallengeDTO challengeDTO);

    public void updateChallenge(ChallengeDTO challengeDTO);

    public void deleteChallenge(Long challengeId);

    public ChallengeDTO getChallenge(Long challengeId);

    public List<ChallengeDTO> getChallenges();
}
