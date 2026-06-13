import type { GameStatus } from '../types/GameStatus';

interface CharacterPanelProps {
  status: GameStatus;
}

function CharacterPanel({ status }: CharacterPanelProps) {
  const hpPercent = (status.currentHp / status.maxHp) * 100;
  const xpPercent = (status.xpIntoLevel / status.xpForNextLevel) * 100;

  const goldToNextRank = status.nextRankThreshold !== null
    ? status.nextRankThreshold - status.gold
    : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Level {status.level}</h2>
          <p className="text-sm text-slate-500">Rank: {status.rank}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-yellow-600">{status.gold.toFixed(2)} Gold</p>
          {status.nextRank && (
            <p className="text-xs text-slate-500">
              {goldToNextRank.toFixed(2)} Gold to {status.nextRank}
            </p>
          )}
        </div>
      </div>

      {/* HP Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-slate-600 mb-1">
          <span>HP</span>
          <span>{status.currentHp} / {status.maxHp}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className="bg-red-500 h-3 rounded-full transition-all"
            style={{ width: `${hpPercent}%` }}
          />
        </div>
      </div>

      {/* XP Bar */}
      <div>
        <div className="flex justify-between text-sm text-slate-600 mb-1">
          <span>XP</span>
          <span>{status.xpIntoLevel} / {status.xpForNextLevel}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterPanel;