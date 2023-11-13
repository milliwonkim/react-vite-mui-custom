import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import {
  Table as TanTable,
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number | string;
  date: string;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "한글",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: "50",
    date: "2023-11-13",
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
    date: "2023-11-15",
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    date: "2023-11-14",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    id: "firstName",
    header: "firstName",
    enableColumnFilter: true,
  }),
  columnHelper.accessor("lastName", {
    id: "lastName",
    header: "lastName",
    enableColumnFilter: true,
    filterFn: "includesString",
  }),

  columnHelper.accessor("age", {
    id: "age",
    header: "age",
    enableColumnFilter: true,
    filterFn: "includesString",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("visits", {
    id: "visits",
    header: "visits",
    enableColumnFilter: true,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "status",
    enableColumnFilter: true,
    filterFn: "includesString",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("progress", {
    id: "progress",
    header: "progress",
    enableColumnFilter: true,

    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    id: "date",
    header: "date",
    enableColumnFilter: true,

    filterFn: "getDate",

    cell: (info) => info.getValue(),
  }),
];

const testFilter: FilterFn<any> = (
  row,
  columnId: string,
  filterValue: unknown
) => {
  console.log(columnId, filterValue);
  return true;
};

const getDate = (a, b, c) => {
  console.log("//////", a.getValue(b), b, c.target.value);
  return a.getValue(b) === c.target.value;
};

export default function App() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [columnFilters, setColumnFilters] = React.useState<any>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    filterFns: {
      getDate,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  console.log("---", table);

  return (
    <TableContainer className="p-2">
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell key={header.id}>
                    {header.column.getCanFilter() ? (
                      <Filter column={header.column} table={table} />
                    ) : null}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                console.log("cell", cell.renderValue());
                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
      <div className="h-4" />
    </TableContainer>
  );
}

function Filter({
  column,
}: {
  column: Column<any, unknown>;
  table: TanTable<any>;
}) {
  console.log("////", column.getFilterValue());

  const columnFilterValue = column.getFilterValue();

  if (column.id === "date") {
    console.log("columnFilterValue", columnFilterValue);
    return (
      <input
        type="date"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => {
          console.log("!!!!!", value);
          column.setFilterValue(value);
        }}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
    );
  }

  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <TextField
      {...props}
      size="small"
      color="primary"
      variant="outlined"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
