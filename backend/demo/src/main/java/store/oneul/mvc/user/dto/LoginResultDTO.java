package store.oneul.mvc.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResultDTO {
    private String accessToken;
    private String refreshToken;
    private boolean signupCompleted;
}
