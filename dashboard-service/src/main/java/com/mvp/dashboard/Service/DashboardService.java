package com.mvp.dashboard.Service;

import com.mvp.dashboard.Dto.DashboardKpiResponse;
import com.mvp.dashboard.Dto.WorkerPerformanceDto; // 🔥 NUEVO IMPORT
import com.mvp.dashboard.Model.Sale;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
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
            // Actualizamos el return vacío para incluir también la lista de empleados vacía
            return new DashboardKpiResponse(0.0, 0, Map.of(), Map.of(), Collections.emptyList());
        }

        int totalSalesCount = sales.size();

        double totalRevenue = sales.stream()
                .mapToDouble(sale -> sale.getAmount().doubleValue())
                .sum();

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

        // 🔥 NUEVA SECCIÓN: Cálculo de KPIs por trabajador
        List<WorkerPerformanceDto> workerPerformance = sales.stream()
                // 1. Agrupamos todas las ventas por el nombre del empleado
                .collect(Collectors.groupingBy(Sale::getEmployeeName)) 
                .entrySet().stream()
                // 2. Por cada empleado, calculamos sus totales
                .map(entry -> {
                    String employee = entry.getKey();
                    List<Sale> employeeSales = entry.getValue();
                    
                    double totalSales = employeeSales.stream().mapToDouble(s -> s.getAmount().doubleValue()).sum();
                    int transactions = employeeSales.size();
                    // Evitamos dividir por cero por seguridad
                    double averageTicket = transactions > 0 ? totalSales / transactions : 0.0;
                    
                    return new WorkerPerformanceDto(employee, totalSales, transactions, averageTicket);
                })
                // 3. Ordenamos la lista de mayor a menor según quién vendió más dinero
                .sorted((w1, w2) -> Double.compare(w2.getTotalSales(), w1.getTotalSales())) 
                .collect(Collectors.toList());

        // Devolvemos el objeto completo con la nueva métrica incluida
        return new DashboardKpiResponse(totalRevenue, totalSalesCount, salesByCategory, salesByBranch, workerPerformance);
    }
}