import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import type { CategoryFormData, CategoryType } from '../types/Category';

const emptyForm: CategoryFormData = {
  name: '',
  type: 'EXPENSE',
  icon: '⭐',
};

function CategoryManager() {
  const { categories, loading, error, addCategory, updateCategory, deleteCategory } = useCategories();
  const [formData, setFormData] = useState<CategoryFormData>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const showFeedback = (message: string, isError = false) => {
    setFeedback({ message, isError });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await updateCategory(editingId, formData);
        showFeedback('Category updated successfully');
      } else {
        await addCategory(formData);
        showFeedback('Category added successfully');
      }
      setFormData(emptyForm);
      setEditingId(null);
      setIsFormOpen(false);
    } catch (err: any) {
      const message = err?.response?.data?.error ?? 'Failed to save category';
      showFeedback(message, true);
    }
  };

  const handleEdit = (id: number, name: string, type: string, icon: string) => {
    setEditingId(id);
    setFormData({ name, type: type as CategoryType, icon });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      await deleteCategory(id);
      showFeedback('Category deleted');
    } catch (err: any) {
      const message = err?.response?.data?.error ?? 'Failed to delete category';
      showFeedback(message, true);
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const expenseCategories = categories.filter((c) => c.type === 'EXPENSE' || c.type === 'BOTH');
  const incomeCategories = categories.filter((c) => c.type === 'INCOME' || c.type === 'BOTH');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-slate-800">Categories</h1>
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            + New Category
          </button>
        )}
      </div>

      {/* Feedback message */}
      {feedback && (
        <div className={`mb-4 px-4 py-2 rounded text-sm ${
          feedback.isError
            ? 'bg-red-100 text-red-700 border border-red-300'
            : 'bg-green-100 text-green-700 border border-green-300'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Add/Edit Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit}
          className="border border-slate-200 rounded-lg p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input
              type="text" name="name" value={formData.name}
              onChange={handleChange} required
              placeholder="e.g. Hobby Figures"
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Type</label>
            <select name="type" value={formData.type} onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2"
              disabled={editingId !== null}>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
              <option value="BOTH">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Icon (emoji)</label>
            <input
              type="text" name="icon" value={formData.icon}
              onChange={handleChange}
              placeholder="⭐"
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <div className="sm:col-span-3 flex gap-2">
            <button type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
              {editingId !== null ? 'Update Category' : 'Add Category'}
            </button>
            <button type="button" onClick={handleCancel}
              className="bg-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-400 text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Expense Categories */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">
          Expense Categories ({expenseCategories.length})
        </h2>
        <div className="divide-y divide-slate-100">
          {expenseCategories.map((cat) => (
            <div key={cat.id}
              className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-slate-700">{cat.name}</span>
                {cat.isDefault && (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                    default
                  </span>
                )}
              </div>
              {!cat.isDefault && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat.id, cat.name, cat.type, cat.icon)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Income Categories */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">
          Income Categories ({incomeCategories.length})
        </h2>
        <div className="divide-y divide-slate-100">
          {incomeCategories.map((cat) => (
            <div key={cat.id}
              className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-slate-700">{cat.name}</span>
                {cat.isDefault && (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                    default
                  </span>
                )}
              </div>
              {!cat.isDefault && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat.id, cat.name, cat.type, cat.icon)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryManager;