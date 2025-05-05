package store.oneul.mvc.user.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data        // 모든 필드에 대해 getter, setter, toString, equals, hashCode 자동 생성
@Builder     // 빌더 패턴 지원
@NoArgsConstructor // 기본 생성자 생성
@AllArgsConstructor // 모든 필드 생성자 생성
public class UserDTO {
	
    private Long userId;
    private String username;
    private String email;
    private String oauthProvider;
    private String profileImg;
    private String userTel;
    private String nickname;
    private Boolean userDelFl;
    private Boolean authority;
    private Boolean signupCompleted;
    private LocalDateTime createdAt;
}
