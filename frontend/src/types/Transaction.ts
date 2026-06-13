export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFormData {
  date: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
}