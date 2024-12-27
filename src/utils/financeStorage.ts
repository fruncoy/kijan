import { FinanceEntry, FinanceFormData, FinanceSummary } from '../types/finance';

const FINANCE_KEY = 'finance_entries';

export const financeStorage = {
  getEntries: (): FinanceEntry[] => {
    const entries = localStorage.getItem(FINANCE_KEY);
    return entries ? JSON.parse(entries) : [];
  },

  saveEntry: (formData: FinanceFormData, projectName: string): FinanceEntry => {
    const entries = financeStorage.getEntries();
    const newEntry: FinanceEntry = {
      id: crypto.randomUUID(),
      projectName,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(FINANCE_KEY, JSON.stringify([...entries, newEntry]));
    return newEntry;
  },

  updateEntry: (updatedEntry: FinanceEntry) => {
    const entries = financeStorage.getEntries();
    const updatedEntries = entries.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    );
    localStorage.setItem(FINANCE_KEY, JSON.stringify(updatedEntries));
  },

  deleteEntry: (entryId: string) => {
    const entries = financeStorage.getEntries();
    localStorage.setItem(
      FINANCE_KEY,
      JSON.stringify(entries.filter(entry => entry.id !== entryId))
    );
  },

  getSummary: (): FinanceSummary => {
    const entries = financeStorage.getEntries();
    return entries.reduce(
      (summary, entry) => ({
        totalBudget: summary.totalBudget + entry.amountDue,
        pendingPayments: summary.pendingPayments + (entry.paymentStatus === 'Pending' ? entry.amountDue - entry.amountPaid : 0),
        clearedPayments: summary.clearedPayments + (entry.paymentStatus === 'Paid' ? entry.amountPaid : 0),
      }),
      { totalBudget: 0, pendingPayments: 0, clearedPayments: 0 }
    );
  },

  getDuePayments: (): FinanceEntry[] => {
    const today = new Date();
    return financeStorage.getEntries().filter(
      entry => entry.paymentStatus === 'Pending' && new Date(entry.dueDate) <= today
    );
  },
};