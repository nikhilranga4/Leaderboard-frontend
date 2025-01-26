export interface User {
  _id: string;
  name: string;
  totalPoints: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface HistoryEntry {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  points: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}