export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Pending' | 'Ongoing' | 'Completed';
  images: string[];
  files: string[];
  assignedFundis: AssignedFundi[];
  createdAt: string;
  updatedAt: string;
}

export interface AssignedFundi {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  status: Project['status'];
  assignedFundis: string[];
}