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
    public ChallengeDTO getChallenge(Map<String, Object> paramMap) {
        return challengeDAO.getChallenge(paramMap);
    }

    @Override
    public List<ChallengeDTO> getChallenges() {
        return challengeDAO.getChallenges();
    }

}
