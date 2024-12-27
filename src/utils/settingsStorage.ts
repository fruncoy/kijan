import { SystemSettings, AuditLog } from '../types/settings';

const SETTINGS_KEY = 'system_settings';
const AUDIT_LOGS_KEY = 'audit_logs';

const defaultSettings: SystemSettings = {
  general: {
    systemName: 'KIJANA',
    logo: null,
    favicon: null,
    timezone: 'Africa/Nairobi',
    language: 'en',
  },
  notifications: {
    emailEnabled: false,
    notificationPreferences: {
      overdueTask: true,
      paymentReminder: true,
      inventoryAlert: true,
      projectUpdate: true,
    },
  },
  access: {
    selfRegistration: false,
    defaultPermissions: {
      'Site Manager': {
        projects: true,
        users: false,
        inventory: true,
        finance: false,
        reports: true,
      },
      'Project Manager': {
        projects: true,
        users: true,
        inventory: true,
        finance: true,
        reports: true,
      },
    },
  },
  security: {
    sessionTimeout: 30, // minutes
    twoFactorEnabled: false,
  },
};

export const settingsStorage = {
  getSettings: (): SystemSettings => {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : defaultSettings;
  },

  updateSettings: (settings: SystemSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  exportData: () => {
    const data = {
      settings: settingsStorage.getSettings(),
      users: localStorage.getItem('users'),
      projects: localStorage.getItem('projects'),
      fundis: localStorage.getItem('fundis'),
      inventory: localStorage.getItem('inventory'),
      finance: localStorage.getItem('finance_entries'),
    };
    return JSON.stringify(data);
  },

  importData: (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      if (data.settings) localStorage.setItem(SETTINGS_KEY, JSON.stringify(data.settings));
      if (data.users) localStorage.setItem('users', data.users);
      if (data.projects) localStorage.setItem('projects', data.projects);
      if (data.fundis) localStorage.setItem('fundis', data.fundis);
      if (data.inventory) localStorage.setItem('inventory', data.inventory);
      if (data.finance) localStorage.setItem('finance_entries', data.finance);
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  },

  getLogs: (): AuditLog[] => {
    const logs = localStorage.getItem(AUDIT_LOGS_KEY);
    return logs ? JSON.parse(logs) : [];
  },

  addLog: (userId: string, userName: string, action: string, details: string) => {
    const logs = settingsStorage.getLogs();
    const newLog: AuditLog = {
      id: crypto.randomUUID(),
      userId,
      userName,
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(logs.slice(0, 1000))); // Keep last 1000 logs
    return newLog;
  },
};