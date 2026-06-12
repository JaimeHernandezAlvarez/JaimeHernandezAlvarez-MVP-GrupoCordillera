package com.mvp.dashboard.Repository;

import com.mvp.dashboard.Model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    // 1. Suma total de dinero
    @Query("SELECT SUM(s.amount) FROM Sale s")
    BigDecimal calculateTotalRevenue();

    // 2. Agrupación de ventas por sucursal (Retorna un arreglo de Objetos: [Nombre Sucursal, Suma Ventas])
    @Query("SELECT s.branch.name, SUM(s.amount) FROM Sale s GROUP BY s.branch.name")
    List<Object[]> getSalesGroupedByBranch();
}