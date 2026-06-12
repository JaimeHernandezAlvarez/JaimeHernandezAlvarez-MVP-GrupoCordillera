package com.mvp.dashboard.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "sales")
@Data
public class Sale {
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private Branch branch;

    private BigDecimal amount;
    private String productCategory;
    private LocalDateTime timestamp;
}