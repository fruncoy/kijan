import React, { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import { InventoryItem, ItemStatus } from '../../types/inventory';

interface InventoryListProps {
  items: InventoryItem[];
  onItemClick: (item: InventoryItem) => void;
}

export function InventoryList({ items, onItemClick }: InventoryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ItemStatus | 'all'>('all');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-[#FF8001] focus:border-[#FF8001]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ItemStatus | 'all')}
          className="rounded-lg border border-gray-300 focus:ring-[#FF8001] focus:border-[#FF8001]"
        >
          <option value="all">All Status</option>
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              {item.quantity <= item.minThreshold && (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Quantity:</span>
                <span className="font-medium">{item.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${item.status === 'Available' ? 'bg-green-100 text-green-800' :
                    item.status === 'Assigned' ? 'bg-blue-100 text-blue-800' :
                    item.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                  {item.status}
                </span>
              </div>
              {item.assignedTo && item.assignedTo.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Assigned to:</span>
                  <span className="font-medium">{item.assignedTo[0].name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}