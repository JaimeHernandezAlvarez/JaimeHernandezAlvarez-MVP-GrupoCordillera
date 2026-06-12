package com.mvp.ingestion.Config;

import com.mvp.ingestion.Model.Branch;
import com.mvp.ingestion.Repository.BranchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final BranchRepository branchRepository;

    @Override
    public void run(String... args) throws Exception {
        if (branchRepository.count() == 0) {
            branchRepository.save(new Branch(null, "Sucursal Norte", "Santiago Centro"));
            branchRepository.save(new Branch(null, "Sucursal Sur", "Providencia"));
            System.out.println("Sucursales de prueba inicializadas.");
        }
    }
}