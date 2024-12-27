export type SkillCategory = 'Plumber' | 'Electrician' | 'Carpenter' | 'Painter' | 'Mason';
export type AvailabilityStatus = 'Available' | 'Busy' | 'On Leave';
export type PaymentMode = 'Cash' | 'Bank Transfer' | 'M-Pesa';

export interface Fundi {
  id: string;
  name: string;
  skillCategory: SkillCategory;
  availabilityStatus: AvailabilityStatus;
  phone: string;
  email: string;
  paymentMode: PaymentMode;
  assignedProjectId?: string;
  equipment: string[];
  payments: Payment[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Completed';
  projectId: string;
  description: string;
}

export interface FundiFormData {
  name: string;
  skillCategory: SkillCategory;
  availabilityStatus: AvailabilityStatus;
  phone: string;
  email: string;
  paymentMode: PaymentMode;
  equipment: string[];
}