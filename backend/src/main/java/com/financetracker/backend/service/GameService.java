package com.financetracker.backend.service;

import com.financetracker.backend.dto.GameStatusResponseDTO;
import com.financetracker.backend.model.CharacterState;
import com.financetracker.backend.model.Rank;
import com.financetracker.backend.model.TransactionType;
import com.financetracker.backend.model.XpLog;
import com.financetracker.backend.repository.CharacterStateRepository;
import com.financetracker.backend.repository.TransactionRepository;
import com.financetracker.backend.repository.XpLogRepository;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private static final int MAX_HP = 100;

    private final TransactionRepository transactionRepository;
    private final CharacterStateRepository characterStateRepository;
    private final XpLogRepository xpLogRepository;

    public GameService(TransactionRepository transactionRepository,
                       CharacterStateRepository characterStateRepository,
                       XpLogRepository xpLogRepository) {
        this.transactionRepository = transactionRepository;
        this.characterStateRepository = characterStateRepository;
        this.xpLogRepository = xpLogRepository;
    }

    public GameStatusResponseDTO getGameStatus() {
        double gold = calculateGold();
        Rank rank = Rank.fromGold(gold);
        Rank nextRank = rank.next();

        CharacterState character = getOrCreateCharacterState();
        int currentHp = Math.min(character.getCurrentHp(), MAX_HP);

        return new GameStatusResponseDTO(
                gold,
                rank.name(),
                nextRank != null ? nextRank.name() : null,
                nextRank != null ? nextRank.getThreshold() : null,
                currentHp,
                MAX_HP
        );
    }

    /**
     * Kept for potential future use — infrastructure preserved,
     * just not called from any active feature.
     */
    public void awardXp(int amount, String source, Long referenceId) {
        XpLog log = new XpLog();
        log.setAmount(amount);
        log.setSource(source);
        log.setReferenceId(referenceId);
        xpLogRepository.save(log);
    }

    public CharacterState getOrCreateCharacterState() {
        return characterStateRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> {
                    CharacterState newState = new CharacterState();
                    newState.setCurrentHp(MAX_HP);
                    return characterStateRepository.save(newState);
                });
    }

    // --- Helper methods ---

    private double calculateGold() {
        double income = transactionRepository.findAll().stream()
                .filter(t -> t.getType() == TransactionType.INCOME)
                .mapToDouble(t -> t.getAmount())
                .sum();

        double expenses = transactionRepository.findAll().stream()
                .filter(t -> t.getType() == TransactionType.EXPENSE)
                .mapToDouble(t -> t.getAmount())
                .sum();

        return income - expenses;
    }
}