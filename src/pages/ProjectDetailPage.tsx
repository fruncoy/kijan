import React, { useState } from 'react';
import { Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import { ProjectOverview } from '../components/projects/ProjectOverview';
import { ProjectPhases } from '../components/projects/ProjectPhases';
import { ProjectGallery } from '../components/projects/ProjectGallery';
import { ProjectComments } from '../components/projects/ProjectComments';
import { ProjectTasks } from '../components/projects/ProjectTasks';

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/').pop() || 'overview');

  const tabs = [
    { id: 'overview', label: 'Overview', path: `overview` },
    { id: 'phases', label: 'Phases', path: `phases` },
    { id: 'gallery', label: 'Gallery', path: `gallery` },
    { id: 'comments', label: 'Comments', path: `comments` },
    { id: 'tasks', label: 'Tasks', path: `tasks` },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={`/projects/${projectId}/${tab.path}`}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-[#FF8001] text-[#FF8001]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<ProjectOverview projectId={projectId!} />} />
            <Route path="overview" element={<ProjectOverview projectId={projectId!} />} />
            <Route path="phases" element={<ProjectPhases projectId={projectId!} />} />
            <Route path="gallery" element={<ProjectGallery projectId={projectId!} />} />
            <Route path="comments" element={<ProjectComments projectId={projectId!} />} />
            <Route path="tasks" element={<ProjectTasks projectId={projectId!} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}