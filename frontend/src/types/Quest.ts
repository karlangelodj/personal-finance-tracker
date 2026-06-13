export type QuestType = 'SPENDING_LIMIT' | 'SAVINGS_TARGET' | 'NO_SPEND' | 'STREAK';
export type QuestPeriod = 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type QuestStatus = 'ACTIVE' | 'COMPLETED' | 'FAILED';

export interface Quest {
  id: number;
  name: string;
  description: string;
  questType: QuestType;
  category: string | null;
  targetAmount: number | null;
  progress: number;
  period: QuestPeriod;
  periodStart: string;
  periodEnd: string;
  xpReward: number;
  hpReward: number;
  hpPenalty: number;
  status: QuestStatus;
  isSeasonal: boolean;
}

export interface QuestFormData {
  name: string;
  description: string;
  questType: QuestType;
  category: string;
  targetAmount: number;
  period: QuestPeriod;
  periodStart: string;
  periodEnd: string;
  xpReward: number;
  hpReward: number;
  hpPenalty: number;
}