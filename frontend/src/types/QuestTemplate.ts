import type { QuestType, QuestPeriod } from './Quest';

export interface QuestTemplate {
  id: number;
  name: string;
  description: string;
  questType: QuestType;
  category: string | null;
  suggestedTarget: number | null;
  suggestedPeriod: QuestPeriod;
  hpReward: number;
  hpPenalty: number;
  isSeasonal: boolean;
  seasonMonth: number | null;
}