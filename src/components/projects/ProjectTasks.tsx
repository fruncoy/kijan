import React, { useState } from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  assignedTo?: string;
  dueDate: string;
}

export function ProjectTasks({ projectId }: { projectId: string }) {
  const [tasks, setTasks] = useProjectData<Task[]>('tasks', []);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    dueDate: '',
  });

  const handleAddTask = () => {
    const task: Task = {
      id: crypto.randomUUID(),
      ...newTask as Omit<Task, 'id'>,
      status: 'todo',
    };
    setTasks([...tasks, task]);
    setIsAddingTask(false);
    setNewTask({ title: '', description: '', status: 'todo', dueDate: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center px-3 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>

      {isAddingTask && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:border-[#FF8001] focus:ring-[#FF8001]"
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:border-[#FF8001] focus:ring-[#FF8001]"
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:border-[#FF8001] focus:ring-[#FF8001]"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddingTask(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-[#FF8001] text-white rounded-lg hover:bg-[#FF8001]/90"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {['todo', 'in-progress', 'completed'].map((status) => (
          <div key={status} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 capitalize mb-4">{status}</h3>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    {task.dueDate && (
                      <p className="text-sm text-gray-500 mt-2">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}