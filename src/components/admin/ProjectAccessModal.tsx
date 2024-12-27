import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Project } from '../../types/project';
import { User } from '../../types/user';
import { AccessRequest } from '../../types/access';
import { accessStorage } from '../../utils/accessStorage';
import { userStorage } from '../../utils/userStorage';
import { ProjectAccessToggle } from './ProjectAccessToggle';

interface ProjectAccessModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectAccessModal({ project, onClose }: ProjectAccessModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<AccessRequest[]>([]);

  useEffect(() => {
    setUsers(userStorage.getUsers());
    setPendingRequests(
      accessStorage.getAccessRequests().filter(r => 
        r.status === 'pending' && 
        r.selectedProjects.includes(project.id)
      )
    );
  }, [project.id]);

  const handleToggleAccess = (userId: string, projectId: string, active: boolean) => {
    accessStorage.toggleUserAccess(userId, projectId, active);
    // Refresh users to update UI
    setUsers([...users]);
  };

  const handleApprove = (request: AccessRequest) => {
    accessStorage.updateAccessRequest(request.id, 'approved');
    setPendingRequests(pendingRequests.filter(r => r.id !== request.id));
  };

  const handleReject = (request: AccessRequest) => {
    accessStorage.updateAccessRequest(request.id, 'rejected');
    setPendingRequests(pendingRequests.filter(r => r.id !== request.id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Access - {project.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Pending Access Requests</h3>
            {pendingRequests.length === 0 ? (
              <p className="text-gray-500">No pending requests</p>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{request.name}</p>
                      <p className="text-sm text-gray-500">{request.email}</p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleApprove(request)}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request)}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">User Access</h3>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <ProjectAccessToggle
                    userId={user.id}
                    projectId={project.id}
                    isActive={accessStorage.getUserProjectAccess(user.id, project.id)}
                    onToggle={handleToggleAccess}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}