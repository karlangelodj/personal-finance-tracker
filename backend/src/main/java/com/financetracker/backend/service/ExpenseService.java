package com.financetracker.backend.service;

import com.financetracker.backend.dto.ExpenseRequestDTO;
import com.financetracker.backend.dto.ExpenseResponseDTO;
import com.financetracker.backend.exception.ResourceNotFoundException;
import com.financetracker.backend.model.Expense;
import com.financetracker.backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<ExpenseResponseDTO> getAllExpenses() {
        return expenseRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public ExpenseResponseDTO getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        return toResponseDTO(expense);
    }

    public ExpenseResponseDTO createExpense(ExpenseRequestDTO dto) {
        Expense expense = new Expense();
        applyDtoToEntity(dto, expense);
        Expense saved = expenseRepository.save(expense);
        return toResponseDTO(saved);
    }

    public ExpenseResponseDTO updateExpense(Long id, ExpenseRequestDTO dto) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        applyDtoToEntity(dto, expense);
        Expense updated = expenseRepository.save(expense);
        return toResponseDTO(updated);
    }

    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Expense not found with id: " + id);
        }
        expenseRepository.deleteById(id);
    }

    // --- Helper methods ---

    private void applyDtoToEntity(ExpenseRequestDTO dto, Expense expense) {
        expense.setDate(dto.getDate());
        expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory());
        expense.setDescription(dto.getDescription());
    }

    private ExpenseResponseDTO toResponseDTO(Expense expense) {
        return new ExpenseResponseDTO(
                expense.getId(),
                expense.getDate(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getDescription(),
                expense.getCreatedAt(),
                expense.getUpdatedAt()
        );
    }
}