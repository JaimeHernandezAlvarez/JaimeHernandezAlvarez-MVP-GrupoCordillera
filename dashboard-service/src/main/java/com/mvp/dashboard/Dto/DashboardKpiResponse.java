package com.mvp.dashboard.Dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
//import java.util.List;
import java.util.Map;

@Data
@Builder
public class DashboardKpiResponse {
    private BigDecimal totalRevenue; // Ingresos totales de la empresa
    private Long totalTransactions;  // Cantidad de ventas realizadas
    private Map<String, BigDecimal> salesByBranch; // Para un gráfico de torta (Ventas por Sucursal)
}