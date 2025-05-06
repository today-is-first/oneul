package store.oneul.mvc.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;

@RestController
@RequestMapping("/api/oauth")
public class OAuthController {
	
    private final UserService userService;

    public OAuthController(UserService userService) {
        this.userService = userService;
    }

    // 1. 회원가입 추가 정보 입력
    @PutMapping("/signup")
    public ResponseEntity<String> completeSignup(@AuthenticationPrincipal UserDTO user,
                                                 @RequestBody UserDTO input) {
    	user.setUsername(input.getUsername()); 
    	user.setNickname(input.getNickname());
        user.setUserTel(input.getUserTel());
        userService.updateUserInfo(user); // signup_completed = true 포함되게
        return ResponseEntity.ok("회원가입 완료");
    }
	
	

}
