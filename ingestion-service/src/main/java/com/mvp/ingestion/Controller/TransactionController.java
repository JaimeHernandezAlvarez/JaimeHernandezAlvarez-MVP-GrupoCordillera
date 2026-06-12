package com.mvp.ingestion.Controller;

import com.mvp.ingestion.Dto.SaleRequest;
import com.mvp.ingestion.Model.Sale;
import com.mvp.ingestion.Service.IngestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions") // Debe coincidir con la ruta del Gateway
@RequiredArgsConstructor
public class TransactionController {

    private final IngestionService ingestionService;

    @PostMapping("/sales")
    public ResponseEntity<?> createSale(@RequestBody SaleRequest request) {
        try {
            Sale savedSale = ingestionService.registerSale(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSale);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}