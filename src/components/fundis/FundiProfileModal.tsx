import React from 'react';
import { X } from 'lucide-react';
import { Fundi } from '../../types/fundi';
import { InventoryItem } from '../../types/inventory';

interface FundiProfileModalProps {
  fundi: Fundi;
  assignedGear: InventoryItem[];
  onClose: () => void;
  onStatusChange: (status: Fundi['availabilityStatus']) => void;
}

export function FundiProfileModal({
  fundi,
  assignedGear,
  onClose,
  onStatusChange,
}: FundiProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold">{fundi.name}</h2>
            <p className="text-gray-600">{fundi.skillCategory}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-medium text-gray-700">Contact Information</h3>
            <p className="text-gray-600">{fundi.phone}</p>
            <p className="text-gray-600">{fundi.email}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Status</h3>
            <select
              value={fundi.availabilityStatus}
              onChange={(e) => onStatusChange(e.target.value as Fundi['availabilityStatus'])}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
            >
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Assigned Gear</h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Item
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Assigned Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Return Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Condition
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {assignedGear.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {new Date(item.assignmentHistory[0]?.dateAssigned).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full
                        ${item.status === 'Available' ? 'bg-green-100 text-green-800' :
                          item.status === 'Assigned' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {item.assignmentHistory[0]?.status || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}