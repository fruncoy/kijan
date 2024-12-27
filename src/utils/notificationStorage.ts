import { Notification, Reminder, ReminderFormData } from '../types/notification';

const NOTIFICATIONS_KEY = 'notifications';
const REMINDERS_KEY = 'reminders';

export const notificationStorage = {
  getNotifications: (): Notification[] => {
    const notifications = localStorage.getItem(NOTIFICATIONS_KEY);
    return notifications ? JSON.parse(notifications) : [];
  },

  addNotification: (title: string, message: string, type: Notification['type']) => {
    const notifications = notificationStorage.getNotifications();
    const newNotification: Notification = {
      id: crypto.randomUUID(),
      title,
      message,
      type,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([newNotification, ...notifications]));
    return newNotification;
  },

  markAsRead: (notificationId: string) => {
    const notifications = notificationStorage.getNotifications();
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, status: 'read' as const }
        : notification
    );
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications));
  },

  getReminders: (): Reminder[] => {
    const reminders = localStorage.getItem(REMINDERS_KEY);
    return reminders ? JSON.parse(reminders) : [];
  },

  saveReminder: (formData: ReminderFormData): Reminder => {
    const reminders = notificationStorage.getReminders();
    const newReminder: Reminder = {
      id: crypto.randomUUID(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(REMINDERS_KEY, JSON.stringify([...reminders, newReminder]));
    return newReminder;
  },

  updateReminder: (updatedReminder: Reminder) => {
    const reminders = notificationStorage.getReminders();
    const updatedReminders = reminders.map(reminder => 
      reminder.id === updatedReminder.id ? updatedReminder : reminder
    );
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(updatedReminders));
  },

  deleteReminder: (reminderId: string) => {
    const reminders = notificationStorage.getReminders();
    localStorage.setItem(
      REMINDERS_KEY,
      JSON.stringify(reminders.filter(reminder => reminder.id !== reminderId))
    );
  },

  getOverdueReminders: (): Reminder[] => {
    const today = new Date();
    return notificationStorage.getReminders().filter(
      reminder => 
        reminder.status === 'pending' && 
        new Date(reminder.dueDate) <= today
    );
  },
};