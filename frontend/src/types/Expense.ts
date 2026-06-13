export interface Expense {
  id: number;
  date: string;
  amount: number;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  date: string;
  amount: number;
  category: string;
  description: string;
}