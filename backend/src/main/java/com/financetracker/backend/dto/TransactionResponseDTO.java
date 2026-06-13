package com.financetracker.backend.dto;

import com.financetracker.backend.model.TransactionType;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TransactionResponseDTO {

    private Long id;
    private LocalDate date;
    private Double amount;
    private TransactionType type;
    private String category;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public TransactionResponseDTO(Long id, LocalDate date, Double amount, TransactionType type,
                                   String category, String description,
                                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public LocalDate getDate() { return date; }
    public Double getAmount() { return amount; }
    public TransactionType getType() { return type; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}