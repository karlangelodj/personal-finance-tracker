package com.financetracker.backend.dto;

public class GameStatusResponseDTO {

    private double gold;
    private int xp;
    private int level;
    private int xpIntoLevel;
    private int xpForNextLevel;
    private String rank;
    private String nextRank;
    private Double nextRankThreshold;
    private int currentHp;
    private int maxHp;

    public GameStatusResponseDTO(double gold, int xp, int level, int xpIntoLevel, int xpForNextLevel,
                                  String rank, String nextRank, Double nextRankThreshold,
                                  int currentHp, int maxHp) {
        this.gold = gold;
        this.xp = xp;
        this.level = level;
        this.xpIntoLevel = xpIntoLevel;
        this.xpForNextLevel = xpForNextLevel;
        this.rank = rank;
        this.nextRank = nextRank;
        this.nextRankThreshold = nextRankThreshold;
        this.currentHp = currentHp;
        this.maxHp = maxHp;
    }

    public double getGold() { return gold; }
    public int getXp() { return xp; }
    public int getLevel() { return level; }
    public int getXpIntoLevel() { return xpIntoLevel; }
    public int getXpForNextLevel() { return xpForNextLevel; }
    public String getRank() { return rank; }
    public String getNextRank() { return nextRank; }
    public Double getNextRankThreshold() { return nextRankThreshold; }
    public int getCurrentHp() { return currentHp; }
    public int getMaxHp() { return maxHp; }
}