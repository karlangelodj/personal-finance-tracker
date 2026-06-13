package com.financetracker.backend.controller;

import com.financetracker.backend.dto.QuestRequestDTO;
import com.financetracker.backend.dto.QuestResponseDTO;
import com.financetracker.backend.service.QuestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quests")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestController {

    private final QuestService questService;

    public QuestController(QuestService questService) {
        this.questService = questService;
    }

    @GetMapping
    public ResponseEntity<List<QuestResponseDTO>> getAllQuests() {
        return ResponseEntity.ok(questService.getAllQuests());
    }

    @PostMapping
    public ResponseEntity<QuestResponseDTO> createQuest(@Valid @RequestBody QuestRequestDTO dto) {
        QuestResponseDTO created = questService.createQuest(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuest(@PathVariable Long id) {
        questService.deleteQuest(id);
        return ResponseEntity.noContent().build();
    }
}