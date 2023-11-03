//package com.ecommerceshop.config;
//
//import com.ecommerceshop.component.JwtTokenProvider;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@RequiredArgsConstructor
//@EnableWebSecurity
//public class SecurityConfig {
//
//    private final JwtTokenProvider jwtTokenProvider;
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        System.out.println("SE-FILTER_CHAIN");
//
//        return http.build();
//    }
//
//
//}
