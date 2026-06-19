package com.mvp.dashboard.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardKpiResponse {
    private Double totalRevenue;               // Ingresos totales
    private Integer totalSalesCount;           // Cantidad total de transacciones
    private Map<String, Double> salesByCategory; // Ventas agrupadas por categoría
    private Map<String, Double> salesByBranch;   // Ventas agrupadas por sucursal
    private List<WorkerPerformanceDto> workerPerformance;
}