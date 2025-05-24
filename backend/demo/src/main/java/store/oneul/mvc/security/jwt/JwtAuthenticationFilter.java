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
import store.oneul.mvc.security.oauth.service.OAuthService;
import store.oneul.mvc.security.rtr.RefreshTokenDao;
import store.oneul.mvc.security.token.TokenHelper;
import store.oneul.mvc.user.dto.UserDTO;
import store.oneul.mvc.user.service.UserService;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        System.out.println("[JwtAuthenticationFilter] 헤더: " + header);
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
        System.out.println("[JwtAuthenticationFilter] 리프레시 토큰: " + refreshToken);
        try {
            if (refreshToken == null && header == null) {
                System.out.println("[JwtAuthenticationFilter] 토큰이 없습니다.");
                throw new Exception("토큰이 없습니다.");
            } else if (header != null && header.startsWith("Bearer ")) {
                System.out.println("[JwtAuthenticationFilter] 헤더가 있습니다.");
                String token = header.substring(7);
                System.out.println("[JwtAuthenticationFilter] 토큰: " + token);
                Long userId = jwtProvider.parseUserIdFromToken(token);
                System.out.println("[JwtAuthenticationFilter] 유저 아이디: " + userId);
                UserDTO user = userService.findById(userId);

                if (user != null) {
                    System.out.println("[JwtAuthenticationFilter] 유저: " + user);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            List.of(new SimpleGrantedAuthority("ROLE_USER")));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }

            }
        } catch (Exception e) {
            System.out.println("[JwtAuthenticationFilter] 인증 실패: " + e.getMessage());
        }

        chain.doFilter(request, response);
    }
}
