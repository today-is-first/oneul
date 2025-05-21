package store.oneul.mvc.challenge.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.challenge.dto.ChallengeDTO;
import store.oneul.mvc.challenge.service.ChallengeService;
import store.oneul.mvc.config.ApiResponse;
import store.oneul.mvc.user.dto.UserDTO;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {
    private final ChallengeService challengeService;

    @PostMapping
    public ResponseEntity<ChallengeDTO> postChallenge(@RequestBody ChallengeDTO challengeDTO) {
        challengeService.insertChallenge(challengeDTO);
        return ResponseEntity.ok(challengeDTO);
    }

    @PutMapping("/{challengeId}")
    public ResponseEntity<ChallengeDTO> putChallenge(@PathVariable Long challengeId,
            @RequestBody ChallengeDTO challengeDTO) {
        challengeService.updateChallenge(challengeDTO);
        return ResponseEntity.ok(challengeDTO);
    }

    @DeleteMapping("/{challengeId}")
    public ResponseEntity<ChallengeDTO> deleteChallenge(@PathVariable Long challengeId) {
        challengeService.deleteChallenge(challengeId);
        return ResponseEntity.ok().build();
    }

    /** 일반 챌린지 조회용(챌린지 신청, 결제) */
    @GetMapping("/{challengeId}")
    public ResponseEntity<ChallengeDTO> getChallengeById(@PathVariable Long challengeId) {
    	ChallengeDTO dto = challengeService.getChallenge(challengeId);
    	return ResponseEntity.ok(dto);
    }
    
    /** 나의 챌린지 조회용(챌린지 디테일) */
    @GetMapping("/my/{challengeId}")
    public ResponseEntity<ChallengeDTO> getMyChallenge(
            @PathVariable Long challengeId,
            @AuthenticationPrincipal UserDTO loginUser) {
        
        Long loginUserId = loginUser.getUserId();
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("challengeId", challengeId);
        paramMap.put("loginUserId", loginUserId);

        ChallengeDTO dto = challengeService.getMyChallenge(paramMap);
        System.out.println("dto: " + dto);

        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<ChallengeDTO>> getChallenges() {
        List<ChallengeDTO> challengeDTOs = challengeService.getChallenges();
        return ResponseEntity.ok(challengeDTOs);
    }

    @GetMapping("/community")
    public ResponseEntity<List<ChallengeDTO>> getCommunityChallenges() {
        List<ChallengeDTO> challengeDTOs = challengeService.getCommunityChallenges();
        return ResponseEntity.ok(challengeDTOs);
    }

    @GetMapping("/subscribed")
    public ResponseEntity<List<ChallengeDTO>> getSubscribedChallenges(
            @AuthenticationPrincipal UserDTO loginUser) {
        Long loginUserId = loginUser.getUserId();
        List<ChallengeDTO> challengeDTOs = challengeService.getSubscribedChallenges(loginUserId);
        return ResponseEntity.ok(challengeDTOs);
    }   

    @PostMapping("/{challengeId}/user")
    public ResponseEntity<ApiResponse<String>> postChallengeUser(
    		@PathVariable Long challengeId,
    		@AuthenticationPrincipal UserDTO loginUser,
    		@RequestBody(required = false) Map<String, String> body) {
    	String roomPassword = body != null ? body.get("roomPassword") : null;

        challengeService.joinChallenge(challengeId, loginUser.getUserId(), roomPassword);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("null"));
    }
    
}
