import React from "react";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PencilIcon from "@/assets/pencilIcon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export type CourseType = {
  Course_Number: string;
  Course_Title: string;
  Last_Approved_Date: string;
  Last_Edit_Date: string;
  Long_Course_Title: string;
  Short_Course_Title: string;
  Effective_Term: string;
  Comments: string;
  Reviewer_Comments: string;
  Status_Head: string;
  University_general_education: string;
  CCAS_general_education: string;
  Honors: string;
  Elliott_School_of_International_Affairs: string;
};

export const createColumns = (
  router: ReturnType<typeof useRouter>
): ColumnDef<CourseType>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Course_Number",
    header: "Course Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Course_Number")}</div>
    ),
  },
  {
    accessorKey: "Course_Title",
    header: "Course Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Course_Title")}</div>
    ),
  },
  {
    accessorKey: "Last_Approved_Date",
    header: "Last Approved Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("Last_Approved_Date");
      const date = new Date(dateValue as string);
      const formattedDate = isNaN(date.getTime())
        ? "Invalid Date"
        : date.toISOString().split("T")[0];
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "Last_Edit_Date",
    header: "Last Edit Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("Last_Edit_Date");
      const date = new Date(dateValue as string);
      const formattedDate = isNaN(date.getTime())
        ? "Invalid Date"
        : date.toISOString().split("T")[0];
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "Long_Course_Title",
    header: "Long Course Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Long_Course_Title")}</div>
    ),
  },
  {
    accessorKey: "Short_Course_Title",
    header: "Short Course Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Short_Course_Title")}</div>
    ),
  },
  {
    accessorKey: "Effective_Term",
    header: "Effective Term",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Effective_Term")}</div>
    ),
  },
  {
    accessorKey: "Comments",
    header: "Comments",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Comments")}</div>
    ),
  },
  {
    accessorKey: "Reviewer_Comments",
    header: "Reviewer Comments",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Reviewer_Comments")}</div>
    ),
  },
  {
    accessorKey: "Status_Head",
    header: "Status Head",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Status_Head")}</div>
    ),
  },
  {
    accessorKey: "University_general_education",
    header: "University General Education",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("University_general_education")}
      </div>
    ),
  },
  {
    accessorKey: "CCAS_general_education",
    header: "CCAS General Education",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("CCAS_general_education")}</div>
    ),
  },
  {
    accessorKey: "Honors",
    header: "Honors",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Honors")}</div>
    ),
  },
  {
    accessorKey: "Elliott_School_of_International_Affairs",
    header: "Elliott School of International Affairs",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("Elliott_School_of_International_Affairs")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            router.push(
              `/admin/upload/edit-course-approval/${course.Course_Number}`
            );
          }}
          className="flex p-4 items-center gap-1 bg-blue-600  text-white hover:bg-blue-700 cursor-pointer hover:text-white"
        >
          <Image
            src={PencilIcon}
            alt="Edit"
            width={16}
            height={16}
            className="w-4 h-4 brightness-0 invert"
          />
          <span>Edit</span>
        </Button>
      );
    },
  },
];

const CourseTable = ({ courseData }: { courseData: CourseType[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();

  const columns = createColumns(router);

  const table = useReactTable({
    data: courseData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table className="table-auto w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-4 py-2">
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
