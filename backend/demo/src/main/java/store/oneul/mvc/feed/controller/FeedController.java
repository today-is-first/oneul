package store.oneul.mvc.feed.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.feed.dto.FeedDTO;
import store.oneul.mvc.feed.dto.FeedEvaluationRequest;
import store.oneul.mvc.feed.service.FeedService;

@RestController
@RequestMapping("api/challenges/{challengeId}/feeds")
@RequiredArgsConstructor
public class FeedController {
    private final FeedService feedService;

    @GetMapping
    public ResponseEntity<List<FeedDTO>> getFeeds(@PathVariable Long challengeId) {
        return ResponseEntity.ok(feedService.getFeeds(challengeId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedDTO> getFeed(@PathVariable Long challengeId, @PathVariable Long id) {
        return ResponseEntity.ok(feedService.getFeed(challengeId, id));
    }

    @PostMapping
    public ResponseEntity<FeedDTO> createFeed(@PathVariable Long challengeId, @RequestBody FeedDTO feedDTO) {
        feedService.createFeed(challengeId, feedDTO);
        return ResponseEntity.ok(feedDTO);
    }

    @PutMapping
    public ResponseEntity<FeedDTO> updateFeed(@PathVariable Long challengeId, @RequestBody FeedDTO feedDTO) {
        feedService.updateFeed(challengeId, feedDTO);
        return ResponseEntity.ok(feedDTO);
    }
    
    @PatchMapping("/{id}/checks")
    public ResponseEntity<FeedDTO> evaluateFeed(@PathVariable Long challengeId, @PathVariable Long id, @RequestBody FeedEvaluationRequest feedEvaluationRequest) {
    	feedEvaluationRequest.setChallengeId(challengeId);
    	feedEvaluationRequest.setId(id);
    	feedService.evaluateFeed(feedEvaluationRequest);
    	FeedDTO feedDTO = feedService.getFeed(challengeId, feedEvaluationRequest.getId());
    	return ResponseEntity.ok(feedDTO);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteFeed(@PathVariable Long challengeId, @RequestBody FeedDTO feedDTO) {
        feedService.deleteFeed(challengeId, feedDTO.getId());
        return ResponseEntity.noContent().build();
    }

}
