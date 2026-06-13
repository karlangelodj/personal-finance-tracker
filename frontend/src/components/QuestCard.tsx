import type { Quest } from '../types/Quest';

interface QuestCardProps {
  quest: Quest;
  onDelete: (id: number) => void;
}

const statusStyles: Record<string, string> = {
  ACTIVE: 'border-blue-300 bg-blue-50',
  COMPLETED: 'border-green-300 bg-green-50',
  FAILED: 'border-red-300 bg-red-50',
};

const statusBadge: Record<string, string> = {
  ACTIVE: 'bg-blue-500 text-white',
  COMPLETED: 'bg-green-500 text-white',
  FAILED: 'bg-red-500 text-white',
};

const questTypeLabels: Record<string, string> = {
  SPENDING_LIMIT: 'Spending Limit',
  SAVINGS_TARGET: 'Savings Target',
  NO_SPEND: 'No-Spend Challenge',
  STREAK: 'Streak',
};

function QuestCard({ quest, onDelete }: QuestCardProps) {
  const hasTarget = quest.targetAmount !== null;
  const percent = hasTarget
    ? Math.min((quest.progress / quest.targetAmount!) * 100, 100)
    : 0;

  // For NO_SPEND, "progress" of 0 is good (full bar = good), framing differs
  const isNoSpend = quest.questType === 'NO_SPEND';

  return (
    <div className={`border rounded-lg p-4 ${statusStyles[quest.status]}`}>
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-bold text-slate-800">{quest.name}</h3>
          <p className="text-xs text-slate-500">{questTypeLabels[quest.questType]}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusBadge[quest.status]}`}>
          {quest.status}
        </span>
      </div>

      {quest.description && (
        <p className="text-sm text-slate-600 mb-2">{quest.description}</p>
      )}

      {hasTarget && !isNoSpend && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Progress</span>
            <span>{quest.progress.toFixed(2)} / {quest.targetAmount!.toFixed(2)}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}

      {isNoSpend && (
        <p className="text-sm text-slate-600 mb-2">
          {quest.progress === 0
            ? `No spending in ${quest.category} so far — keep it up!`
            : `Spent ${quest.progress.toFixed(2)} in ${quest.category} — quest failed.`}
        </p>
      )}

      <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
        <span>{quest.periodStart} → {quest.periodEnd}</span>
        <div className="flex gap-2">
          <span className="text-blue-600">+{quest.xpReward} XP</span>
          <span className="text-red-500">+{quest.hpReward}/-{quest.hpPenalty} HP</span>
        </div>
      </div>

      {quest.status !== 'ACTIVE' && (
        <button
          onClick={() => onDelete(quest.id)}
          className="text-xs text-slate-400 hover:text-red-600 hover:underline mt-2"
        >
          Remove from log
        </button>
      )}
    </div>
  );
}

export default QuestCard;