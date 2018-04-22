import { ILineProps } from '../components/Line';
import { PointTuple } from '../index.d';

export const testPoints: PointTuple[] = [[320, 320], [480, 0], [1280, 1160]];

export const testLines: ILineProps[] = [
  { label: 'fontSize', points: [[320, 12], [540, 16], [1280, 24]] },
  { label: 'width', points: [[320, 320], [540, 480], [1280, 1160]] },
  { label: 'height', points: [[320, 320], [540, 405], [1280, 652.5]] },
];
