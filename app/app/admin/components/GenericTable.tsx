"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Menu,
  FormGroup,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export type Column<T> = {
  field: keyof T | string;
  headerName: string;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  width?: number | string;
  renderCell?: (row: T) => React.ReactNode;
};

type Order = "asc" | "desc";

type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowClick?: (row: T) => void;
  emptyText?: string;
  enableGlobalSearch?: boolean;
};

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilized = array.map((el, index) => [el, index] as const);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((item) => item[0]);
}

function getComparator(order: Order, orderBy: string) {
  // ...rest of the component...
  return 0;
}

// ...rest of the component...

export default function GenericTable<T>() {
  return <div>Generic Table</div>;
}
