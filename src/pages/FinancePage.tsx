import React, { useState, useEffect } from 'react';
import { Plus, Download, Search, DollarSign } from 'lucide-react';
import { FinanceEntry, FinanceFormData } from '../types/finance';
import { financeStorage } from '../utils/financeStorage';
import { storage } from '../utils/storage';
import { StatsCard } from '../components/StatsCard';

export function FinancePage() {
  const [entries, setEntries] = useState<FinanceEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<FinanceEntry['paymentStatus'] | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<FinanceEntry | null>(null);
  const [summary, setSummary] = useState(financeStorage.getSummary());

  useEffect(() => {
    setEntries(financeStorage.getEntries());
    setSummary(financeStorage.getSummary());
  }, []);

  const handleCreateEntry = (formData: FinanceFormData) => {
    const project = storage.getProjects().find(p => p.id === formData.projectId);
    if (!project) return;

    const newEntry = financeStorage.saveEntry(formData, project.name);
    setEntries([...entries, newEntry]);
    setSummary(financeStorage.getSummary());
    setIsFormOpen(false);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || entry.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToPDF = () => {
    // In a real app, implement PDF export functionality
    console.log('Exporting to PDF...');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Finance Management</h1>
        <div className="space-x-2">
          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Entry
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Total Budget"
          value={`$${summary.totalBudget.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatsCard
          title="Pending Payments"
          value={`$${summary.pendingPayments.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatsCard
          title="Cleared Payments"
          value={`$${summary.clearedPayments.toLocaleString()}`}
          icon={DollarSign}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-[#FF8001] focus:border-[#FF8001]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FinanceEntry['paymentStatus'] | 'all')}
              className="rounded-lg border border-gray-300 focus:ring-[#FF8001] focus:border-[#FF8001]"
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Due
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEntries.map((entry) => (
                <tr
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {entry.projectName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${entry.amountPaid.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${entry.amountDue.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(entry.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${entry.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {entry.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}