package store.oneul.mvc.challenge.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.challenge.dao.ChallengeDAO;
import store.oneul.mvc.challenge.dto.ChallengeDTO;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {
    private final ChallengeDAO challengeDAO;

    @Override
    public void insertChallenge(ChallengeDTO challengeDTO) {
        challengeDAO.insertChallenge(challengeDTO);
    }

    @Override
    public void updateChallenge(ChallengeDTO challengeDTO) {
        challengeDAO.updateChallenge(challengeDTO);
    }

    @Override
    public void deleteChallenge(Long challengeId) {
        challengeDAO.deleteChallenge(challengeId);
    }

    @Override
    public ChallengeDTO getMyChallenge(Map<String, Object> paramMap) {
        return challengeDAO.getMyChallenge(paramMap);
    }

    @Override
    public List<ChallengeDTO> getChallenges() {
        return challengeDAO.getChallenges();
    }

    @Override
    public List<ChallengeDTO> getSubscribedChallenges(Long userId) {
        return challengeDAO.getSubscribedChallenges(userId);
    }

    @Override
    public List<ChallengeDTO> getCommunityChallenges() {
        return challengeDAO.getCommunityChallenges();
    }

    @Override
    public ChallengeDTO getChallenge(Long challengeId) {
        return challengeDAO.getChallengeById(challengeId);
    }

}
