package com.financetracker.backend.dto;

public class GameStatusResponseDTO {

    private double gold;
    private String rank;
    private String nextRank;
    private Double nextRankThreshold;
    private int currentHp;
    private int maxHp;

    public GameStatusResponseDTO(double gold, String rank, String nextRank,
                                  Double nextRankThreshold, int currentHp, int maxHp) {
        this.gold = gold;
        this.rank = rank;
        this.nextRank = nextRank;
        this.nextRankThreshold = nextRankThreshold;
        this.currentHp = currentHp;
        this.maxHp = maxHp;
    }

    public double getGold() { return gold; }
    public String getRank() { return rank; }
    public String getNextRank() { return nextRank; }
    public Double getNextRankThreshold() { return nextRankThreshold; }
    public int getCurrentHp() { return currentHp; }
    public int getMaxHp() { return maxHp; }
}