package com.financetracker.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ExpenseResponseDTO {

    private Long id;
    private LocalDate date;
    private Double amount;
    private String category;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ExpenseResponseDTO(Long id, LocalDate date, Double amount, String category,
                               String description, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters only (read-only response)
    public Long getId() { return id; }
    public LocalDate getDate() { return date; }
    public Double getAmount() { return amount; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}