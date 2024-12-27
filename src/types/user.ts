export type UserRole = 'Admin' | 'Project Manager' | 'Site Manager';
export type UserStatus = 'Active' | 'Inactive';

export interface UserPermissions {
  projects: boolean;
  users: boolean;
  inventory: boolean;
  finance: boolean;
  reports: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  permissions: UserPermissions;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  permissions: UserPermissions;
  password?: string;
}