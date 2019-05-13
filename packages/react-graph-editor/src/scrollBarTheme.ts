export interface ScrollBarTheme {
  thumbClassName?: string;
  thumbColor?: string;
  thumbWidth?: number;
  trackClassName?: string;
  trackColor?: string;
  trackWidth?: number;
}

export const defaults = {
  thumbColor: '#ccc',
  thumbWidth: 12,
  trackColor: '#333',
  trackWidth: 16,
};
