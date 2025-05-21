package store.oneul.mvc.security.oauth.service;

import store.oneul.mvc.user.dto.LoginResultDTO;
import store.oneul.mvc.user.dto.UserDTO;

public interface OAuthService {
    LoginResultDTO login(UserDTO user);
    LoginResultDTO guestLogin(int guestNo);
}
