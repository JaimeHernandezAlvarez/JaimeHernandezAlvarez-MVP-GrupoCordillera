package com.mvp.ingestion.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "sales")
@Data
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false)
    private BigDecimal amount; 

    @Column(length = 50)
    private String productCategory; 

    // 🔥 NUEVO CAMPO: Guardamos el nombre o ID del trabajador que hizo la venta
    @Column(name = "employee_name", nullable = false, length = 100)
    private String employeeName;

    @Column(nullable = false)
    private LocalDateTime timestamp; 
}