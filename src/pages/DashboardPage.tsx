import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Package, DollarSign, Briefcase, Bell, Wrench, Clock } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/storage';
import { userStorage } from '../utils/userStorage';
import { fundiStorage } from '../utils/fundiStorage';
import { financeStorage } from '../utils/financeStorage';
import { notificationStorage } from '../utils/notificationStorage';
import { inventoryStorage } from '../utils/inventoryStorage';

export function DashboardPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { setSelectedProjectId } = useAuth();
  const project = storage.getProjects().find(p => p.id === projectId);

  useEffect(() => {
    if (!projectId) {
      navigate('/projects');
      return;
    }

    if (!project) {
      navigate('/projects');
      return;
    }

    setSelectedProjectId(projectId);
  }, [projectId, project, navigate, setSelectedProjectId]);

  const stats = {
    users: userStorage.getUsers().length,
    fundis: fundiStorage.getFundis().length,
    inventory: inventoryStorage.getItems().length,
    finance: financeStorage.getSummary().totalBudget,
    projects: storage.getProjects().length,
    notifications: notificationStorage.getNotifications().filter(n => n.status === 'unread').length,
    pendingTasks: notificationStorage.getReminders().filter(r => r.status === 'pending').length,
  };

  if (!project) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-gray-600">{project.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={stats.projects}
          icon={Briefcase}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Users"
          value={stats.users}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Available Fundis"
          value={stats.fundis}
          icon={Wrench}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Inventory Items"
          value={stats.inventory}
          icon={Package}
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard
          title="Total Budget"
          value={`$${stats.finance.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Unread Notifications"
          value={stats.notifications}
          icon={Bell}
          trend={{ value: 2, isPositive: false }}
        />
        <StatsCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          icon={Clock}
          trend={{ value: 4, isPositive: false }}
        />
      </div>
    </div>
  );
}