import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ProjectList } from '../components/projects/ProjectList';
import { ProjectForm } from '../components/projects/ProjectForm';
import { Project, ProjectFormData } from '../types/project';
import { storage } from '../utils/storage';
import { ProjectTaskModal } from '../components/projects/ProjectTaskModal';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  useEffect(() => {
    setProjects(storage.getProjects());
  }, []);

  const handleCreateProject = (formData: ProjectFormData) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      ...formData,
      images: [],
      files: [],
      assignedFundis: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.saveProject(newProject);
    setProjects([...projects, newProject]);
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="flex items-center px-4 py-2 text-[#FF8001] hover:bg-[#FF8001]/10 rounded-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add
        </button>
      </div>

      <ProjectList
        projects={projects}
        onProjectClick={setSelectedProject}
      />

      {isTaskModalOpen && (
        <ProjectTaskModal
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={(data) => {
            // Handle task/phase/room creation
            setIsTaskModalOpen(false);
          }}
        />
      )}
    </div>
  );
}