export interface DeviceInfoInterface {
    userAgent: string;
  browser: {
    name?: string;
    version?: string;
  };
  device: {
    type?: string;  // 'mobile', 'tablet', 'desktop', etc.
    vendor?: string; // 'Samsung', 'Apple', 'Xiaomi'
    model?: string;  // 'SM-F936B', 'iPhone', etc.
  };
  os: {
    name?: string;   // 'Android', 'iOS', 'Windows'
    version?: string;
  };
  cpu?: {
    architecture?: string;
  };
}

export interface DeviceInfo {
  brand?: string;
  model?: string;
  platform?: string;
  platformVersion?: string;
}

export interface LogActivity {
  ip: string;
  time: string;
  device: string;
  region: string;
  interactionID: string;
  additionalDeviceInfo?: string;
  userAgent: string;
  referrerUrl: string;
  cookies: string;
  device_id : string;
  page_route : string;
  event_name : string;
}
export interface LogActivityStaticsInterface {
  uniqueVisitors: string;
  totalVisits: string;
}
