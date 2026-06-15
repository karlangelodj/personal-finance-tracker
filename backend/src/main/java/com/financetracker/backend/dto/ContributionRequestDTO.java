package com.financetracker.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ContributionRequestDTO {

    @NotNull(message = "Amount is required")
    @Positive(message = "Contribution amount must be greater than 0")
    private Double amount;

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
}