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
  return (a: Record<string, unknown>, b: Record<string, unknown>) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue == null || bValue == null) {
      if (aValue == null && bValue == null) return 0;
      return aValue == null ? (order === "asc" ? -1 : 1) : (order === "asc" ? 1 : -1);
    }

    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();

    if (aString < bString) return order === "asc" ? -1 : 1;
    if (aString > bString) return order === "asc" ? 1 : -1;
    return 0;
  };
}

export default function GenericTable<T extends Record<string, unknown>>({
  data,
  columns,
  defaultRowsPerPage = 5,
  rowsPerPageOptions = [5, 10, 25],
  onRowClick,
  emptyText = "No records found",
  enableGlobalSearch = true,
}: GenericTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(columns[0]?.field as string || "");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [columnCheckboxFilters, setColumnCheckboxFilters] = useState<Record<string, Set<string>>>({});
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<Record<string, HTMLElement | null>>({});

  const filteredData = useMemo(() => {
    const global = searchTerm.trim().toLowerCase();

    return data.filter((row) => {
      if (enableGlobalSearch && global) {
        const searchMatch = columns.some((column) => {
          if (column.searchable === false) return false;
          const value = (row as Record<string, unknown>)[column.field as string];
          return value != null && String(value).toLowerCase().includes(global);
        });
        if (!searchMatch) return false;
      }

      const textFilterMatch = Object.entries(columnFilters).every(([fieldKey, value]) => {
        if (!value) return true;
        const rowValue = (row as Record<string, unknown>)[fieldKey];
        return rowValue != null && String(rowValue).toLowerCase().includes(value.toLowerCase());
      });

      if (!textFilterMatch) return false;

      const checkboxFilterMatch = Object.entries(columnCheckboxFilters).every(([fieldKey, selectedValues]) => {
        if (selectedValues.size === 0) return true;
        const rowValue = (row as Record<string, unknown>)[fieldKey];
        return rowValue != null && selectedValues.has(String(rowValue));
      });

      return checkboxFilterMatch;
    });
  }, [data, searchTerm, columns, columnFilters, columnCheckboxFilters, enableGlobalSearch]);

  const sortedData = useMemo(() => {
    if (!orderBy) return filteredData;
    return stableSort(filteredData, getComparator(order, orderBy));
  }, [filteredData, order, orderBy]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  const handleRequestSort = (field: string) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  const handleCheckboxChange = (fieldKey: string, value: string) => {
    setColumnCheckboxFilters((prev) => {
      const updated = new Set(prev[fieldKey] || []);
      if (updated.has(value)) {
        updated.delete(value);
      } else {
        updated.add(value);
      }
      return { ...prev, [fieldKey]: updated };
    });
    setPage(0);
  };

  const handleOpenColumnMenu = (fieldKey: string, anchorEl: HTMLElement) => {
    setColumnMenuAnchor((prev) => ({ ...prev, [fieldKey]: anchorEl }));
  };

  const handleCloseColumnMenu = (fieldKey: string) => {
    setColumnMenuAnchor((prev) => ({ ...prev, [fieldKey]: null }));
  };

  const handleClearColumnFilter = (fieldKey: string) => {
    setColumnFilters((prev) => ({ ...prev, [fieldKey]: "" }));
    setColumnCheckboxFilters((prev) => ({ ...prev, [fieldKey]: new Set() }));
    setPage(0);
  };

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setColumnFilters({});
    setColumnCheckboxFilters({});
    setPage(0);
  };

  const getUniqueValues = (fieldKey: string): string[] => {
    const values = new Set<string>();
    data.forEach((row) => {
      const value = (row as Record<string, unknown>)[fieldKey];
      if (value != null) {
        values.add(String(value));
      }
    });
    return Array.from(values).sort();
  };

  const hasActiveFilters =
    !!searchTerm ||
    Object.keys(columnFilters).some((k) => columnFilters[k]) ||
    Object.keys(columnCheckboxFilters).some((k) => columnCheckboxFilters[k].size > 0);

  return (
    <Paper elevation={2} sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ p: 2 }}>
        {enableGlobalSearch && (
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h6">Search & Filter</Typography>
            <TextField
              size="small"
              sx={{ minWidth: 240 }}
              placeholder="Search all columns"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
            />
          </Stack>
        )}

        {hasActiveFilters && (
          <Box sx={{ mb: 2 }}>
            <Button size="small" variant="outlined" color="secondary" onClick={handleClearAllFilters}>
              Clear All Filters
            </Button>
          </Box>
        )}
      </Box>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                const fieldKey = String(column.field);
                const activeCheckboxCount = columnCheckboxFilters[fieldKey]?.size || 0;
                const hasTextFilter = !!columnFilters[fieldKey];
                const anchorEl = columnMenuAnchor[fieldKey];
                const isMenuOpen = Boolean(anchorEl);
                const uniqueValues = getUniqueValues(fieldKey);

                return (
                  <TableCell key={fieldKey} sx={{ width: column.width }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {column.sortable ? (
                        <TableSortLabel
                          active={orderBy === fieldKey}
                          direction={orderBy === fieldKey ? order : "asc"}
                          onClick={() => handleRequestSort(fieldKey)}
                        >
                          {column.headerName}
                        </TableSortLabel>
                      ) : (
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {column.headerName}
                        </Typography>
                      )}

                      {(column.filterable || column.searchable) && (
                        <IconButton
                          size="small"
                          aria-label={`Open filter menu for ${column.headerName}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenColumnMenu(fieldKey, event.currentTarget);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      )}

                      {(activeCheckboxCount > 0 || hasTextFilter) && (
                        <Typography variant="caption" color="text.secondary">
                          {activeCheckboxCount > 0 ? `${activeCheckboxCount}` : "1"}
                        </Typography>
                      )}

                      <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={() => handleCloseColumnMenu(fieldKey)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                      >
                        <Box sx={{ width: 280, p: 1 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            {column.headerName} Filters
                          </Typography>

                          {column.filterable && (
                            <TextField
                              size="small"
                              fullWidth
                              label="Text filter"
                              value={columnFilters[fieldKey] || ""}
                              onChange={(e) => {
                                setColumnFilters((prev) => ({ ...prev, [fieldKey]: e.target.value }));
                                setPage(0);
                              }}
                            />
                          )}

                          <Divider sx={{ my: 1 }} />

                          <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
                            Select values
                          </Typography>

                          <FormGroup>
                            {uniqueValues.length > 0 ? (
                              uniqueValues.map((value) => (
                                <FormControlLabel
                                  key={`${fieldKey}-${value}`}
                                  control={
                                    <Checkbox
                                      size="small"
                                      checked={columnCheckboxFilters[fieldKey]?.has(value) || false}
                                      onChange={() => handleCheckboxChange(fieldKey, value)}
                                    />
                                  }
                                  label={value}
                                />
                              ))
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                No values
                              </Typography>
                            )}
                          </FormGroup>

                          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}>
                            <Button
                              size="small"
                              onClick={() => {
                                handleClearColumnFilter(fieldKey);
                                handleCloseColumnMenu(fieldKey);
                              }}
                            >
                              Clear
                            </Button>
                            <Button size="small" onClick={() => handleCloseColumnMenu(fieldKey)}>
                              Close
                            </Button>
                          </Box>
                        </Box>
                      </Menu>
                    </Stack>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow
                  hover
                  key={((row as Record<string, unknown>).id as string | number) ?? rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  sx={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${String(column.field)}`}>
                      {column.renderCell
                        ? column.renderCell(row)
                        : String((row as Record<string, unknown>)[column.field as string] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={sortedData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Paper>
  );
}
