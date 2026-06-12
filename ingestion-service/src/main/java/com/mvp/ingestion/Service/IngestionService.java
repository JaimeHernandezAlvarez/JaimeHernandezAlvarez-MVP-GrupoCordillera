package com.mvp.ingestion.Service;

import com.mvp.ingestion.Dto.SaleRequest;
import com.mvp.ingestion.Model.Branch;
import com.mvp.ingestion.Model.Sale;
import com.mvp.ingestion.Repository.BranchRepository;
import com.mvp.ingestion.Repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class IngestionService {

    private final SaleRepository saleRepository;
    private final BranchRepository branchRepository;

    public Sale registerSale(SaleRequest request) {
        // 1. Verificamos que la sucursal exista
        Branch branch = branchRepository.findById(request.getBranchId())
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada con ID: " + request.getBranchId()));

        // 2. Creamos la transacción
        Sale newSale = new Sale();
        newSale.setBranch(branch);
        newSale.setAmount(request.getAmount());
        newSale.setProductCategory(request.getProductCategory());
        
        // 3. Estampamos la hora exacta en la que se registra la venta (Para el dashboard en tiempo real)
        newSale.setTimestamp(LocalDateTime.now());

        // 4. Guardamos en MySQL
        return saleRepository.save(newSale);
    }
}