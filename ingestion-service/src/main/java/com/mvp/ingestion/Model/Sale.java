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

    // Relación con la tabla de sucursales
    @ManyToOne(optional = false)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false)
    private BigDecimal amount; // Monto de la venta

    @Column(length = 50)
    private String productCategory; // Ej: "Electrónica", "Hogar"

    @Column(nullable = false)
    private LocalDateTime timestamp; // Fecha y hora exacta de la transacción
}