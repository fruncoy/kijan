import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  DollarSign,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  projectId: string | undefined;
}

export function Sidebar({ isOpen, toggle, projectId }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: `/project/${projectId}/dashboard` },
    { icon: Briefcase, label: 'Project Management', path: `/project/${projectId}/projects` },
    { icon: Users, label: 'User Management', path: `/project/${projectId}/users` },
    { icon: Package, label: 'Inventory Management', path: `/project/${projectId}/inventory` },
    { icon: DollarSign, label: 'Finance Tracking', path: `/project/${projectId}/finance` },
    { icon: Users, label: 'Fundi Management', path: `/project/${projectId}/fundis` },
    { icon: Bell, label: 'Notifications', path: `/project/${projectId}/notifications` },
    { icon: Settings, label: 'Settings', path: `/project/${projectId}/settings` },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-20 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {isOpen && (
          <span className="text-xl font-bold text-[#FF8001]">Project Panel</span>
        )}
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-[#FF8001] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {isOpen && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}