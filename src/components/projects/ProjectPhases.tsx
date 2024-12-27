import React, { useState } from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import { Phase, PhaseFormData } from '../../types/phase';
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';

export function ProjectPhases({ projectId }: { projectId: string }) {
  const [phases, setPhases] = useProjectData<Phase[]>('phases', []);
  const [isAddingPhase, setIsAddingPhase] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<string[]>([]);
  const [newPhase, setNewPhase] = useState<PhaseFormData>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: 0,
  });

  const handleAddPhase = () => {
    const phase: Phase = {
      id: crypto.randomUUID(),
      ...newPhase,
      status: 'not-started',
      rooms: [],
    };
    setPhases([...phases, phase]);
    setIsAddingPhase(false);
    setNewPhase({ name: '', description: '', startDate: '', endDate: '', budget: 0 });
  };

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const handleAddRoom = (phaseId: string) => {
    const roomName = window.prompt('Enter room name:');
    if (!roomName) return;

    setPhases(phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          rooms: [
            ...phase.rooms,
            {
              id: crypto.randomUUID(),
              name: roomName,
              description: '',
              status: 'not-started',
            }
          ]
        };
      }
      return phase;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Project Phases</h2>
        <button
          onClick={() => setIsAddingPhase(true)}
          className="flex items-center px-3 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Phase
        </button>
      </div>

      {isAddingPhase && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Phase Name"
              value={newPhase.name}
              onChange={(e) => setNewPhase({ ...newPhase, name: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:border-[#FF8001] focus:ring-[#FF8001]"
            />
            <textarea
              placeholder="Description"
              value={newPhase.description}
              onChange={(e) => setNewPhase({ ...newPhase, description: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:border-[#FF8001] focus:ring-[#FF8001]"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={newPhase.startDate}
                  onChange={(e) => setNewPhase({ ...newPhase, startDate: e.target.value })}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:border-[#FF8001] focus:ring-[#FF8001]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={newPhase.endDate}
                  onChange={(e) => setNewPhase({ ...newPhase, endDate: e.target.value })}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:border-[#FF8001] focus:ring-[#FF8001]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Budget</label>
              <input
                type="number"
                min="0"
                value={newPhase.budget}
                onChange={(e) => setNewPhase({ ...newPhase, budget: parseFloat(e.target.value) })}
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-[#FF8001] focus:ring-[#FF8001]"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddingPhase(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPhase}
                className="px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
              >
                Add Phase
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {phases.map((phase) => (
          <div key={phase.id} className="border border-gray-200 rounded-lg">
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => togglePhase(phase.id)}
            >
              <div className="flex items-center">
                {expandedPhases.includes(phase.id) ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
                <h3 className="font-medium ml-2">{phase.name}</h3>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full
                ${phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                  phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'}`}>
                {phase.status}
              </span>
            </div>

            {expandedPhases.includes(phase.id) && (
              <div className="border-t border-gray-200 p-4">
                <div className="space-y-4">
                  <p className="text-gray-600">{phase.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Start Date:</span>
                      <span className="ml-2">{new Date(phase.startDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">End Date:</span>
                      <span className="ml-2">{new Date(phase.endDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Budget:</span>
                      <span className="ml-2">${phase.budget.toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Rooms</h4>
                      <button
                        onClick={() => handleAddRoom(phase.id)}
                        className="text-sm text-[#FF8001] hover:text-[#FF8001]/90"
                      >
                        Add Room
                      </button>
                    </div>
                    <div className="space-y-2">
                      {phase.rooms.map((room) => (
                        <div
                          key={room.id}
                          className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                        >
                          <span>{room.name}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full
                            ${room.status === 'completed' ? 'bg-green-100 text-green-800' :
                              room.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'}`}>
                            {room.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}