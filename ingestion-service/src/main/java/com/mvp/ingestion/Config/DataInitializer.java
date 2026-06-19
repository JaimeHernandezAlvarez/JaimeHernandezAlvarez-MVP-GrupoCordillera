package com.mvp.ingestion.Config; // Ajusta el paquete según tu estructura

import com.mvp.ingestion.Model.Branch;
import com.mvp.ingestion.Model.Sale;
import com.mvp.ingestion.Repository.BranchRepository;
import com.mvp.ingestion.Repository.SaleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataInitializer {

    @SuppressWarnings("null")
    @Bean
    CommandLineRunner initIngestionDatabase(BranchRepository branchRepository, SaleRepository saleRepository) {
        return args -> {
            // Verificamos si la tabla de sucursales está vacía
            if (branchRepository.count() == 0) {
                
                System.out.println("⏳ MVP: Iniciando carga de datos de prueba en Ingestión...");

                // 1. CREAR SUCURSALES (Usamos el constructor que tienes con @AllArgsConstructor)
                Branch branchNorte = new Branch(null, "Sucursal Norte", "Av. Principal 123");
                Branch branchSur = new Branch(null, "Sucursal Sur", "Plaza Central 45");
                
                // Guardamos las sucursales en la base de datos
                branchRepository.saveAll(List.of(branchNorte, branchSur));

                // 2. CREAR VENTAS DE PRUEBA CON EMPLEADOS
                
                // --- Ventas de Carlos Mendoza (El empleado estrella) ---
                Sale s1 = new Sale();
                s1.setBranch(branchNorte);
                s1.setAmount(new BigDecimal("1500.50"));
                s1.setProductCategory("Electrónica");
                s1.setEmployeeName("Carlos Mendoza");
                s1.setTimestamp(LocalDateTime.now().minusDays(2));

                Sale s2 = new Sale();
                s2.setBranch(branchSur);
                s2.setAmount(new BigDecimal("2800.00"));
                s2.setProductCategory("Electrónica");
                s2.setEmployeeName("Carlos Mendoza");
                s2.setTimestamp(LocalDateTime.now().minusDays(1));

                // --- Ventas de Ana Silva (Ticket promedio bajo, pero más volumen) ---
                Sale s3 = new Sale();
                s3.setBranch(branchNorte);
                s3.setAmount(new BigDecimal("450.00"));
                s3.setProductCategory("Ropa");
                s3.setEmployeeName("Ana Silva");
                s3.setTimestamp(LocalDateTime.now().minusHours(5));

                Sale s4 = new Sale();
                s4.setBranch(branchNorte);
                s4.setAmount(new BigDecimal("320.00"));
                s4.setProductCategory("Hogar");
                s4.setEmployeeName("Ana Silva");
                s4.setTimestamp(LocalDateTime.now().minusHours(2));

                // --- Venta de Juan Pérez ---
                Sale s5 = new Sale();
                s5.setBranch(branchSur);
                s5.setAmount(new BigDecimal("890.99"));
                s5.setProductCategory("Hogar");
                s5.setEmployeeName("Juan Pérez");
                s5.setTimestamp(LocalDateTime.now().minusMinutes(30));

                // Guardamos todas las ventas en la base de datos
                saleRepository.saveAll(List.of(s1, s2, s3, s4, s5));

                System.out.println("✅ MVP: ¡Datos de prueba (Sucursales y Ventas) cargados exitosamente!");

            } else {
                System.out.println("ℹ️ MVP: La base de datos de ingestión ya contiene datos. Se omite la carga.");
            }
        };
    }
}