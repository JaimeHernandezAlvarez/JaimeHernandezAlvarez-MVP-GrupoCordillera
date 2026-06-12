package com.mvp.auth.Service;

import com.mvp.auth.Dto.AuthResponse;
import com.mvp.auth.Dto.LoginRequest;
import com.mvp.auth.Model.Role;
import com.mvp.auth.Model.User;
import com.mvp.auth.Repository.UserRepository;
import com.mvp.auth.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse login(LoginRequest request) {
        // 1. Buscamos al usuario en la base de datos
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Validamos si está activo (Requisito de negocio)
        if (!user.isActive()) {
            throw new RuntimeException("El usuario está inactivo");
        }

        // 3. Comparamos la contraseña encriptada
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // 4. Si todo es correcto, generamos el Token JWT
        String token = jwtUtil.generateToken(user);
        
        // 5. Preparamos los roles para la respuesta
        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return new AuthResponse(token, user.getUsername(), roles);
    }
}