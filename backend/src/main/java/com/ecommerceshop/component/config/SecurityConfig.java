package com.ecommerceshop.component.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig  {

    private final JwtTokenProvider jwtTokenProvider;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf((AbstractHttpConfigurer::disable))
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests((authorizeRequests) ->
                        authorizeRequests.anyRequest().permitAll()
                );
//                .authorizeRequests((requests) -> requests
//                        .anyRequest().authenticated()
//                        .dispatcherTypeMatchers(HttpMethod.valueOf("/login/**")).authenticated()
//                        .dispatcherTypeMatchers(HttpMethod.valueOf("/manager/**")).access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
//                        .dispatcherTypeMatchers(HttpMethod.valueOf("/admin/**")).access("hasRole('ROLE_ADMIN')")
//                        .anyRequest().permitAll())

//                )
//                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}