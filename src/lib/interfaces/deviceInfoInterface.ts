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