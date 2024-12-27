export interface FinanceEntry {
  id: string;
  projectId: string;
  projectName: string;
  amountPaid: number;
  amountDue: number;
  dueDate: string;
  paymentType: 'Cash' | 'Bank Transfer' | 'M-Pesa';
  paymentStatus: 'Paid' | 'Pending';
  createdAt: string;
  updatedAt: string;
}

export interface FinanceFormData {
  projectId: string;
  amountPaid: number;
  amountDue: number;
  dueDate: string;
  paymentType: FinanceEntry['paymentType'];
  paymentStatus: FinanceEntry['paymentStatus'];
}

export interface FinanceSummary {
  totalBudget: number;
  pendingPayments: number;
  clearedPayments: number;
}