package store.oneul.mvc.feed.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.feed.dto.CommunityFeedDTO;
import store.oneul.mvc.feed.dto.FeedDTO;
import store.oneul.mvc.feed.dto.StreakDTO;
import store.oneul.mvc.feed.service.FeedService;
import store.oneul.mvc.user.dto.UserDTO; 


@RestController
@RequestMapping("/api/feeds")
@RequiredArgsConstructor    
public class PersonalFeedController {
    private final FeedService feedService;

    @GetMapping("/my")
    public ResponseEntity<List<FeedDTO>> getMyFeeds(@AuthenticationPrincipal UserDTO user) {
        return ResponseEntity.ok(feedService.getMyFeeds(user.getUserId()));
    }

    @GetMapping("/community")
    public ResponseEntity<List<CommunityFeedDTO>> getCommunityFeeds() {
        return ResponseEntity.ok(feedService.getCommunityFeeds());
    }

    @GetMapping("/streak")
    public ResponseEntity<List<StreakDTO>> getStreak(@AuthenticationPrincipal UserDTO user) {
        return ResponseEntity.ok(feedService.getStreak(user.getUserId()));
    }
}
