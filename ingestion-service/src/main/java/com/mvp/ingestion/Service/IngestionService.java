package com.mvp.ingestion.Service;

import com.mvp.ingestion.Dto.SaleRequest;
import com.mvp.ingestion.Model.Branch;
import com.mvp.ingestion.Model.Sale;
import com.mvp.ingestion.Repository.BranchRepository;
import com.mvp.ingestion.Repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IngestionService {

    private final SaleRepository saleRepository;
    private final BranchRepository branchRepository;

    // 1. CREATE: Registrar una nueva venta (El que ya tenías)
    public Sale registerSale(SaleRequest request) {
        @SuppressWarnings("null")
        Branch branch = branchRepository.findById(request.getBranchId())
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada con ID: " + request.getBranchId()));

        // Dentro de registerSale():
        Sale newSale = new Sale();
        newSale.setBranch(branch);
        newSale.setAmount(request.getAmount());
        newSale.setProductCategory(request.getProductCategory());
        newSale.setEmployeeName(request.getEmployeeName()); // 🔥 LÍNEA NUEVA
        newSale.setTimestamp(LocalDateTime.now());
        
        return saleRepository.save(newSale);
    }

    // 2. READ: Obtener TODAS las ventas
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    // 3. READ: Obtener una venta específica por su ID
    @SuppressWarnings("null")
    public Sale getSaleById(Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada con el ID: " + id));
    }

    // 4. UPDATE: Actualizar una venta (Ej: corrección de monto o sucursal)
    public Sale updateSale(Long id, SaleRequest request) {
        Sale existingSale = getSaleById(id);
        
        @SuppressWarnings("null")
        Branch branch = branchRepository.findById(request.getBranchId())
                .orElseThrow(() -> new RuntimeException("Sucursal no encontrada con ID: " + request.getBranchId()));

        existingSale.setBranch(branch);
        existingSale.setAmount(request.getAmount());
        existingSale.setProductCategory(request.getProductCategory());
        // Nota: NO actualizamos el timestamp para mantener la fecha original de la venta
        
        return saleRepository.save(existingSale);
    }

    // 5. DELETE: Eliminar (anular) una venta
    @SuppressWarnings("null")
    public void deleteSale(Long id) {
        Sale existingSale = getSaleById(id);
        saleRepository.delete(existingSale);
    }

    
}