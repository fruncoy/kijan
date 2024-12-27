import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { projectStorage } from '../utils/projectStorage';

export function useProjectData<T>(key: string, defaultValue: T) {
  const { selectedProjectId } = useAuth();
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    if (selectedProjectId) {
      const storedData = projectStorage.getProjectData(selectedProjectId, key);
      setData(storedData || defaultValue);
    }
  }, [selectedProjectId, key]);

  const updateData = (newData: T) => {
    if (selectedProjectId) {
      projectStorage.setProjectData(selectedProjectId, key, newData);
      setData(newData);
    }
  };

  return [data, updateData] as const;
}