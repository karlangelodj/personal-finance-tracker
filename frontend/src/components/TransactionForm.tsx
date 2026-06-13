import { useState, useEffect } from 'react';
import type { Transaction, TransactionFormData, TransactionType } from '../types/Transaction';

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => Promise<void>;
  editingTransaction: Transaction | null;
  onCancelEdit: () => void;
  defaultType: TransactionType;
}

function getEmptyForm(defaultType: TransactionType): TransactionFormData {
  return {
    date: '',
    amount: 0,
    type: defaultType,
    category: '',
    description: '',
  };
}

function TransactionForm({ onSubmit, editingTransaction, onCancelEdit, defaultType }: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormData>(getEmptyForm(defaultType));

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        date: editingTransaction.date,
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        category: editingTransaction.category,
        description: editingTransaction.description,
      });
    } else {
      setFormData(getEmptyForm(defaultType));
    }
  }, [editingTransaction, defaultType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData(getEmptyForm(defaultType));
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
        <label className="block text-sm text-slate-600 mb-1">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded px-3 py-2"
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
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

      <div className="sm:col-span-2">
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
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
        {editingTransaction && (
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

export default TransactionForm;