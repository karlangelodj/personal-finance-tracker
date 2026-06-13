package com.financetracker.backend.model;

public enum Rank {
    IRON(0),
    BRONZE(5_000),
    SILVER(25_000),
    GOLD(100_000),
    PLATINUM(500_000),
    DIAMOND(1_000_000),
    MASTER(5_000_000),
    GRANDMASTER(10_000_000);

    private final double threshold;

    Rank(double threshold) {
        this.threshold = threshold;
    }

    public double getThreshold() {
        return threshold;
    }

    /**
     * Returns the rank corresponding to the given gold amount.
     */
    public static Rank fromGold(double gold) {
        Rank current = IRON;
        for (Rank rank : values()) {
            if (gold >= rank.threshold) {
                current = rank;
            } else {
                break;
            }
        }
        return current;
    }

    /**
     * Returns the next rank above the current one, or null if already at max rank.
     */
    public Rank next() {
        Rank[] all = values();
        int currentIndex = this.ordinal();
        if (currentIndex + 1 < all.length) {
            return all[currentIndex + 1];
        }
        return null; // already Grandmaster
    }
}