package com.mvp.dashboard.Controller;

import com.mvp.dashboard.Dto.DashboardKpiResponse;
import com.mvp.dashboard.Service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    // GET: Obtener todas las métricas matemáticas del negocio
    @GetMapping("/metrics")
    public ResponseEntity<DashboardKpiResponse> getMetrics() {
        return ResponseEntity.ok(dashboardService.getDashboardMetrics());
    }
}