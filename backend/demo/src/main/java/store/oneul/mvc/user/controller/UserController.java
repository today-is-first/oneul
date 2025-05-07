package store.oneul.mvc.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
	
    private final UserService userService;
	
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMyInfo(@AuthenticationPrincipal UserDTO user) {
    	user = userService.findById(user.getUserId());
        return ResponseEntity.ok(user);
    }

    @PatchMapping()
    public ResponseEntity<Void> updateUserInfo(@AuthenticationPrincipal UserDTO user, @RequestBody UserDTO input) {
        user.setSignupCompleted(true);
        user.setUserTel(input.getUserTel());
        user.setNickname(input.getNickname());
        user.setUsername(input.getUsername());
        userService.updateUserInfo(user);
        return ResponseEntity.ok().build();
    }

}
