package com.mvp.auth.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.mvp.auth.Model.Role;
import com.mvp.auth.Model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    // Traemos las variables que configuraste en el application.yml
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    public String generateToken(User user) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        
        // Extraemos los nombres de los roles (ej. "ROLE_ADMIN")
        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return JWT.create()
                .withSubject(user.getUsername())
                .withClaim("roles", roles) // Metemos los roles dentro del token
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(algorithm);
    }
}