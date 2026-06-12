package com.mvp.ingestion.Repository;

import com.mvp.ingestion.Model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}