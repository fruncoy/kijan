import React from 'react';

interface InventoryTabsProps {
  activeTab: 'workGear' | 'materials';
  onTabChange: (tab: 'workGear' | 'materials') => void;
}

export function InventoryTabs({ activeTab, onTabChange }: InventoryTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-4" aria-label="Tabs">
        <button
          onClick={() => onTabChange('workGear')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'workGear'
              ? 'border-[#FF8001] text-[#FF8001]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Work Gear
        </button>
        <button
          className="py-4 px-1 border-b-2 border-transparent text-gray-400 text-sm cursor-not-allowed"
          disabled
          title="Coming Soon"
        >
          Materials
          <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
            Coming Soon
          </span>
        </button>
      </nav>
    </div>
  );
}