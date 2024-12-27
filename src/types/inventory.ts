export type ItemStatus = 'Available' | 'Assigned' | 'Maintenance' | 'Out of Stock';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  minThreshold: number;
  description: string;
  status: ItemStatus;
  assignedTo?: {
    id: string;
    type: 'Fundi' | 'Project';
    name: string;
  }[];
  qrCode: string;
  barcode: string;
  assignmentHistory: Assignment[];
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  assigneeId: string;
  assigneeName: string;
  assigneeType: 'Fundi' | 'Project';
  quantity: number;
  dateAssigned: string;
  dateReturned?: string;
  status: 'Active' | 'Returned';
}

export interface InventoryFormData {
  name: string;
  quantity: number;
  minThreshold: number;
  description: string;
  status: ItemStatus;
}