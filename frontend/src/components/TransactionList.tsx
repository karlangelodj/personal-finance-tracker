import type { Transaction } from '../types/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return <p className="text-slate-500 text-center py-4">No transactions yet.</p>;
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
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50">
            <td className="py-2 px-3">{transaction.date}</td>
            <td className="py-2 px-3">{transaction.category}</td>
            <td className="py-2 px-3 text-slate-600">{transaction.description}</td>
            <td className={`py-2 px-3 text-right font-medium ${
              transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </td>
            <td className="py-2 px-3 text-center space-x-2">
              <button
                onClick={() => onEdit(transaction)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(transaction.id)}
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

export default TransactionList;