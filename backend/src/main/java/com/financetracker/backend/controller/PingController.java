package com.financetracker.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PingController {

    @GetMapping("/api/ping")
    public String ping() {
        return "Backend is connected to SQLite!";
    }
}