package com.mvp.dashboard.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "branches")
@Data
public class Branch {
    @Id
    private Long id;
    private String name;
    private String location;
}