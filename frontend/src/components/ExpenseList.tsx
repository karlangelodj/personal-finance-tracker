import type { Expense } from '../types/Expense';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="text-slate-500 text-center py-4">No expenses yet.</p>;
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-slate-300 text-left text-sm text-slate-600">
          <th className="py-2 px-3">Date</th>
          <th className="py-2 px-3">Category</th>
          <th className="py-2 px-3">Description</th>
          <th className="py-2 px-3 text-right">Amount</th>
          <th className="py-2 px-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id} className="border-b border-slate-100 hover:bg-slate-50">
            <td className="py-2 px-3">{expense.date}</td>
            <td className="py-2 px-3">{expense.category}</td>
            <td className="py-2 px-3 text-slate-600">{expense.description}</td>
            <td className="py-2 px-3 text-right font-medium">
              ${expense.amount.toFixed(2)}
            </td>
            <td className="py-2 px-3 text-center space-x-2">
              <button
                onClick={() => onEdit(expense)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(expense.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;