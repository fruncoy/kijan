export interface SystemSettings {
  general: {
    systemName: string;
    logo: string | null;
    favicon: string | null;
    timezone: string;
    language: string;
  };
  notifications: {
    emailEnabled: boolean;
    notificationPreferences: {
      overdueTask: boolean;
      paymentReminder: boolean;
      inventoryAlert: boolean;
      projectUpdate: boolean;
    };
  };
  access: {
    selfRegistration: boolean;
    defaultPermissions: {
      [key: string]: {
        projects: boolean;
        users: boolean;
        inventory: boolean;
        finance: boolean;
        reports: boolean;
      };
    };
  };
  security: {
    sessionTimeout: number;
    twoFactorEnabled: boolean;
  };
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}