package com.mvp.auth.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    private String username;

    // Largo 255 es obligatorio porque BCrypt guardará la contraseña encriptada (un hash largo)
    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false)
    private boolean active = true;

    // Relación muchos a muchos para cumplir con el requerimiento de múltiples roles
    // Usamos FetchType.EAGER para que cargue los roles inmediatamente junto al usuario
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles", // Nombre de la tabla intermedia que se creará sola
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}