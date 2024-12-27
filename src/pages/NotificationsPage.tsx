import React, { useState, useEffect } from 'react';
import { Plus, Bell, Search } from 'lucide-react';
import { Notification, Reminder } from '../types/notification';
import { notificationStorage } from '../utils/notificationStorage';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Reminder['status'] | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setNotifications(notificationStorage.getNotifications());
    setReminders(notificationStorage.getReminders());
  }, []);

  const handleMarkAsRead = (notificationId: string) => {
    notificationStorage.markAsRead(notificationId);
    setNotifications(notificationStorage.getNotifications());
  };

  const handleCompleteReminder = (reminder: Reminder) => {
    const updatedReminder = { ...reminder, status: 'completed' as const };
    notificationStorage.updateReminder(updatedReminder);
    setReminders(notificationStorage.getReminders());
  };

  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = reminder.taskName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reminder.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications & Reminders</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Reminder
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Panel */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Notifications</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${notification.status === 'unread' ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {notification.status === 'unread' && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-[#FF8001] hover:text-[#FF8001]/90 text-sm"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders Panel */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search reminders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-[#FF8001] focus:border-[#FF8001]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Reminder['status'] | 'all')}
                className="rounded-lg border border-gray-300 focus:ring-[#FF8001] focus:border-[#FF8001]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredReminders.map((reminder) => (
              <div key={reminder.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {reminder.taskName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {reminder.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">
                        Due: {new Date(reminder.dueDate).toLocaleDateString()}
                      </span>
                      {reminder.assignedTo && (
                        <span className="text-gray-500">
                          Assigned to: {reminder.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                  {reminder.status === 'pending' && (
                    <button
                      onClick={() => handleCompleteReminder(reminder)}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}