package store.oneul.mvc.challenge.service;

import java.util.List;

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
    public ChallengeDTO getChallenge(Long challengeId) {
        return challengeDAO.getChallenge(challengeId);
    }

    @Override
    public List<ChallengeDTO> getChallenges() {
        return challengeDAO.getChallenges();
    }

}
