package com.mvp.auth.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Este Bean es el que inyectamos en nuestro AuthService.
     * BCrypt es el estándar de la industria para encriptar contraseñas de forma unidireccional.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Aquí definimos las reglas de tráfico de nuestro microservicio.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Desactivamos CSRF porque no usamos formularios web tradicionales ni cookies de sesión
            .csrf(AbstractHttpConfigurer::disable)
            
            // 2. Desactivamos CORS a nivel de microservicio (ya lo gestiona nuestro API Gateway)
            .cors(AbstractHttpConfigurer::disable)
            
            // 3. Indicamos que nuestra API es Stateless (sin estado)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 4. Configuramos qué endpoints son públicos y cuáles privados
            .authorizeHttpRequests(auth -> auth
                // AÑADIDO: Rutas de Swagger y documentación OpenAPI liberadas
                .requestMatchers(
                    "/auth/login", 
                    "/auth/health",
                    "/auth/users",           // <--- AÑADE ESTO para permitir el registro/listar
                    "/auth/users/**",        // <--- AÑADE ESTO para permitir buscar/editar/eliminar por ID
                    "/auth/v3/api-docs/**",  
                    "/v3/api-docs/**",       
                    "/swagger-ui/**",   
                    "/swagger-ui.html"
                ).permitAll() // Públicos
                
                .anyRequest().authenticated() // Cualquier otro endpoint requiere autenticación
            );

        return http.build();
    }
}