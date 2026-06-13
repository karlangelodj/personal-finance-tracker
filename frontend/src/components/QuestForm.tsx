import { useState } from 'react';
import type { QuestFormData, QuestType, QuestPeriod } from '../types/Quest';

interface QuestFormProps {
  onSubmit: (data: QuestFormData) => Promise<void>;
}

const emptyForm: QuestFormData = {
  name: '',
  description: '',
  questType: 'SPENDING_LIMIT',
  category: '',
  targetAmount: 0,
  period: 'MONTHLY',
  periodStart: '',
  periodEnd: '',
  xpReward: 50,
  hpReward: 10,
  hpPenalty: 10,
};

function QuestForm({ onSubmit }: QuestFormProps) {
  const [formData, setFormData] = useState<QuestFormData>(emptyForm);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const numericFields = ['targetAmount', 'xpReward', 'hpReward', 'hpPenalty'];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData(emptyForm);
    setIsOpen(false);
  };

  const needsCategory = formData.questType === 'SPENDING_LIMIT' || formData.questType === 'NO_SPEND';
  const needsTarget = formData.questType === 'SPENDING_LIMIT' || formData.questType === 'SAVINGS_TARGET';

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-6"
      >
        + New Quest
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="sm:col-span-2">
        <label className="block text-sm text-slate-600 mb-1">Quest Name</label>
        <input
          type="text" name="name" value={formData.name} onChange={handleChange} required
          className="w-full border border-slate-300 rounded px-3 py-2"
          placeholder="e.g. Tame the Grocery Goblin"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm text-slate-600 mb-1">Description</label>
        <input
          type="text" name="description" value={formData.description} onChange={handleChange}
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">Quest Type</label>
        <select name="questType" value={formData.questType} onChange={handleChange}
          className="w-full border border-slate-300 rounded px-3 py-2">
          <option value="SPENDING_LIMIT">Spending Limit</option>
          <option value="SAVINGS_TARGET">Savings Target</option>
          <option value="NO_SPEND">No-Spend Challenge</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">Period</label>
        <select name="period" value={formData.period} onChange={handleChange}
          className="w-full border border-slate-300 rounded px-3 py-2">
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
      </div>

      {needsCategory && (
        <div>
          <label className="block text-sm text-slate-600 mb-1">Category</label>
          <input
            type="text" name="category" value={formData.category} onChange={handleChange} required
            className="w-full border border-slate-300 rounded px-3 py-2"
            placeholder="e.g. Groceries"
          />
        </div>
      )}

      {needsTarget && (
        <div>
          <label className="block text-sm text-slate-600 mb-1">Target Amount</label>
          <input
            type="number" name="targetAmount" value={formData.targetAmount} onChange={handleChange} required
            step="0.01" min="0"
            className="w-full border border-slate-300 rounded px-3 py-2"
          />
        </div>
      )}

      <div>
        <label className="block text-sm text-slate-600 mb-1">Period Start</label>
        <input
          type="date" name="periodStart" value={formData.periodStart} onChange={handleChange} required
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">Period End</label>
        <input
          type="date" name="periodEnd" value={formData.periodEnd} onChange={handleChange} required
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">XP Reward</label>
        <input
          type="number" name="xpReward" value={formData.xpReward} onChange={handleChange} min="0"
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm text-slate-600 mb-1">HP Reward</label>
          <input
            type="number" name="hpReward" value={formData.hpReward} onChange={handleChange} min="0"
            className="w-full border border-slate-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">HP Penalty</label>
          <input
            type="number" name="hpPenalty" value={formData.hpPenalty} onChange={handleChange} min="0"
            className="w-full border border-slate-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="sm:col-span-2 flex gap-2">
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Create Quest
        </button>
        <button type="button" onClick={() => setIsOpen(false)} className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default QuestForm;