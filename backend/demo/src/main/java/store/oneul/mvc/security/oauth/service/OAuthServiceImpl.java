package store.oneul.mvc.security.oauth.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.security.jwt.JwtProvider;
import store.oneul.mvc.security.rtr.RefreshTokenService;
import store.oneul.mvc.user.dao.UserDAO;
import store.oneul.mvc.user.dto.LoginResultDTO;
import store.oneul.mvc.user.dto.UserDTO;

@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserDAO userDAO;

    @Override
    public LoginResultDTO login(UserDTO user) {
        Map<String, Object> accessTokenClaims = new HashMap<>();
        accessTokenClaims.put("userName", user.getUsername());
        accessTokenClaims.put("userEmail", user.getEmail());
        accessTokenClaims.put("userProfile", user.getProfileImg());
        accessTokenClaims.put("userId", user.getUserId());
        accessTokenClaims.put("userNickname", user.getNickname());

        String accessToken = jwtProvider.createToken(user.getUserId(), accessTokenClaims);
        String refreshToken = refreshTokenService.createAndSaveRefreshToken(user.getUserId());

        return LoginResultDTO.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .signupCompleted(user.getSignupCompleted())
            .build();
    }
    
    @Override
    public LoginResultDTO guestLogin(int guestNo) {
        UserDTO guest = userDAO.findByEmail("guest" + guestNo + "@oneul.store");
        if (guest == null) {
            throw new RuntimeException("Guest not found");
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("userName", guest.getUsername());
        claims.put("userEmail", guest.getEmail());
        claims.put("userProfile", guest.getProfileImg());
        claims.put("userId", guest.getUserId());
        claims.put("userNickname", guest.getNickname());
        
        return LoginResultDTO.builder()
            .accessToken(jwtProvider.createToken(guest.getUserId(), claims))
            .refreshToken(refreshTokenService.createAndSaveRefreshToken(guest.getUserId()))
            .signupCompleted(guest.getSignupCompleted())
            .build();
    }
}