package com.mvp.auth.Service;
import com.mvp.auth.Model.User;
import com.mvp.auth.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 1. CREATE: Crear un nuevo usuario (Registro)
    public User createUser(User user) {
        // ¡Regla de oro! Encriptamos la contraseña antes de guardar
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // 2. READ: Obtener todos los usuarios
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 2. READ: Obtener un usuario por ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    // 3. UPDATE: Actualizar usuario (ej. cambiar nombre de usuario, no la contraseña aquí)
    public User updateUser(Long id, User userDetails) {
        User existingUser = getUserById(id);
        existingUser.setUsername(userDetails.getUsername());
        // Podrías añadir más campos aquí dependiendo de tu modelo (email, etc.)
        return userRepository.save(existingUser);
    }

    // 4. DELETE: Eliminar usuario
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}