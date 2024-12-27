export type UserRole = 'Project Manager' | 'Site Manager' | 'Finance';
export type AccessStatus = 'pending' | 'approved' | 'rejected';

export interface AccessRequest {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  selectedProjects: string[];
  status: AccessStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectAccess {
  projectId: string;
  userIds: string[];
  roles: Record<string, UserRole>;
}