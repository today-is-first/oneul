package store.oneul.mvc.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	private int userId;
	private String username;
	private String email;
	private String oauthProvider;
	private String profileImg;
	private String userTel;
	private String nickname;
	
}
