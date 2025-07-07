"use client";

import { useAsync } from "@/utils/useAsync";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchAllMessagesAction } from "../lib/actions/fetchMessages.action";

export default function DataTable({ accountId }: { accountId?: string }) {
  const Columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "appId",
      headerName: "App Name",
      renderCell: (params) => <>{params.row.apps.name}</>,
    },
    {
      field: "sentTo",
      headerName: "Sent To",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "sentAt",
      headerName: "Sent At",
    },
    {
      field: "deliveredAt",
      headerName: "Delivered At",
    },
  ];

  const { data, loading } = useAsync(fetchAllMessagesAction, true, [accountId]);

  return (
    <div className="w-full overflow-x-scroll">
      <DataGrid rows={data?.data ?? []} columns={Columns} loading={loading} />
    </div>
  );
}
