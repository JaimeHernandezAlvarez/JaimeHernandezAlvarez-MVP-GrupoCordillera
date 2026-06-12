package com.mvp.ingestion.Dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SaleRequest {
    private Long branchId;
    private BigDecimal amount;
    private String productCategory;
}