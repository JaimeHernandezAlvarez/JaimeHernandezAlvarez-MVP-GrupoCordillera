package com.mvp.dashboard.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkerPerformanceDto {
    private String employeeName;
    private Double totalSales;
    private Integer transactions;
    private Double averageTicket;
}