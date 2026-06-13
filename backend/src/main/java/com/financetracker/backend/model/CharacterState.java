package com.financetracker.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "character_state")
public class CharacterState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "current_hp", nullable = false)
    private Integer currentHp = 100;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getCurrentHp() { return currentHp; }
    public void setCurrentHp(Integer currentHp) { this.currentHp = currentHp; }
}