package com.mvp.auth.Controller;

import com.mvp.auth.Dto.AuthResponse;
import com.mvp.auth.Dto.LoginRequest;
import com.mvp.auth.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Llamamos a nuestro servicio que tiene toda la lógica de negocio
            AuthResponse response = authService.login(request);
            
            // Si todo sale bien, devolvemos un HTTP 200 OK con el Token y los roles
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            // Si el servicio lanza una excepción (ej. "Contraseña incorrecta"),
            // atrapamos el error y devolvemos un HTTP 401 Unauthorized.
            // Nota: En un proyecto gigante esto se hace con un @ControllerAdvice, 
            // pero para un MVP esta captura es perfecta y directa.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // Endpoint adicional súper útil para comprobar que el microservicio está vivo
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Auth Service de Grupo Cordillera funcionando correctamente.");
    }
}