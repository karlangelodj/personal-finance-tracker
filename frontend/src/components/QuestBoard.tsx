import { useState } from 'react';
import { useQuestTemplates } from '../hooks/useQuestTemplates';
import { useCategories } from '../hooks/useCategories';
import type { QuestTemplate } from '../types/QuestTemplate';
import type { QuestFormData } from '../types/Quest';

interface QuestBoardProps {
  onActivated: () => void;
}

const questTypeLabels: Record<string, string> = {
  SPENDING_LIMIT: '💰 Spending Limit',
  SAVINGS_TARGET: '🏦 Savings Target',
  NO_SPEND: '🚫 No-Spend',
  STREAK: '🔥 Streak',
};

function QuestBoard({ onActivated }: QuestBoardProps) {
  const { templates, loading, error, activateTemplate } = useQuestTemplates();
  const { categories } = useCategories('EXPENSE');
  const [activating, setActivating] = useState<QuestTemplate | null>(null);
  const [formData, setFormData] = useState<Partial<QuestFormData>>({});

  const handleActivateClick = (template: QuestTemplate) => {
    setActivating(template);
    setFormData({
      name: template.name,
      description: template.description ?? '',
      questType: template.questType,
      category: template.category ?? '',
      targetAmount: template.suggestedTarget ?? 0,
      period: template.suggestedPeriod,
      periodStart: '',
      periodEnd: '',
      hpReward: template.hpReward,
      hpPenalty: template.hpPenalty,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'targetAmount' ? Number(value) : value,
    }));
  };

  const handleConfirm = async () => {
    if (!activating) return;
    await activateTemplate(activating.id, formData as QuestFormData);
    setActivating(null);
    setFormData({});
    onActivated();
  };

  const needsCategory = formData.questType === 'SPENDING_LIMIT' ||
                        formData.questType === 'NO_SPEND';

  if (loading) return <p>Loading quest board...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-700 mb-3">Quest Board</h2>
      <p className="text-sm text-slate-500 mb-4">
        Activate a pre-made challenge or create a custom quest from the Quest Log tab.
      </p>

      {activating && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="font-bold text-slate-800 mb-4">
              Activate: {activating.name}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-sm text-slate-600 mb-1">Quest Name</label>
                <input
                  type="text" name="name" value={formData.name ?? ''}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded px-3 py-2"
                />
              </div>

              {needsCategory && (
                <div className="col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">Category</label>
                  <select
                    name="category" value={formData.category ?? ''}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded px-3 py-2"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.questType !== 'NO_SPEND' && (
                <div className="col-span-2">
                  <label className="block text-sm text-slate-600 mb-1">
                    Target Amount (₱)
                  </label>
                  <input
                    type="number" name="targetAmount"
                    value={formData.targetAmount ?? 0}
                    onChange={handleChange} min="0" step="0.01"
                    className="w-full border border-slate-300 rounded px-3 py-2"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-600 mb-1">Start Date</label>
                <input
                  type="date" name="periodStart"
                  value={formData.periodStart ?? ''}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">End Date</label>
                <input
                  type="date" name="periodEnd"
                  value={formData.periodEnd ?? ''}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleConfirm}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Activate Quest
              </button>
              <button
                onClick={() => setActivating(null)}
                className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-4 ${
              template.isSeasonal
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-slate-800">{template.name}</h3>
                <p className="text-xs text-slate-500">
                  {questTypeLabels[template.questType]}
                </p>
              </div>
              {template.isSeasonal && (
                <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">
                  Seasonal
                </span>
              )}
            </div>

            {template.description && (
              <p className="text-sm text-slate-600 mb-2">{template.description}</p>
            )}

            <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
              <span>{template.suggestedPeriod}</span>
              {template.suggestedTarget && (
                <span>Target: ₱{template.suggestedTarget.toLocaleString()}</span>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xs">
                <span className="text-green-600">+{template.hpReward} HP</span>
                <span className="text-slate-400 mx-1">/</span>
                <span className="text-red-500">-{template.hpPenalty} HP</span>
              </div>
              <button
                onClick={() => handleActivateClick(template)}
                className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
              >
                Activate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestBoard;