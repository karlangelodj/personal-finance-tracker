export interface GameStatus {
  gold: number;
  rank: string;
  nextRank: string | null;
  nextRankThreshold: number | null;
  currentHp: number;
  maxHp: number;
}