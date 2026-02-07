import { flexRender, type Cell } from "@tanstack/react-table";

export const MediaAssetsTableCell = ({ cell }: { cell: Cell<any, unknown> }) => (
    <td className="px-4 py-3 text-gray-800 align-middle">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
);
