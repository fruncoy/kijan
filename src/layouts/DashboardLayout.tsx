import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { storage } from '../utils/storage';

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify project exists and user has access
    const project = storage.getProjects().find(p => p.id === projectId);
    if (!project) {
      navigate('/');
      return;
    }

    // Redirect to dashboard if no sub-route selected
    if (window.location.pathname === `/project/${projectId}`) {
      navigate(`/project/${projectId}/dashboard`);
    }
  }, [projectId, navigate]);

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} projectId={projectId} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}