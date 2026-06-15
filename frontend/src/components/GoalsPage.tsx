import { useGoals } from '../hooks/useGoals';
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';
import type { GoalFormData } from '../types/Goal';

interface GoalsPageProps {
  onGoalCompleted: () => void;
}

function GoalsPage({ onGoalCompleted }: GoalsPageProps) {
  const { goals, loading, error, addGoal, contribute, abandonGoal, deleteGoal } = useGoals();

  const handleContribute = async (id: number, amount: number) => {
    await contribute(id, { amount });
    onGoalCompleted();
  };

  const activeGoals = goals.filter((g) => g.status === 'ACTIVE');
  const completedGoals = goals.filter((g) => g.status === 'COMPLETED');
  const abandonedGoals = goals.filter((g) => g.status === 'ABANDONED');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Goals</h1>

      <GoalForm onSubmit={addGoal} />

      {loading && <p>Loading goals...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">Active Goals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {activeGoals.length === 0 && <p className="text-slate-400 text-sm">No active goals.</p>}
        {activeGoals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onContribute={handleContribute}
            onAbandon={abandonGoal}
            onDelete={deleteGoal}
          />
        ))}
      </div>

      {completedGoals.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">Completed Goals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {completedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onContribute={handleContribute}
                onAbandon={abandonGoal} onDelete={deleteGoal} />
            ))}
          </div>
        </>
      )}

      {abandonedGoals.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">Abandoned Goals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {abandonedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onContribute={handleContribute}
                onAbandon={abandonGoal} onDelete={deleteGoal} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default GoalsPage;