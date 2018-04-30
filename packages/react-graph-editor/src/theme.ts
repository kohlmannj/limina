export interface IScrollBarTheme {
  thumbClassName?: string;
  thumbColor?: string;
  thumbWidth?: number;
  trackClassName?: string;
  trackColor?: string;
  trackWidth?: number;
}

export const defaultTheme = {
  thumbColor: '#ccc',
  thumbWidth: 12,
  trackColor: '#333',
  trackWidth: 16,
};
