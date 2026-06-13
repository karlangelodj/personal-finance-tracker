import { useState } from 'react';
import { useTransactions } from './hooks/useTransactions';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import type { Transaction, TransactionFormData } from './types/Transaction';

function App() {
  const { transactions, loading, error, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleSubmit = async (data: TransactionFormData) => {
    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, data);
      setEditingTransaction(null);
    } else {
      await addTransaction(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Transactions</h1>

        <TransactionForm
          onSubmit={handleSubmit}
          editingTransaction={editingTransaction}
          onCancelEdit={() => setEditingTransaction(null)}
          defaultType="EXPENSE"
        />

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <TransactionList
          transactions={transactions}
          onEdit={setEditingTransaction}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
}

export default App;