package com.financetracker.backend.controller;

import com.financetracker.backend.dto.GameStatusResponseDTO;
import com.financetracker.backend.service.GameService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/status")
    public GameStatusResponseDTO getStatus() {
        return gameService.getGameStatus();
    }
}