package com.financetracker.backend.service;

import com.financetracker.backend.dto.TransactionRequestDTO;
import com.financetracker.backend.dto.TransactionResponseDTO;
import com.financetracker.backend.exception.ResourceNotFoundException;
import com.financetracker.backend.model.Transaction;
import com.financetracker.backend.model.TransactionType;
import com.financetracker.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<TransactionResponseDTO> getAllTransactions(TransactionType type) {
        List<Transaction> transactions = (type == null)
                ? transactionRepository.findAll()
                : transactionRepository.findAll().stream()
                    .filter(t -> t.getType() == type)
                    .toList();

        return transactions.stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public TransactionResponseDTO getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));
        return toResponseDTO(transaction);
    }

    public TransactionResponseDTO createTransaction(TransactionRequestDTO dto) {
        Transaction transaction = new Transaction();
        applyDtoToEntity(dto, transaction);
        Transaction saved = transactionRepository.save(transaction);
        return toResponseDTO(saved);
    }

    public TransactionResponseDTO updateTransaction(Long id, TransactionRequestDTO dto) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));
        applyDtoToEntity(dto, transaction);
        Transaction updated = transactionRepository.save(transaction);
        return toResponseDTO(updated);
    }

    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transaction not found with id: " + id);
        }
        transactionRepository.deleteById(id);
    }

    // --- Helper methods ---

    private void applyDtoToEntity(TransactionRequestDTO dto, Transaction transaction) {
        transaction.setDate(dto.getDate());
        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setCategory(dto.getCategory());
        transaction.setDescription(dto.getDescription());
    }

    private TransactionResponseDTO toResponseDTO(Transaction transaction) {
        return new TransactionResponseDTO(
                transaction.getId(),
                transaction.getDate(),
                transaction.getAmount(),
                transaction.getType(),
                transaction.getCategory(),
                transaction.getDescription(),
                transaction.getCreatedAt(),
                transaction.getUpdatedAt()
        );
    }
}