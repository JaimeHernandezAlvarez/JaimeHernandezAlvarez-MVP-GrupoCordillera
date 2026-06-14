package com.mvp.dashboard.Service;

import com.mvp.dashboard.Dto.DashboardKpiResponse;
import com.mvp.dashboard.Model.Sale;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final RestTemplate restTemplate;
    private final String INGESTION_SERVICE_URL = "http://localhost:8082/api/transactions/sales";

    public DashboardKpiResponse getDashboardMetrics() {
        ResponseEntity<List<Sale>> response = restTemplate.exchange(
                INGESTION_SERVICE_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Sale>>() {}
        );

        List<Sale> sales = response.getBody();

        if (sales == null || sales.isEmpty()) {
            return new DashboardKpiResponse(0.0, 0, Map.of(), Map.of());
        }

        int totalSalesCount = sales.size();

        // AQUÍ ESTÁ LA SOLUCIÓN: Usamos .doubleValue() para extraer el número del BigDecimal
        double totalRevenue = sales.stream()
                .mapToDouble(sale -> sale.getAmount().doubleValue())
                .sum();

        // AQUÍ TAMBIÉN: Convertimos el BigDecimal a double para agrupar
        Map<String, Double> salesByCategory = sales.stream()
                .collect(Collectors.groupingBy(
                        Sale::getProductCategory,
                        Collectors.summingDouble(sale -> sale.getAmount().doubleValue())
                ));

        Map<String, Double> salesByBranch = sales.stream()
                .collect(Collectors.groupingBy(
                        sale -> sale.getBranch().getName(),
                        Collectors.summingDouble(sale -> sale.getAmount().doubleValue())
                ));

        return new DashboardKpiResponse(totalRevenue, totalSalesCount, salesByCategory, salesByBranch);
    }
}