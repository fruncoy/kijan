export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'payment' | 'inventory' | 'task';
  status: 'unread' | 'read';
  createdAt: string;
}

export interface Reminder {
  id: string;
  taskName: string;
  description: string;
  dueDate: string;
  assignedTo?: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface ReminderFormData {
  taskName: string;
  description: string;
  dueDate: string;
  assignedTo?: string;
}