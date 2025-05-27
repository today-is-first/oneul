package store.oneul.mvc.challenge.service;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.challenge.dao.ChallengeDAO;
import store.oneul.mvc.challenge.dto.ChallengeDTO;
import store.oneul.mvc.challenge.dto.ChallengeUserDTO;
import store.oneul.mvc.challenge.exception.ChallengeAlreadyJoinedException;
import store.oneul.mvc.common.exception.ForbiddenException;
import store.oneul.mvc.common.exception.InvalidParameterException;
import store.oneul.mvc.common.exception.NotFoundException;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {
    private final ChallengeDAO challengeDAO;

    @Transactional
    @Override
    public void insertChallenge(ChallengeDTO challengeDTO) {
        challengeDAO.insertChallenge(challengeDTO);

        Long generatedChallengeId = challengeDTO.getChallengeId();
        Long ownerId = challengeDTO.getOwnerId();

        ChallengeUserDTO dto = new ChallengeUserDTO(generatedChallengeId, ownerId, 0, false, 0);
        challengeDAO.insertChallengeUser(dto);
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
    	ChallengeDTO dto = challengeDAO.getMyChallenge(paramMap);
    	if(dto == null) {
    		throw new NotFoundException("챌린지를 찾을 수 없습니다.");
    	} 
    	if(dto.getSuccessDay() == null) {
    		throw new ForbiddenException("챌린지 조회 권한이 없습니다.");
    	}
        return dto;
    }

    @Override
    public List<ChallengeDTO> getMyChallenges(Long userId) {
        return challengeDAO.getMyChallenges(userId);
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

    /** 
     * 챌린지 가입
     * 비밀번호 있을 경우 검증 -> 통과시 가입
     *  */
	@Override
	public void joinChallenge(Long challengeId, Long userId, String roomPassword) {
        String stored = challengeDAO.getRoomPassword(challengeId);

        if (stored != null && !stored.isEmpty()) {
            if (roomPassword == null || !stored.equals(roomPassword)) {
                throw new InvalidParameterException("챌린지 비밀번호가 일치하지 않습니다.");
            }
        }

        ChallengeUserDTO dto = new ChallengeUserDTO(challengeId, userId, 0, false, 0);
        try {
            challengeDAO.insertChallengeUser(dto);
        } catch (DuplicateKeyException ex) {
            throw new ChallengeAlreadyJoinedException(challengeId, userId);
        }
    }
	
	/**
	 * 비밀번호 검증 
	 * */
	@Override
    public boolean isRoomPasswordValid(Long challengeId, String roomPassword) {
        String stored = challengeDAO.getRoomPassword(challengeId);
        if (stored == null || stored.isEmpty()) {
            return true;
        }
        return stored.equals(roomPassword);
    }

}
