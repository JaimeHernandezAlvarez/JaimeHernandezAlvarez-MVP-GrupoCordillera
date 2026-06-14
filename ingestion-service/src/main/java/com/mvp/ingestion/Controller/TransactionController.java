package com.mvp.ingestion.Controller;

import com.mvp.ingestion.Dto.SaleRequest;
import com.mvp.ingestion.Model.Sale;
import com.mvp.ingestion.Service.IngestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions") // Mantenemos tu ruta base intacta
@RequiredArgsConstructor
public class TransactionController {

    private final IngestionService ingestionService;

    // POST: Tu método original para crear venta
    @PostMapping("/sales")
    public ResponseEntity<?> createSale(@RequestBody SaleRequest request) {
        try {
            Sale savedSale = ingestionService.registerSale(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSale);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // GET: Listar todas las ventas
    @GetMapping("/sales")
    public ResponseEntity<List<Sale>> getAllSales() {
        return ResponseEntity.ok(ingestionService.getAllSales());
    }

    // GET: Buscar una venta por su ID
    @GetMapping("/sales/{id}")
    public ResponseEntity<Sale> getSaleById(@PathVariable Long id) {
        return ResponseEntity.ok(ingestionService.getSaleById(id));
    }

    // PUT: Actualizar una venta existente
    @PutMapping("/sales/{id}")
    public ResponseEntity<Sale> updateSale(@PathVariable Long id, @RequestBody SaleRequest request) {
        // Podrías ponerle un try-catch aquí también en el futuro si quieres devolver un 400 Bad Request
        return ResponseEntity.ok(ingestionService.updateSale(id, request));
    }

    // DELETE: Eliminar una venta
    @DeleteMapping("/sales/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {
        ingestionService.deleteSale(id);
        return ResponseEntity.noContent().build();
    }
}