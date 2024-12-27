import { Project } from '../types/project';

const PROJECTS_KEY = 'projects';

const defaultProject: Project = {
  id: 'default-project',
  name: 'Sample Construction Project',
  description: 'A sample construction project for testing purposes.',
  status: 'Ongoing',
  priority: 'Medium',
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  assignedFundis: [],
  images: [],
  files: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Initialize storage with default data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(PROJECTS_KEY)) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify([defaultProject]));
  }
};

// Call initialization
initializeStorage();

export const storage = {
  getProjects: (): Project[] => {
    const projects = localStorage.getItem(PROJECTS_KEY);
    return projects ? JSON.parse(projects) : [defaultProject];
  },

  saveProject: (project: Project) => {
    const projects = storage.getProjects();
    localStorage.setItem(PROJECTS_KEY, JSON.stringify([...projects, project]));
  },

  updateProject: (updatedProject: Project) => {
    const projects = storage.getProjects();
    const updatedProjects = projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
  },

  deleteProject: (projectId: string) => {
    const projects = storage.getProjects();
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects.filter(p => p.id !== projectId)));
  }
};