package store.oneul.mvc.security.oauth;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;
// OAuth 로그인 성공 후 유저 정보 꺼내주는 서비스
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserService userService;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String picture = (String) attributes.get("picture");

        // DB에 사용자 있는지 확인
        UserDTO user = userService.findByEmail(email);

        if (user == null) {
            UserDTO newUser = UserDTO.builder()
                    .username(name)
                    .email(email)
                    .oauthProvider("google")
                    .profileImg(picture)
                    .userDelFl(false)
                    .authority(false)
                    .build();
            userService.insertUser(newUser);  
        }
        // 로그인 성공 후 OAuth2User 객체 반환 (SecurityContext에 저장됨)
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), // 사용자 권한
                attributes,
                "email" // 사용자 식별자
        );
    }
}
