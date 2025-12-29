
import React, { useState, useMemo } from 'react';
import { Provider } from '../types';

interface AdminPanelProps {
  providers: Provider[];
  onDelete: (id: number) => void;
  onEdit: (provider: Provider) => void;
  onClose: () => void;
}

type SortField = 'name' | 'category' | 'rating' | 'completedJobs';
type SortOrder = 'asc' | 'desc';

const AdminPanel: React.FC<AdminPanelProps> = ({ providers, onDelete, onEdit, onClose }) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedProviders = useMemo(() => {
    return [...providers].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [providers, sortField, sortOrder]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="ml-1 opacity-30 text-[10px]">⇅</span>;
    return <span className="ml-1 text-indigo-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Console</h1>
          <p className="text-gray-500">Managing {providers.length} registered professionals.</p>
        </div>
        <button onClick={onClose} className="px-6 py-2 bg-gray-100 rounded-full font-bold hover:bg-gray-200">Close Admin</button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th 
                  className="px-6 py-4 font-bold text-gray-400 uppercase text-xs cursor-pointer hover:text-indigo-600 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  Provider <SortIcon field="name" />
                </th>
                <th 
                  className="px-6 py-4 font-bold text-gray-400 uppercase text-xs cursor-pointer hover:text-indigo-600 transition-colors"
                  onClick={() => handleSort('category')}
                >
                  Category <SortIcon field="category" />
                </th>
                <th 
                  className="px-6 py-4 font-bold text-gray-400 uppercase text-xs cursor-pointer hover:text-indigo-600 transition-colors"
                  onClick={() => handleSort('rating')}
                >
                  Rating <SortIcon field="rating" />
                </th>
                <th 
                  className="px-6 py-4 font-bold text-gray-400 uppercase text-xs cursor-pointer hover:text-indigo-600 transition-colors"
                  onClick={() => handleSort('completedJobs')}
                >
                  Jobs <SortIcon field="completedJobs" />
                </th>
                <th className="px-6 py-4 font-bold text-gray-400 uppercase text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedProviders.map(provider => (
                <tr key={provider.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://images.unsplash.com/photo-${provider.photoId}?w=100&h=100&fit=crop&crop=face`}
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                        alt=""
                      />
                      <div>
                        <div className="font-bold text-gray-900">{provider.name}</div>
                        <div className="text-xs text-gray-500">{provider.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-wider">{provider.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">
                    ★ {provider.rating.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">
                    {provider.completedJobs}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onEdit(provider)}
                        className="px-3 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(provider.id)}
                        className="px-3 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
