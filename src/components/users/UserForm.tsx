import React, { useState } from 'react';
import { User, UserFormData, UserRole, UserStatus } from '../../types/user';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

export function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    role: initialData?.role || 'Site Manager',
    status: initialData?.status || 'Active',
    permissions: initialData?.permissions || {
      projects: false,
      users: false,
      inventory: false,
      finance: false,
      reports: false,
    },
    ...(initialData ? {} : { password: '' }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          />
        </div>

        {!initialData && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
            />
          </div>
        )}

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          >
            <option value="Admin">Admin</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Site Manager">Site Manager</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#FF8001] focus:ring-[#FF8001]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Permissions</h3>
        <div className="space-y-2">
          {Object.entries(formData.permissions).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setFormData({
                  ...formData,
                  permissions: {
                    ...formData.permissions,
                    [key]: e.target.checked,
                  },
                })}
                className="rounded border-gray-300 text-[#FF8001] focus:ring-[#FF8001]"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {key}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF8001] hover:bg-[#FF8001]/90"
        >
          {initialData ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
}