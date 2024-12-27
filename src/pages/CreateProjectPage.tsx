import React from 'react';
import { CreateProjectForm } from '../components/projects/CreateProjectForm';

export function CreateProjectPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F3] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h1>
          <CreateProjectForm />
        </div>
      </div>
    </div>
  );
}