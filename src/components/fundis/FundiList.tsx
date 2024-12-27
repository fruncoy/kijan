import React, { useState } from 'react';
import { Search, UserPlus, Edit2, Trash2, RotateCcw } from 'lucide-react';
import { Fundi, SkillCategory, AvailabilityStatus } from '../../types/fundi';

interface FundiListProps {
  fundis: Fundi[];
  onFundiClick: (fundi: Fundi) => void;
  onAssignGear: (fundi: Fundi) => void;
  onReturnGear: (fundi: Fundi) => void;
}

export function FundiList({ fundis, onFundiClick, onAssignGear, onReturnGear }: FundiListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState<SkillCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AvailabilityStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filteredFundis = fundis.filter(fundi => {
    const matchesSearch = fundi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fundi.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = skillFilter === 'all' || fundi.skillCategory === skillFilter;
    const matchesStatus = statusFilter === 'all' || fundi.availabilityStatus === statusFilter;
    
    return matchesSearch && matchesSkill && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search fundis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-[#FF8001] focus:border-[#FF8001]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value as SkillCategory | 'all')}
            className="rounded-lg border border-gray-300 focus:ring-[#FF8001] focus:border-[#FF8001]"
          >
            <option value="all">All Skills</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Painter">Painter</option>
            <option value="Mason">Mason</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AvailabilityStatus | 'all')}
            className="rounded-lg border border-gray-300 focus:ring-[#FF8001] focus:border-[#FF8001]"
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="On Leave">On Leave</option>
          </select>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 ${viewMode === 'table' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              title="Table View"
            >
              <i className="fas fa-table"></i>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              title="Grid View"
            >
              <i className="fas fa-grid"></i>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skill Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFundis.map((fundi) => (
                <tr
                  key={fundi.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {fundi.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fundi.skillCategory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${fundi.availabilityStatus === 'Available' ? 'bg-green-100 text-green-800' : 
                        fundi.availabilityStatus === 'Busy' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {fundi.availabilityStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{fundi.phone}</div>
                    <div className="text-sm text-gray-500">{fundi.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onFundiClick(fundi)}
                        className="text-gray-400 hover:text-[#FF8001]"
                        title="Edit Fundi"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onAssignGear(fundi)}
                        className="text-gray-400 hover:text-blue-600"
                        title="Assign Gear"
                      >
                        <UserPlus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onReturnGear(fundi)}
                        className="text-gray-400 hover:text-green-600"
                        title="Return Gear"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFundis.map((fundi) => (
            <div
              key={fundi.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{fundi.name}</h3>
                  <p className="text-sm text-gray-500">{fundi.skillCategory}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${fundi.availabilityStatus === 'Available' ? 'bg-green-100 text-green-800' : 
                    fundi.availabilityStatus === 'Busy' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {fundi.availabilityStatus}
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>{fundi.phone}</p>
                <p>{fundi.email}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => onFundiClick(fundi)}
                  className="text-gray-400 hover:text-[#FF8001]"
                  title="Edit Fundi"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onAssignGear(fundi)}
                  className="text-gray-400 hover:text-blue-600"
                  title="Assign Gear"
                >
                  <UserPlus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onReturnGear(fundi)}
                  className="text-gray-400 hover:text-green-600"
                  title="Return Gear"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}