package store.oneul.mvc.challenge.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{challengeId}")
    public ResponseEntity<ChallengeDTO> getChallenge(@PathVariable Long challengeId) {
        ChallengeDTO challengeDTO = challengeService.getChallenge(challengeId);
        return ResponseEntity.ok(challengeDTO);
    }

    @GetMapping
    public ResponseEntity<List<ChallengeDTO>> getChallenges() {
        List<ChallengeDTO> challengeDTOs = challengeService.getChallenges();
        return ResponseEntity.ok(challengeDTOs);
    }

}
