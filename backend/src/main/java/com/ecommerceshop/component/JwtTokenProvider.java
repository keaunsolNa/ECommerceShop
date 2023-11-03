//package com.ecommerceshop.component;
//
//import com.ecommerceshop.dto.document.aut.Authority;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import jakarta.annotation.PostConstruct;
////import jakarta.servlet.http.HttpServletRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Component;
//
//import java.util.Base64;
//import java.util.Date;
//import java.util.List;
//
//@RequiredArgsConstructor
//@Component
//public class JwtTokenProvider {
//
//    @Value("${elasticsearch.id}")
//    private String secretKey;
//
//    private final long tokenValidTime = 300 * 60 * 1000L;
//
//    @PostConstruct
//    protected void init() {
//        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
//    }
//
//    public String createToken(String userUUID, List<Authority> roles) {
//
//        Claims claims = Jwts.claims().setSubject(userUUID);
//        claims.put("roles", roles);
//        Date now = new Date();
//        return Jwts.builder()
//                .setClaims(claims)
//                .setIssuedAt(now)
//                .setExpiration(new Date(now.getTime() + tokenValidTime))
//                .signWith(SignatureAlgorithm.HS512, secretKey)
//                .compact();
//
//    }
//
//    public Authentication getAuthentication(String token) {
//
////        UserDetails userDetails =
//        return null;
//    }
//
//    public String getUserPk(String token) {
//
//        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
//    }
////
////    public String resolveToken(HttpServletRequest request) {
////
////        return request.getHeader("X-AUTH-TOKEN");
////    }
//
//    public boolean validateToken(String jwtToken) {
//
//        try {
//            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
//            return !claims.getBody().getExpiration().before(new Date());
//        } catch (Exception e) {
//            return false;
//        }
//    }
//}
