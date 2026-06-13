import { useState } from 'react';
import { useExpenses } from './hooks/useExpenses';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import type { Expense, ExpenseFormData } from './types/Expense';

function App() {
  const { expenses, loading, error, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleSubmit = async (data: ExpenseFormData) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, data);
      setEditingExpense(null);
    } else {
      await addExpense(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Expenses</h1>

        <ExpenseForm
          onSubmit={handleSubmit}
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
        />

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <ExpenseList
          expenses={expenses}
          onEdit={setEditingExpense}
          onDelete={deleteExpense}
        />
      </div>
    </div>
  );
}

export default App;