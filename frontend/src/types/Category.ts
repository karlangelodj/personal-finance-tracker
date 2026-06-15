export type CategoryType = 'INCOME' | 'EXPENSE' | 'BOTH';

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  icon: string;
  isDefault: boolean;
}

export interface CategoryFormData {
  name: string;
  type: CategoryType;
  icon: string;
}