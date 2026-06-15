import { useState } from 'react';
import type { GoalFormData, GoalType } from '../types/Goal';

interface GoalFormProps {
  onSubmit: (data: GoalFormData) => Promise<void>;
}

const emptyForm: GoalFormData = {
  name: '',
  description: '',
  goalType: 'CUSTOM',
  targetAmount: 0,
  deadline: '',
  hpReward: 10,
};

function GoalForm({ onSubmit }: GoalFormProps) {
  const [formData, setFormData] = useState<GoalFormData>(emptyForm);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericFields = ['targetAmount', 'hpReward'];
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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        + New Goal
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="sm:col-span-2">
        <label className="block text-sm text-slate-600 mb-1">Goal Name</label>
        <input
          type="text" name="name" value={formData.name} onChange={handleChange} required
          className="w-full border border-slate-300 rounded px-3 py-2"
          placeholder="e.g. Batanes Travel Fund"
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
        <label className="block text-sm text-slate-600 mb-1">Goal Type</label>
        <select name="goalType" value={formData.goalType} onChange={handleChange}
          className="w-full border border-slate-300 rounded px-3 py-2">
          <option value="EMERGENCY_FUND">🛡️ Emergency Fund</option>
          <option value="PURCHASE">🛒 Purchase</option>
          <option value="TRAVEL">✈️ Travel</option>
          <option value="INVESTMENT">📈 Investment</option>
          <option value="CUSTOM">⭐ Custom</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">Target Amount (₱)</label>
        <input
          type="number" name="targetAmount" value={formData.targetAmount}
          onChange={handleChange} required step="0.01" min="1"
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">Deadline (optional)</label>
        <input
          type="date" name="deadline" value={formData.deadline} onChange={handleChange}
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">HP Reward on Completion</label>
        <input
          type="number" name="hpReward" value={formData.hpReward}
          onChange={handleChange} min="0"
          className="w-full border border-slate-300 rounded px-3 py-2"
        />
      </div>

      <div className="sm:col-span-2 flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Goal
        </button>
        <button type="button" onClick={() => setIsOpen(false)}
          className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default GoalForm;