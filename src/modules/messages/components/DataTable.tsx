"use client";

import { useAsync } from "@/utils/useAsync";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchAllMessagesAction } from "../lib/actions/fetchMessages.action";
import { roles } from "@/prisma/client";
import fetchMessagesAdminAction from "@/modules/admin/lib/actions/fetch-messages-admin.actions";
import { Chip } from "@mui/material";

export default function DataTable({
  accountId,
  role,
}: {
  accountId?: string;
  role: roles;
}) {
  const Columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "appId",
      headerName: "App Name",
      renderCell: (params) => <>{params.row.apps.name}</>,
      width: 200,
    },
    {
      field: "sentTo",
      headerName: "Sent To",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return (
          <Chip
            label={String(params.row.status).toUpperCase()}
            color={params.row.status === "failed" ? "error" : "success"}
          />
        );
      },
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
    },
    {
      field: "sentAt",
      headerName: "Sent At",
      width: 200,
    },
  ];

  const { data, loading } = useAsync(
    role === "admin" ? fetchMessagesAdminAction : fetchAllMessagesAction,
    true,
    [accountId]
  );

  return (
    <div className="w-full overflow-x-scroll">
      <DataGrid
        rows={data ?? []}
        columns={Columns}
        loading={loading}
        sx={{
          ".MuiDataGrid-columnHeader": {
            fontSize: "0.8rem",
            fontWeight: 900,
            backgroundColor: "lightgray",
          },
        }}
      />
    </div>
  );
}
