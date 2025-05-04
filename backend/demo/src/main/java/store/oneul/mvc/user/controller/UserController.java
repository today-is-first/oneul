package store.oneul.mvc.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;

@RestController
public class UserController {
	
    @Autowired
    private UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }
	
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMyInfo(@AuthenticationPrincipal UserDTO user) {
    	user = userService.findById(user.getUserId());
        return ResponseEntity.ok(user);
    }

}
