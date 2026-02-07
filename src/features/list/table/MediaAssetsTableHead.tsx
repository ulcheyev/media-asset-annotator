import { flexRender, type HeaderGroup } from "@tanstack/react-table";

export const MediaAssetsTableHead = ({ headerGroups }: { headerGroups: HeaderGroup<any>[] }) => (
    <thead className="bg-gray-50">
    {headerGroups.map((hg) => (
        <tr key={hg.id}>
            {hg.headers.map((h) => {
                const canSort = h.column.getCanSort();
                const sortDir = h.column.getIsSorted();

                return (
                    <th
                        key={h.id}
                        onClick={canSort ? h.column.getToggleSortingHandler() : undefined}
                        className={`
                px-4 py-3 text-left font-medium text-gray-700
                border-b border-gray-200
                select-none
                ${canSort ? "cursor-pointer hover:bg-gray-100" : ""}
              `}
                    >
                        <div className="flex items-center gap-2">
                            {flexRender(
                                h.column.columnDef.header,
                                h.getContext()
                            )}

                            {/* Sort indicator */}
                            {sortDir === "asc" && <span>▲</span>}
                            {sortDir === "desc" && <span>▼</span>}
                        </div>
                    </th>
                );
            })}
        </tr>
    ))}
    </thead>
);
