package store.oneul.mvc.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import store.oneul.mvc.security.jwt.JwtAuthenticationFilter;
import store.oneul.mvc.security.jwt.JwtReissueFilter;
import store.oneul.mvc.security.oauth.CustomOAuth2UserService;
import store.oneul.mvc.security.oauth.OAuth2SuccessHandler;

@Configuration
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "frontend")
public class SecurityConfig {

    private final OAuth2SuccessHandler successHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtReissueFilter jwtReissueFilter;

    private String url;
    private String redirectPath;
    private String accessTokenCookieName;
    private String refreshTokenCookieName;
    private int accessTokenExpirationTime;
    private int refreshTokenExpirationTime;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors() // 🔹 CORS 설정 추가
                .and()
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/guest-login/**").permitAll()
                        .requestMatchers("/api/feeds/community").permitAll()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll())

                .oauth2Login(oauth -> oauth
                        .userInfoEndpoint().userService(customOAuth2UserService)
                        .and()
                        .successHandler(successHandler))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtReissueFilter, JwtAuthenticationFilter.class)
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> response
                                .sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized")));

        return http.build();
    }

    // 🔹 CORS 설정 Bean 등록
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(url)); // 프론트엔드 주소
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true); // 쿠키 포함 여부

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
