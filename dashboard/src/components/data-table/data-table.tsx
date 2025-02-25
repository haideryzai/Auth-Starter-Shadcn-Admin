import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@components/ui/context-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import DataTableLoader from "./data-table-loader";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  manualPagination?: boolean;
  paginationState?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
  rowCount?: number;
  loading?: boolean;
  onRowDoubleClick?: (row: TData) => void;
  getMenuItems: (row: TData) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  manualPagination = false,
  paginationState,
  onPaginationChange,
  rowCount,
  loading = false,
  onRowDoubleClick,
  getMenuItems,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: loading ? [] : data,
    columns: columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: paginationState,
    },
    enableRowSelection: true,
    manualPagination: manualPagination,
    rowCount: rowCount,
    onPaginationChange: onPaginationChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      {loading ? (
        <DataTableLoader
          table={table}
          rowCount={paginationState?.pageSize as number}
        />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <ContextMenu key={row.id}>
                    <ContextMenuTrigger asChild>
                      <TableRow
                        data-state={row.getIsSelected() && "selected"}
                        onDoubleClick={() => onRowDoubleClick?.(row.original)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      {getMenuItems(row.original)}
                    </ContextMenuContent>
                  </ContextMenu>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {manualPagination && <DataTablePagination table={table} />}
    </div>
  );
}
