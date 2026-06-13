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

    private static final int XP_PER_LEVEL = 1000;
    private static final int BASE_MAX_HP = 100;
    private static final int HP_PER_LEVEL = 10;

    private final TransactionRepository transactionRepository;
    private final XpLogRepository xpLogRepository;
    private final CharacterStateRepository characterStateRepository;

    public GameService(TransactionRepository transactionRepository,
                        XpLogRepository xpLogRepository,
                        CharacterStateRepository characterStateRepository) {
        this.transactionRepository = transactionRepository;
        this.xpLogRepository = xpLogRepository;
        this.characterStateRepository = characterStateRepository;
    }

    public GameStatusResponseDTO getGameStatus() {
        double gold = calculateGold();
        int xp = calculateXp();
        int level = (xp / XP_PER_LEVEL) + 1;
        int xpIntoLevel = xp % XP_PER_LEVEL;
        int maxHp = BASE_MAX_HP + (level - 1) * HP_PER_LEVEL;

        Rank rank = Rank.fromGold(gold);
        Rank nextRank = rank.next();

        CharacterState character = getOrCreateCharacterState();
        int currentHp = Math.min(character.getCurrentHp(), maxHp);

        return new GameStatusResponseDTO(
                gold,
                xp,
                level,
                xpIntoLevel,
                XP_PER_LEVEL,
                rank.name(),
                nextRank != null ? nextRank.name() : null,
                nextRank != null ? nextRank.getThreshold() : null,
                currentHp,
                maxHp
        );
    }

    /**
     * Awards XP by inserting a new xp_log entry.
     * Any future module (quests, bosses, achievements) calls this
     * to grant XP without GameService needing to know the source's details.
     */
    public void awardXp(int amount, String source, Long referenceId) {
        XpLog log = new XpLog();
        log.setAmount(amount);
        log.setSource(source);
        log.setReferenceId(referenceId);
        xpLogRepository.save(log);
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

    private int calculateXp() {
        return xpLogRepository.findAll().stream()
                .mapToInt(XpLog::getAmount)
                .sum();
    }

    private CharacterState getOrCreateCharacterState() {
        return characterStateRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> {
                    CharacterState newState = new CharacterState();
                    newState.setCurrentHp(100);
                    return characterStateRepository.save(newState);
                });
    }
}