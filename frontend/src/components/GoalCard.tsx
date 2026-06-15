import { useState } from 'react';
import type { Goal } from '../types/Goal';

interface GoalCardProps {
  goal: Goal;
  onContribute: (id: number, amount: number) => Promise<void>;
  onAbandon: (id: number) => void;
  onDelete: (id: number) => void;
}

const goalTypeLabels: Record<string, string> = {
  EMERGENCY_FUND: '🛡️ Emergency Fund',
  PURCHASE: '🛒 Purchase',
  TRAVEL: '✈️ Travel',
  INVESTMENT: '📈 Investment',
  CUSTOM: '⭐ Custom',
};

const statusStyles: Record<string, string> = {
  ACTIVE: 'border-blue-300 bg-blue-50',
  COMPLETED: 'border-green-300 bg-green-50',
  ABANDONED: 'border-slate-300 bg-slate-50',
};

function GoalCard({ goal, onContribute, onAbandon, onDelete }: GoalCardProps) {
  const [contributionAmount, setContributionAmount] = useState('');
  const [showContribute, setShowContribute] = useState(false);

  const handleContribute = async () => {
    const amount = parseFloat(contributionAmount);
    if (!amount || amount <= 0) return;
    await onContribute(goal.id, amount);
    setContributionAmount('');
    setShowContribute(false);
  };

  const progressColor = goal.progressPercent >= 100
    ? 'bg-green-500'
    : goal.progressPercent >= 50
    ? 'bg-blue-500'
    : 'bg-purple-500';

  return (
    <div className={`border rounded-lg p-4 ${statusStyles[goal.status]}`}>
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-bold text-slate-800">{goal.name}</h3>
          <p className="text-xs text-slate-500">{goalTypeLabels[goal.goalType]}</p>
        </div>
        {goal.status === 'COMPLETED' && (
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
            Completed!
          </span>
        )}
        {goal.isOverdue && goal.status === 'ACTIVE' && (
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
            Overdue
          </span>
        )}
      </div>

      {goal.description && (
        <p className="text-sm text-slate-600 mb-2">{goal.description}</p>
      )}

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>₱{goal.currentAmount.toLocaleString()} saved</span>
          <span>₱{goal.targetAmount.toLocaleString()} goal</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className={`${progressColor} h-3 rounded-full transition-all`}
            style={{ width: `${goal.progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {goal.progressPercent.toFixed(1)}% — ₱{goal.remaining.toLocaleString()} remaining
        </p>
      </div>

      {goal.deadline && (
        <p className="text-xs text-slate-500 mb-2">
          Deadline: {goal.deadline}
          {goal.isOverdue && <span className="text-red-500 ml-1">(Overdue)</span>}
        </p>
      )}

      <p className="text-xs text-green-600 mb-3">+{goal.hpReward} HP on completion</p>

      {/* Contribution form */}
      {goal.status === 'ACTIVE' && (
        <>
          {showContribute ? (
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                placeholder="Amount"
                min="1"
                step="0.01"
                className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm"
              />
              <button
                onClick={handleContribute}
                className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowContribute(false)}
                className="bg-slate-300 text-slate-700 px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setShowContribute(true)}
                className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
              >
                + Contribute
              </button>
              <button
                onClick={() => onAbandon(goal.id)}
                className="text-slate-400 hover:text-slate-600 text-sm underline"
              >
                Abandon
              </button>
            </div>
          )}
        </>
      )}

      {goal.status !== 'ACTIVE' && (
        <button
          onClick={() => onDelete(goal.id)}
          className="text-xs text-slate-400 hover:text-red-600 hover:underline mt-2"
        >
          Remove
        </button>
      )}
    </div>
  );
}

export default GoalCard;