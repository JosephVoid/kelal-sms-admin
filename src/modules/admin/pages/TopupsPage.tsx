"use client";
import { useAsync } from "@/utils/useAsync";
import fetchTopupsAdminAction from "../lib/actions/fetch-topups-admin.action";
import AdminDataTable from "../components/AdminDataTable";
import { GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";
import { FaCheck } from "react-icons/fa";
import { approveDenyTopupAction } from "../lib/actions/approve-deny-topup.action";
import { topupstatus } from "@/prisma/client";
import { useEffect } from "react";

export default function TopupsPage() {
  const { data, loading } = useAsync(fetchTopupsAdminAction, true, []);

  const overideColumns: GridColDef[] = [
    {
      field: "status",
      headerName: "status",
      type: "singleSelect",
      editable: true,
      valueOptions: [
        { label: "APPROVED", value: "APPROVED" },
        { label: "DENIED", value: "DENIED" },
        { label: "REQUESTED", value: "REQUEST" },
      ],
    },
  ];

  const updateHandler = async (newRow: any, prevRow: any) => {
    if (newRow.status === "APPROVED") {
      const result = await approveDenyTopupAction({
        topupId: newRow.id,
        status: topupstatus.APPROVED,
        accountId: newRow.accountId,
        amount: newRow.amount,
      });
      if (result.success) {
        toast("Top Up Request Approved", { icon: <FaCheck /> });
        return newRow;
      }
    } else if (newRow.status === "DENIED") {
      const result = await approveDenyTopupAction({
        topupId: newRow.id,
        status: topupstatus.DENIED,
        accountId: newRow.accountId,
        amount: newRow.amount,
      });
      if (result.success) {
        toast("Top Up Request Denied", { icon: <FaCheck /> });
        return newRow;
      }
    } else {
      toast("Invalid status value");
    }
    return prevRow;
  };

  return (
    <div>
      {data && (
        <AdminDataTable
          rows={data}
          loading={loading}
          overideColumns={overideColumns}
          isCellEditable={(params) => {
            if (params.field === "status") {
              return params.row.status === "REQUEST";
            }
            return true;
          }}
          editMode="cell"
          processRowUpdate={updateHandler}
          onProcessRowUpdateError={(err) => console.log(err)}
          getRowId={(row) => row.id}
        />
      )}
    </div>
  );
}
