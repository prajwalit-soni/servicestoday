"use client";

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  TextField,
  InputAdornment,
  TablePagination,
  Dialog,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export interface Column {
  id: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (row: any) => React.ReactNode;
}

interface CustomDataTableProps {
  data: any[];
  columns: Column[];
  searchFields?: string[];
  searchPlaceholder?: string;
  addForm?: (onClose: () => void) => React.ReactNode;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  actions?: ("view" | "edit" | "delete")[];
  toolbarActions?: React.ReactNode;
  minWidth?: number | string;
  loading?: boolean;
  rowIdField?: string;
  onAddModalClose?: () => void;
}

export default function CustomDataTable({
  data = [],
  columns = [],
  searchFields,
  searchPlaceholder = "Search...",
  addForm,
  onView,
  onEdit,
  onDelete,
  actions = [],
  toolbarActions,
  minWidth = 800,
  loading = false,
  rowIdField = "id",
  onAddModalClose,
}: CustomDataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Helper to resolve nested fields (e.g., "owner.name")
  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  // Dynamic filtering
  const filteredRows = data.filter((row) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const fieldsToSearch = searchFields || Object.keys(row);
    return fieldsToSearch.some((field) => {
      const val = getNestedValue(row, field);
      return val && String(val).toLowerCase().includes(query);
    });
  });

  // Dynamic sorting (updated_at/created_at/id descending)
  const sortedRows = React.useMemo(() => {
    return [...filteredRows].sort((a: any, b: any) => {
      const getCompareValue = (item: any) => {
        if (item.updated_at) return new Date(item.updated_at).getTime();
        if (item.created_at) return new Date(item.created_at).getTime();
        if (typeof item.id === 'number') return item.id;
        return 0;
      };
      return getCompareValue(b) - getCompareValue(a);
    });
  }, [filteredRows]);

  const visibleRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const activePageIds = visibleRows.map((row) => String(row[rowIdField]));
      setSelectedIds((prev) => Array.from(new Set([...prev, ...activePageIds])));
    } else {
      const activePageIds = visibleRows.map((row) => String(row[rowIdField]));
      setSelectedIds((prev) => prev.filter((id) => !activePageIds.includes(id)));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const areAllOnPageSelected =
    visibleRows.length > 0 &&
    visibleRows.every((row) => selectedIds.includes(String(row[rowIdField])));

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #EAEAEA",
        p: { xs: 2, md: 3 },
        overflow: "hidden",
      }}
    >
      {/* Top Search Toolbar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0);
          }}
          placeholder={searchPlaceholder}
          size="small"
          sx={{
            width: { xs: "100%", sm: 280 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              bgcolor: "#FAFAFA",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        {(addForm || toolbarActions) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "stretch", sm: "flex-end" },
              gap: 1.5,
              width: { xs: "100%", sm: "auto" },
              "& > button": {
                width: { xs: "100%", sm: "auto" },
              },
              "& > a": {
                width: { xs: "100%", sm: "auto" },
              },
            }}
          >
            {toolbarActions}
            {addForm && (
              <IconButton
                onClick={() => setIsAddModalOpen(true)}
                sx={{
                  bgcolor: "#635BFF",
                  color: "#FFFFFF",
                  borderRadius: "50%",
                  "&:hover": { bgcolor: "#4F46E5" },
                }}
              >
                <AddIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>

      {/* Main Responsive Table Canvas */}
      <TableContainer sx={{ overflowX: "auto", width: "100%" }}>
        <Table sx={{ minWidth: minWidth, tableLayout: "fixed" }}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  borderBottom: "1px solid #EAEAEA",
                  pb: 2,
                  color: "#212121",
                  fontWeight: 600,
                  fontSize: "14px",
                },
              }}
            >
              <TableCell style={{ width: "50px" }}>
                <Checkbox
                  size="small"
                  checked={areAllOnPageSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  style={{ width: col.width }}
                  align={col.align || "left"}
                >
                  {col.label}
                </TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell style={{ width: "110px" }} align="center">
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions.length > 0 ? 2 : 1)}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <CircularProgress size={32} sx={{ color: "#635BFF" }} />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {visibleRows.map((row) => {
                  const rowIdStr = String(row[rowIdField]);
                  return (
                    <TableRow
                      key={rowIdStr}
                      hover
                      selected={selectedIds.includes(rowIdStr)}
                      sx={{
                        "& td": {
                          borderBottom: "1px solid #F5F5F5",
                          py: 1.5,
                          fontSize: "13.5px",
                        },
                      }}
                    >
                      <TableCell>
                        <Checkbox
                          size="small"
                          checked={selectedIds.includes(rowIdStr)}
                          onChange={() => handleSelectRow(rowIdStr)}
                        />
                      </TableCell>
                      {columns.map((col) => (
                        <TableCell key={col.id} align={col.align || "left"}>
                          {col.render ? col.render(row) : getNestedValue(row, col.id)}
                        </TableCell>
                      ))}
                      {actions && actions.length > 0 && (
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 0.5,
                            }}
                          >
                            {actions.includes("view") && (
                              <IconButton
                                onClick={() => onView?.(rowIdStr)}
                                size="small"
                                sx={{ color: "#635BFF" }}
                              >
                                <VisibilityOutlinedIcon fontSize="small" />
                              </IconButton>
                            )}
                            {actions.includes("edit") && (
                              <IconButton
                                onClick={() => onEdit?.(rowIdStr)}
                                size="small"
                                sx={{ color: "#9C27B0" }}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </IconButton>
                            )}
                            {actions.includes("delete") && (
                              <IconButton
                                onClick={() => onDelete?.(rowIdStr)}
                                size="small"
                                sx={{ color: "#F44336" }}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {visibleRows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (actions.length > 0 ? 2 : 1)}
                      align="center"
                      sx={{ py: 6, color: "#9E9E9E" }}
                    >
                      No records found.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Footer Controls */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25, 50]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        sx={{ borderTop: "1px solid #EAEAEA", mt: 1 }}
      />

      {/* Addition Modal Box */}
      {addForm && (
        <Dialog
          open={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            if (onAddModalClose) onAddModalClose();
          }}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "20px",
              p: { xs: 2, sm: 4 },
              boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            },
          }}
        >
          {addForm(() => {
            setIsAddModalOpen(false);
            if (onAddModalClose) onAddModalClose();
          })}
        </Dialog>
      )}
    </Box>
  );
}
