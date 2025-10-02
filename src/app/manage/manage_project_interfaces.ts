export interface ProjectData {
  id: string;
  name: string;
  description: string;
  url: string;
  apiKey: string;
  uniqueVisitors: number;
  totalVisits: number;
  topRegion: string;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  ipAddress: string;
  time: string;
  visits: number;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  region: string;
}