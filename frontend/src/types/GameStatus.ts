export interface GameStatus {
  gold: number;
  xp: number;
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  rank: string;
  nextRank: string | null;
  nextRankThreshold: number | null;
  currentHp: number;
  maxHp: number;
}