import { User, UserFormData } from '../types/user';
import { notificationStorage } from './notificationStorage';

const USERS_KEY = 'users';

export const userStorage = {
  getUsers: (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (formData: UserFormData): User => {
    const users = userStorage.getUsers();
    if (users.some(user => user.email === formData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    notificationStorage.addNotification(
      'User Created',
      `${newUser.name} has been added as ${newUser.role}`,
      'task'
    );
    return newUser;
  },

  updateUser: (userId: string, formData: UserFormData): User => {
    const users = userStorage.getUsers();
    const updatedUser: User = {
      ...users.find(u => u.id === userId)!,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users.map(user => user.id === userId ? updatedUser : user))
    );

    notificationStorage.addNotification(
      'User Updated',
      `${updatedUser.name}'s profile has been updated`,
      'task'
    );
    return updatedUser;
  },

  deleteUser: (userId: string) => {
    const users = userStorage.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users.filter(u => u.id !== userId))
      );
      notificationStorage.addNotification(
        'User Deleted',
        `${user.name} has been removed from the system`,
        'task'
      );
    }
  },

  resetPassword: (userId: string, newPassword: string) => {
    const users = userStorage.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      // In a real app, hash the password before storing
      notificationStorage.addNotification(
        'Password Reset',
        `Password has been reset for ${user.name}`,
        'task'
      );
    }
  },
};