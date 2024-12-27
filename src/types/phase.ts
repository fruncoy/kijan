export interface Phase {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  measurements?: {
    length: number;
    width: number;
    height: number;
    unit: 'meters' | 'feet';
  };
}

export interface PhaseFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
}