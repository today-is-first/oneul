package store.oneul.mvc.challenge.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import store.oneul.mvc.challenge.dto.ChallengeDTO;

@Mapper
public interface ChallengeDAO {

    ChallengeDTO getChallenge(Long challengeId);

    List<ChallengeDTO> getChallenges();

    void insertChallenge(ChallengeDTO challengeDTO);

    void updateChallenge(ChallengeDTO challengeDTO);

    void deleteChallenge(Long challengeId);
}