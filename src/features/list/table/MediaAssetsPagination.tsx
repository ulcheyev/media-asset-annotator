import type { Table } from "@tanstack/react-table";

export const MediaAssetsPagination = ({ table }: { table: Table<any> }) => (
    <div className="flex items-center justify-between">
    <span className="text-sm text-gray-600">
      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </span>

        <div className="flex gap-2">
            <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-50"
            >
                Prev
            </button>
            <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    </div>
);
