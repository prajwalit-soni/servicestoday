"use client";

import { useEffect } from "react";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import GenericTable, { Column } from "../../components/GenericTable";
import useDataStore from "../../store/useDataStore";
import { UserRecord } from "../../lib/mockData";

const columns: Column<UserRecord>[] = [
  { field: "id", headerName: "ID", sortable: true, filterable: false, searchable: false, width: 70 },
  { field: "name", headerName: "Name", sortable: true, filterable: true, searchable: true },
  { field: "email", headerName: "Email", sortable: true, filterable: false, searchable: true },
  { field: "role", headerName: "Role", sortable: true, filterable: false, searchable: true },
  { field: "status", headerName: "Status", sortable: true, filterable: false, searchable: true },
  { field: "country", headerName: "Country", sortable: true, filterable: false, searchable: true },
];

export default function VendorTable() {
  const { users, fetchUsers, loading, error } = useDataStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Container sx={{ mt: 4, mb: 4, minHeight: "80vh" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Generic Table
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <GenericTable<UserRecord>
          data={users}
          columns={columns}
          defaultRowsPerPage={5}
          rowsPerPageOptions={[5, 10, 25]}
          onRowClick={(row) => console.log("row clicked", row)}
        />
      )}
    </Container>
  );
}
