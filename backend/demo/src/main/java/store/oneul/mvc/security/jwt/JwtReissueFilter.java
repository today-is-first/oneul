package store.oneul.mvc.security.jwt;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import store.oneul.mvc.security.common.CustomHeaderRequestWrapper;
import store.oneul.mvc.security.oauth.service.OAuthService;
import store.oneul.mvc.security.rtr.RefreshTokenDao;
import store.oneul.mvc.security.rtr.RefreshTokenService;
import store.oneul.mvc.security.token.TokenHelper;
import store.oneul.mvc.user.dto.LoginResultDTO;
import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;

@Component
@RequiredArgsConstructor
public class JwtReissueFilter extends OncePerRequestFilter {

    private final RefreshTokenService refreshTokenService;
    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final OAuthService oauthService;
    private final TokenHelper tokenHelper;
    private final RefreshTokenDao refreshTokenDao;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String accessToken = extractToken(request.getHeader(HttpHeaders.AUTHORIZATION));
        Cookie[] cookies = request.getCookies();
        String refreshToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        System.out.println("[JwtReissueFilter] 리프레시 토큰: " + refreshToken);
        System.out.println("[JwtReissueFilter] 액세스 토큰: " + accessToken);
        if (accessToken == null && refreshToken == null) {
            System.out.println("[JwtReissueFilter] 토큰이 모두 없습니다. 다음 필터로 진행합니다.");
            filterChain.doFilter(request, response);
            return;
        }
        try {
            if (((accessToken != null && jwtProvider.isTokenExpired(accessToken)) || accessToken == null)
                    && refreshToken != null) {
                System.out.println("[JwtReissueFilter] 재발행 로직 실행: " + refreshToken);
                String userIdStr = refreshTokenDao.findByToken(refreshToken);
                Long userId = Long.parseLong(userIdStr);
                System.out.println("[JwtReissueFilter] 리프레시 토큰: " + refreshToken);
                System.out.println("[JwtReissueFilter] 유저 아이디: " + userId);
                UserDTO user = userService.findById(userId);
                System.out.println("[JwtReissueFilter] 유저: " + user);
                LoginResultDTO loginResult = oauthService.login(user);
                System.out.println("[JwtReissueFilter] 로그인 결과: " + loginResult);
                System.out.println("[JwtReissueFilter] 유저 아이디: " + user.getUserId());

                Cookie accessTokenCookie = tokenHelper.createAccessTokenCookie(loginResult.getAccessToken());
                Cookie refreshTokenCookie = tokenHelper.createRefreshTokenCookie(loginResult.getRefreshToken());

                response.addCookie(accessTokenCookie);
                response.addCookie(refreshTokenCookie);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        List.of(new SimpleGrantedAuthority("ROLE_USER")));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                response.setHeader("Authorization", "Bearer " + loginResult.getAccessToken());
                CustomHeaderRequestWrapper wrappedRequest = new CustomHeaderRequestWrapper(request,
                        loginResult.getAccessToken());
                System.out.println("[JwtReissueFilter] 헤더 설정: " + loginResult.getAccessToken());
                filterChain.doFilter(wrappedRequest, response);
            }
        } catch (Exception e) {
            System.out.println("[JwtReissueFilter] ⚠️ AccessToken expired or invalid. Attempting reissue.");
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(String bearerHeader) {
        if (bearerHeader != null && bearerHeader.startsWith("Bearer ")) {
            return bearerHeader.substring(7);
        }
        return null;
    }
}
