export type GoalType = 'EMERGENCY_FUND' | 'PURCHASE' | 'TRAVEL' | 'INVESTMENT' | 'CUSTOM';
export type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED';

export interface Goal {
  id: number;
  name: string;
  description: string;
  goalType: GoalType;
  targetAmount: number;
  currentAmount: number;
  progressPercent: number;
  remaining: number;
  deadline: string | null;
  isOverdue: boolean;
  hpReward: number;
  status: GoalStatus;
  createdAt: string;
  completedAt: string | null;
}

export interface GoalFormData {
  name: string;
  description: string;
  goalType: GoalType;
  targetAmount: number;
  deadline: string;
  hpReward: number;
}

export interface ContributionFormData {
  amount: number;
}