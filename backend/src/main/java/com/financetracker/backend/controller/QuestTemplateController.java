package com.financetracker.backend.controller;

import com.financetracker.backend.dto.QuestRequestDTO;
import com.financetracker.backend.dto.QuestResponseDTO;
import com.financetracker.backend.dto.QuestTemplateResponseDTO;
import com.financetracker.backend.service.QuestTemplateService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quest-templates")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestTemplateController {

    private final QuestTemplateService questTemplateService;

    public QuestTemplateController(QuestTemplateService questTemplateService) {
        this.questTemplateService = questTemplateService;
    }

    @GetMapping
    public ResponseEntity<List<QuestTemplateResponseDTO>> getAllTemplates() {
        return ResponseEntity.ok(questTemplateService.getAllTemplates());
    }

    @PostMapping("/{templateId}/activate")
    public ResponseEntity<QuestResponseDTO> activateTemplate(
            @PathVariable Long templateId,
            @Valid @RequestBody QuestRequestDTO dto) {
        QuestResponseDTO created = questTemplateService.activateTemplate(templateId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}