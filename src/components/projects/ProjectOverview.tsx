import React from 'react';
import { storage } from '../../utils/storage';

export function ProjectOverview({ projectId }: { projectId: string }) {
  const project = storage.getProjects().find(p => p.id === projectId);

  if (!project) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <p className="text-gray-600 mt-2">{project.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-700">Status</h3>
          <p className="mt-1">{project.status}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-700">Timeline</h3>
          <p className="mt-1">
            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}