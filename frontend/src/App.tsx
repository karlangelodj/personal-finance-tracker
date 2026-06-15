import { useState } from 'react';
import { useTransactions } from './hooks/useTransactions';
import { useGameStatus } from './hooks/useGameStatus';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import CharacterPanel from './components/CharacterPanel';
import QuestLog from './components/QuestLog';
import QuestBoard from './components/QuestBoard';
import GoalsPage from './components/GoalsPage';
import type { Transaction, TransactionFormData } from './types/Transaction';
import CategoryManager from './components/CategoryManager';

type Tab = 'transactions' | 'quests' | 'questboard' | 'goals' | 'categories';

function App() {
  const { transactions, loading, error, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { status: gameStatus, fetchStatus } = useGameStatus();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('transactions');

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

  const tabs: { key: Tab; label: string }[] = [
    { key: 'transactions', label: 'Transactions' },
    { key: 'quests', label: 'Quest Log' },
    { key: 'questboard', label: 'Quest Board' },
    { key: 'goals', label: 'Goals' },
    { key: 'categories', label: 'Categories' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        {gameStatus && <CharacterPanel status={gameStatus} />}

        <div className="flex gap-2 mb-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded font-medium ${
                activeTab === tab.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
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

        {activeTab === 'quests' && (
          <QuestLog onQuestResolved={fetchStatus} />
        )}

        {activeTab === 'questboard' && (
          <div className="bg-white rounded-lg shadow p-6">
            <QuestBoard onActivated={() => setActiveTab('quests')} />
          </div>
        )}

        {activeTab === 'goals' && (
          <GoalsPage onGoalCompleted={fetchStatus} />
        )}

        {activeTab === 'categories' && <CategoryManager />
        }
      </div>
    </div>
  );
}

export default App;