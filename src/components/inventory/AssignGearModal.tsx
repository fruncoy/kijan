import React, { useState } from 'react';
import { X } from 'lucide-react';
import { InventoryItem } from '../../types/inventory';
import { Fundi } from '../../types/fundi';

interface AssignGearModalProps {
  item: InventoryItem;
  fundis: Fundi[];
  onAssign: (fundiId: string, date: string, comments: string) => void;
  onClose: () => void;
}

export function AssignGearModal({ item, fundis, onAssign, onClose }: AssignGearModalProps) {
  const [selectedFundi, setSelectedFundi] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssign(selectedFundi, assignmentDate, comments);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Assign {item.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assign to Fundi
            </label>
            <select
              value={selectedFundi}
              onChange={(e) => setSelectedFundi(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
            >
              <option value="">Select a Fundi</option>
              {fundis.map((fundi) => (
                <option key={fundi.id} value={fundi.id}>
                  {fundi.name} - {fundi.skillCategory}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assignment Date
            </label>
            <input
              type="date"
              value={assignmentDate}
              onChange={(e) => setAssignmentDate(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
              placeholder="Add any notes about the assignment..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF8001] hover:bg-[#FF8001]/90"
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}