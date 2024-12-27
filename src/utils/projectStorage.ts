import { Project } from '../types/project';

export const projectStorage = {
  getProjectData: (projectId: string, key: string) => {
    const data = localStorage.getItem(`project_${projectId}_${key}`);
    return data ? JSON.parse(data) : null;
  },

  setProjectData: (projectId: string, key: string, data: any) => {
    localStorage.setItem(`project_${projectId}_${key}`, JSON.stringify(data));
  },

  // Project-specific inventory methods
  getInventory: (projectId: string) => {
    return projectStorage.getProjectData(projectId, 'inventory') || [];
  },

  setInventory: (projectId: string, inventory: any[]) => {
    projectStorage.setProjectData(projectId, 'inventory', inventory);
  },

  // Project-specific fundis methods
  getFundis: (projectId: string) => {
    return projectStorage.getProjectData(projectId, 'fundis') || [];
  },

  setFundis: (projectId: string, fundis: any[]) => {
    projectStorage.setProjectData(projectId, 'fundis', fundis);
  },

  // Project-specific finance methods
  getFinance: (projectId: string) => {
    return projectStorage.getProjectData(projectId, 'finance') || [];
  },

  setFinance: (projectId: string, finance: any[]) => {
    projectStorage.setProjectData(projectId, 'finance', finance);
  },
};