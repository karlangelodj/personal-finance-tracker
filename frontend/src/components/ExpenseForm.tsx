import { useState, useEffect } from 'react';
import type { Expense, ExpenseFormData } from '../types/Expense';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  editingExpense: Expense | null;
  onCancelEdit: () => void;
}

const emptyForm: ExpenseFormData = {
  date: '',
  amount: 0,
  category: '',
  description: '',
};

function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>(emptyForm);

  // When editingExpense changes, populate the form with its data
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        date: editingExpense.date,
        amount: editingExpense.amount,
        category: editingExpense.category,
        description: editingExpense.description,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingExpense]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      <div>
        <label className="block text-sm text-slate-600 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          required
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div className="sm:col-span-2 flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingExpense ? 'Update Expense' : 'Add Expense'}
        </button>
        {editingExpense && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;