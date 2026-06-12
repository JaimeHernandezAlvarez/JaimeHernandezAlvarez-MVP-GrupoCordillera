package com.mvp.dashboard.Service;

import com.mvp.dashboard.Dto.DashboardKpiResponse;
import com.mvp.dashboard.Repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final SaleRepository saleRepository;

    public DashboardKpiResponse getGeneralKpis() {
        // 1. Obtenemos totales globales
        BigDecimal totalRevenue = saleRepository.calculateTotalRevenue();
        long totalTransactions = saleRepository.count(); // count() viene por defecto en JpaRepository

        // 2. Procesamos el arreglo de objetos para convertirlo en un Diccionario (Map) fácil de leer para el Frontend
        List<Object[]> branchData = saleRepository.getSalesGroupedByBranch();
        Map<String, BigDecimal> salesByBranch = new HashMap<>();
        
        for (Object[] row : branchData) {
            String branchName = (String) row[0];
            BigDecimal branchTotal = (BigDecimal) row[1];
            salesByBranch.put(branchName, branchTotal);
        }

        // 3. Si no hay ventas, evitamos que retorne 'null' en el dinero
        if (totalRevenue == null) {
            totalRevenue = BigDecimal.ZERO;
        }

        // 4. Armamos y retornamos la respuesta
        return DashboardKpiResponse.builder()
                .totalRevenue(totalRevenue)
                .totalTransactions(totalTransactions)
                .salesByBranch(salesByBranch)
                .build();
    }
}