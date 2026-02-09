import type { Row } from '@tanstack/react-table';
import { MediaAssetsTableCell } from './MediaAssetsTableCell';
import type { MediaAsset } from '../../../types/intern/media.ts';

type Props = {
  row: Row<MediaAsset>;
  onOpen: (asset: MediaAsset) => void;
};

export const MediaAssetsTableRow = ({ row, onOpen }: Props) => (
  <tr
    onClick={() => onOpen(row.original)}
    className="
      border-b border-gray-100
      hover:bg-gray-50 transition-colors cursor-pointer
    "
  >
    {row.getVisibleCells().map((cell) => (
      <MediaAssetsTableCell key={cell.id} cell={cell} />
    ))}
  </tr>
);
