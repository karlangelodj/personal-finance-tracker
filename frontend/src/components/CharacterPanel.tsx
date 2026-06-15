import type { GameStatus } from '../types/GameStatus';

interface CharacterPanelProps {
  status: GameStatus;
}

const rankColors: Record<string, string> = {
  IRON: 'text-slate-500',
  BRONZE: 'text-orange-600',
  SILVER: 'text-slate-400',
  GOLD: 'text-yellow-500',
  PLATINUM: 'text-cyan-500',
  DIAMOND: 'text-blue-400',
  MASTER: 'text-purple-500',
  GRANDMASTER: 'text-red-500',
};

function CharacterPanel({ status }: CharacterPanelProps) {
  const hpPercent = (status.currentHp / status.maxHp) * 100;

  const hpColor = hpPercent > 60
    ? 'bg-green-500'
    : hpPercent > 30
    ? 'bg-yellow-500'
    : 'bg-red-500';

  const goldToNextRank = status.nextRankThreshold !== null
    ? status.nextRankThreshold - status.gold
    : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className={`text-xl font-bold ${rankColors[status.rank] ?? 'text-slate-800'}`}>
            {status.rank}
          </h2>
          {status.nextRank ? (
            <p className="text-xs text-slate-500">
              ₱{goldToNextRank.toLocaleString()} to {status.nextRank}
            </p>
          ) : (
            <p className="text-xs text-slate-500">Maximum Rank Achieved</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-yellow-600">
            ₱{status.gold.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-500">Gold</p>
        </div>
      </div>

      {/* HP Bar */}
      <div>
        <div className="flex justify-between text-sm text-slate-600 mb-1">
          <span>HP</span>
          <span>{status.currentHp} / {status.maxHp}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className={`${hpColor} h-3 rounded-full transition-all`}
            style={{ width: `${hpPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterPanel;