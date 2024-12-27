import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole, AccessRequest } from '../../types/access';
import { accessStorage } from '../../utils/accessStorage';
import { storage } from '../../utils/storage';

export function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Site Manager' as UserRole,
    selectedProjects: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const request: AccessRequest = {
      id: crypto.randomUUID(),
      userId: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      selectedProjects: formData.selectedProjects,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    accessStorage.saveAccessRequest(request);
    alert('Your access request has been submitted for admin approval.');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="Project Manager">Project Manager</option>
          <option value="Site Manager">Site Manager</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Projects
        </label>
        <div className="mt-1 space-y-2">
          {storage.getProjects().map(project => (
            <label key={project.id} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.selectedProjects.includes(project.id)}
                onChange={(e) => {
                  const projects = e.target.checked
                    ? [...formData.selectedProjects, project.id]
                    : formData.selectedProjects.filter(id => id !== project.id);
                  setFormData({ ...formData, selectedProjects: projects });
                }}
                className="rounded border-gray-300 text-[#FF8001] focus:ring-[#FF8001]"
              />
              <span className="ml-2 text-sm text-gray-700">{project.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF8001] hover:bg-[#FF8001]/90"
        >
          Submit Access Request
        </button>
      </div>
    </form>
  );
}