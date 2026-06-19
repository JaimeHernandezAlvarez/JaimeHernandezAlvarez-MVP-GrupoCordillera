package com.mvp.auth.Security; // Ajusta a tu paquete real

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.mvp.auth.Model.User;
import com.mvp.auth.Repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Si la base de datos de usuarios está vacía, creamos el usuario por defecto
            if (userRepository.count() == 0) {
                User defaultUser = new User();
                defaultUser.setUsername("admin");
                // Guardamos la contraseña encriptada de forma fija y conocida: "admin123"
                defaultUser.setPassword(passwordEncoder.encode("admin123")); 
                
                userRepository.save(defaultUser);
                System.out.println("🔥 Base de datos inicializada: Usuario 'admin' creado con contraseña 'admin123'");
            }
        };
    }
}