import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, UserPlus, Ban } from 'lucide-react';
import { Project } from '../types/project';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/storage';
import { ProjectAccessModal } from '../components/admin/ProjectAccessModal';

export function ProjectSelectionPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAccessModal, setShowAccessModal] = useState(false);

  useEffect(() => {
    const allProjects = storage.getProjects();
    if (user?.role === 'admin') {
      setProjects(allProjects);
    } else {
      // Filter projects based on user access
      const userAccessRequests = accessStorage.getAccessRequests()
        .filter(request => request.userId === user?.id && request.status === 'approved')
        .map(request => request.selectedProjects)
        .flat();
      
      setProjects(allProjects.filter(project => userAccessRequests.includes(project.id)));
    }
  }, [user]);

  const handleManageAccess = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setSelectedProject(project);
    setShowAccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
              <p className="mt-1 text-sm text-gray-500">Select a project to continue</p>
            </div>
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/projects/new')}
                className="flex items-center px-4 py-2 text-[#FF8001] hover:bg-[#FF8001]/10 rounded-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/dashboard/${project.id}`)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow relative group"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  {user?.role === 'admin' && (
                    <>
                      <button
                        onClick={(e) => handleManageAccess(e, project)}
                        className="p-1 text-gray-500 hover:text-[#FF8001]"
                        title="Manage Access"
                      >
                        <UserPlus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit project
                        }}
                        className="p-1 text-gray-500 hover:text-[#FF8001]"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full
                    ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      project.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(project.startDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAccessModal && selectedProject && (
        <ProjectAccessModal
          project={selectedProject}
          onClose={() => {
            setShowAccessModal(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}