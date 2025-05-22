package store.oneul.mvc.security.jwt;

import java.io.IOException;
import java.util.List;

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
import store.oneul.mvc.security.rtr.RefreshTokenService;
import store.oneul.mvc.security.token.TokenHelper;
import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final TokenHelper tokenHelper; // ✅ 추가

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        logTokensFromCookies(request); // 🍪 단순 로그

        String header = request.getHeader("Authorization");
        String accessToken = (header != null && header.startsWith("Bearer ")) ? header.substring(7) : null;

        if (accessToken != null) {
            try {
                System.out.println("accesstoken null 들어옴");

                Long userId = jwtProvider.getUserIdFromToken(accessToken);

                if (!jwtProvider.isTokenExpired(accessToken)) {
                    // ✅ accessToken 유효
                    authenticateUser(userId);
                    chain.doFilter(request, response);
                    return;
                }

                // ❗ accessToken 만료 → 쿠키에서 refreshToken 꺼내서 재발급 시도
                String refreshToken = getTokenFromCookies(request, "refreshToken");
                System.out.println("jwtAu~~refreshToken:: " + refreshToken);

                if (refreshToken != null && refreshTokenService.validate(String.valueOf(userId), refreshToken)) {
                    String newAccessToken = jwtProvider.createToken(userId);

                    Cookie accessTokenCookie = tokenHelper.createAccessTokenCookie(newAccessToken);
                    Cookie refreshTokenCookie = tokenHelper.createRefreshTokenCookie(refreshToken, userId); // ✅ 기존 refreshToken 유지

                    response.addCookie(accessTokenCookie);
                    response.addCookie(refreshTokenCookie);

                    System.out.println("[AUTH] 🔄 accessToken 재발급 완료 (쿠키 기반)");
                    authenticateUser(userId);
                    chain.doFilter(request, response);
                    return;
                }


                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "accessToken 만료 & refreshToken 없음 또는 불일치");
                return;

            } catch (Exception e) {
                System.out.println("[AUTH] ❌ accessToken 파싱/검증 실패: " + e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "accessToken 검증 실패");
                return;
            }
        }

        // ❌ accessToken 자체 없음 → 다음 필터로 넘김
        chain.doFilter(request, response);
    }

    private void authenticateUser(Long userId) {
        UserDTO user = userService.findById(userId);
        if (user != null) {
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user, null, List.of(new SimpleGrantedAuthority("ROLE_USER")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }

    private String getTokenFromCookies(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if (name.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    // 🍪 로그 확인용
    private void logTokensFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) {
            System.out.println("[DEBUG] 🍪 쿠키 없음");
            return;
        }

        for (Cookie cookie : request.getCookies()) {
            if ("accessToken".equals(cookie.getName())) {
                System.out.println("[DEBUG] 🍪 accessToken 쿠키 값: " + cookie.getValue());
            } else if ("refreshToken".equals(cookie.getName())) {
                System.out.println("[DEBUG] 🍪 refreshToken 쿠키 값: " + cookie.getValue());
            }
        }
    }
}
