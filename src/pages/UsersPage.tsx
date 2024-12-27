import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { User, UserStatus, UserRole } from '../types/user';
import { UserList } from '../components/users/UserList';
import { UserForm } from '../components/users/UserForm';
import { userStorage } from '../utils/userStorage';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');

  useEffect(() => {
    setUsers(userStorage.getUsers());
  }, []);

  const handleCreateUser = async (formData: UserFormData) => {
    try {
      const newUser = userStorage.saveUser(formData);
      setUsers([...users, newUser]);
      setIsFormOpen(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create user');
    }
  };

  const handleUpdateUser = async (formData: UserFormData) => {
    if (!selectedUser) return;
    try {
      const updatedUser = userStorage.updateUser(selectedUser.id, formData);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setSelectedUser(null);
      setIsFormOpen(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      userStorage.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      setSelectedUser(null);
    }
  };

  const handleResetPassword = async (userId: string) => {
    const newPassword = window.prompt('Enter new password:');
    if (newPassword) {
      userStorage.resetPassword(userId, newPassword);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setSelectedUser(null);
          }}
          className="flex items-center px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
        >
          <Plus className="h-5 w-5 mr-2" />
          New User
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedUser ? 'Edit User' : 'Create New User'}
          </h2>
          <UserForm
            initialData={selectedUser || undefined}
            onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedUser(null);
            }}
          />
        </div>
      ) : selectedUser ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
              <p className="text-gray-600">{selectedUser.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setIsFormOpen(true);
                }}
                className="px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
              >
                Edit
              </button>
              <button
                onClick={() => handleResetPassword(selectedUser.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reset Password
              </button>
              <button
                onClick={() => handleDeleteUser(selectedUser.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-medium text-gray-700">Role</h3>
              <p>{selectedUser.role}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Status</h3>
              <p>{selectedUser.status}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Phone</h3>
              <p>{selectedUser.phone}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Permissions</h3>
              <ul className="list-disc list-inside">
                {Object.entries(selectedUser.permissions)
                  .filter(([, value]) => value)
                  .map(([key]) => (
                    <li key={key} className="capitalize">{key}</li>
                  ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => setSelectedUser(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Users
          </button>
        </div>
      ) : (
        <UserList
          users={users}
          onUserClick={setSelectedUser}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />
      )}
    </div>
  );
}