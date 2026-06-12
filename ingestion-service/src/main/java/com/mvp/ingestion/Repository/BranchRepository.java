package com.mvp.ingestion.Repository;

import com.mvp.ingestion.Model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BranchRepository extends JpaRepository<Branch, Long> {
}