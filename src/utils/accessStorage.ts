import { AccessRequest, ProjectAccess } from '../types/access';

const ACCESS_REQUESTS_KEY = 'access_requests';
const PROJECT_ACCESS_KEY = 'project_access';

export const accessStorage = {
  getAccessRequests: (): AccessRequest[] => {
    const requests = localStorage.getItem(ACCESS_REQUESTS_KEY);
    return requests ? JSON.parse(requests) : [];
  },

  saveAccessRequest: (request: AccessRequest) => {
    const requests = accessStorage.getAccessRequests();
    localStorage.setItem(ACCESS_REQUESTS_KEY, JSON.stringify([...requests, request]));
  },

  updateAccessRequest: (requestId: string, status: AccessRequest['status']) => {
    const requests = accessStorage.getAccessRequests();
    const updatedRequests = requests.map(request =>
      request.id === requestId
        ? { ...request, status, updatedAt: new Date().toISOString() }
        : request
    );
    localStorage.setItem(ACCESS_REQUESTS_KEY, JSON.stringify(updatedRequests));
  },

  getProjectAccess: (projectId: string): ProjectAccess | null => {
    const access = localStorage.getItem(`${PROJECT_ACCESS_KEY}_${projectId}`);
    return access ? JSON.parse(access) : null;
  },

  updateProjectAccess: (projectId: string, access: ProjectAccess) => {
    localStorage.setItem(`${PROJECT_ACCESS_KEY}_${projectId}`, JSON.stringify(access));
  },

  toggleUserAccess: (userId: string, projectId: string, active: boolean) => {
    const access = accessStorage.getProjectAccess(projectId) || {
      projectId,
      userIds: [],
      status: {},
    };

    if (active) {
      access.userIds = [...new Set([...access.userIds, userId])];
      access.status = { ...access.status, [userId]: 'active' };
    } else {
      access.status = { ...access.status, [userId]: 'suspended' };
    }

    accessStorage.updateProjectAccess(projectId, access);
  },

  getUserProjectAccess: (userId: string, projectId: string): boolean => {
    const access = accessStorage.getProjectAccess(projectId);
    return access?.status?.[userId] === 'active';
  },
};