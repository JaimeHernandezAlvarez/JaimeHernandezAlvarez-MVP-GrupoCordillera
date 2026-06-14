package com.mvp.dashboard.Model;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class Sale {
    private Long id;
    private Branch branch;
    private BigDecimal amount;
    private String productCategory;
    private LocalDateTime timestamp;
}