import { useEffect } from 'react';
import { useQuests } from '../hooks/useQuests';
import QuestCard from './QuestCard';
import QuestForm from './QuestForm';
import type { QuestFormData } from '../types/Quest';

interface QuestLogProps {
  onQuestResolved: () => void;
}

function QuestLog({ onQuestResolved }: QuestLogProps) {
  const { quests, loading, error, addQuest, deleteQuest, fetchQuests } = useQuests();

  useEffect(() => {
    if (!loading && quests.length >= 0) {
      onQuestResolved();
    }
  }, [quests, loading]);

  const handleAdd = async (data: QuestFormData) => {
    await addQuest(data);
  };

  const handleDelete = async (id: number) => {
    await deleteQuest(id);
  };

  const activeQuests = quests.filter((q) => q.status === 'ACTIVE');
  const resolvedQuests = quests.filter((q) => q.status !== 'ACTIVE');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Quest Log</h1>

      <QuestForm onSubmit={handleAdd} />

      {loading && <p>Loading quests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">Active Quests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {activeQuests.length === 0 && <p className="text-slate-400 text-sm">No active quests.</p>}
        {activeQuests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} onDelete={handleDelete} />
        ))}
      </div>

      {resolvedQuests.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">Resolved Quests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resolvedQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuestLog;