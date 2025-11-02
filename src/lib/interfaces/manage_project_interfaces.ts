import { LogActivity } from "./deviceInfoInterface";

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  url: string;
  apiKey: string;
  uniqueVisitors: number;
  totalVisits: number;
  topRegion: string;
  recentActivity: LogActivity[];
}

export interface ActivityItem {
  id: string;
  ipAddress: string;
  time: string;
  visits: number;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  region: string;
}

export interface recentActivity{
  ip: string;
  time: string;
  visits: number;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  region: string;
}