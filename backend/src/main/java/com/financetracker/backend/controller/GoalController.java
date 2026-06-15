package com.financetracker.backend.controller;

import com.financetracker.backend.dto.ContributionRequestDTO;
import com.financetracker.backend.dto.GoalRequestDTO;
import com.financetracker.backend.dto.GoalResponseDTO;
import com.financetracker.backend.service.GoalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:5173")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public ResponseEntity<List<GoalResponseDTO>> getAllGoals() {
        return ResponseEntity.ok(goalService.getAllGoals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoalResponseDTO> getGoalById(@PathVariable Long id) {
        return ResponseEntity.ok(goalService.getGoalById(id));
    }

    @PostMapping
    public ResponseEntity<GoalResponseDTO> createGoal(@Valid @RequestBody GoalRequestDTO dto) {
        GoalResponseDTO created = goalService.createGoal(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/{id}/contribute")
    public ResponseEntity<GoalResponseDTO> contribute(@PathVariable Long id,
                                                       @Valid @RequestBody ContributionRequestDTO dto) {
        return ResponseEntity.ok(goalService.contribute(id, dto));
    }

    @PatchMapping("/{id}/abandon")
    public ResponseEntity<GoalResponseDTO> abandonGoal(@PathVariable Long id) {
        return ResponseEntity.ok(goalService.abandonGoal(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        goalService.deleteGoal(id);
        return ResponseEntity.noContent().build();
    }
}