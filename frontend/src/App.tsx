import { useState } from 'react';
import { useTransactions } from './hooks/useTransactions';
import { useGameStatus } from './hooks/useGameStatus';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import CharacterPanel from './components/CharacterPanel';
import QuestLog from './components/QuestLog';
import type { Transaction, TransactionFormData } from './types/Transaction';

function App() {
  const { transactions, loading, error, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { status: gameStatus, fetchStatus } = useGameStatus();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [activeTab, setActiveTab] = useState<'transactions' | 'quests'>('transactions');

  const handleSubmit = async (data: TransactionFormData) => {
    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, data);
      setEditingTransaction(null);
    } else {
      await addTransaction(data);
    }
    await fetchStatus();
  };

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
    await fetchStatus();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        {gameStatus && <CharacterPanel status={gameStatus} />}

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded font-medium ${activeTab === 'transactions' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('quests')}
            className={`px-4 py-2 rounded font-medium ${activeTab === 'quests' ? 'bg-purple-600 text-white' : 'bg-white text-slate-600'}`}
          >
            Quest Log
          </button>
        </div>

        {activeTab === 'transactions' && (
          <div className="bg-white rounded-lg shadow p-6">
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
              onDelete={handleDelete}
            />
          </div>
        )}

        {activeTab === 'quests' && <QuestLog onQuestResolved={fetchStatus} />}
      </div>
    </div>
  );
}

export default App;