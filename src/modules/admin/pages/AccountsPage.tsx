"use client";
import { useAsync } from "@/utils/useAsync";
import fetchAccountsAdminAction from "../lib/actions/fetch-accounts-admin.action";
import AdminDataTable from "../components/AdminDataTable";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { TextField } from "@mui/material";
import { editAccountBalanceAction } from "../lib/actions/edit-account-balance.action";
import { toast } from "sonner";
import { FaCheck } from "react-icons/fa";
import { banAccountAction } from "../lib/actions/ban-account.action";

export default function AccountsPage() {
  const { data, loading } = useAsync(fetchAccountsAdminAction, true, []);

  const columnsToOverride: GridColDef[] = [
    {
      field: "balance",
      headerName: "balance",
      type: "number",
      editable: true,
    },
    {
      field: "isBanned",
      headerName: "isBanned",
      type: "boolean",
      editable: true,
    },
  ];

  const balanceUpdateHandler = async (newRow: any, prevRow: any) => {
    if (newRow.balance !== prevRow.balance) {
      await editAccountBalanceAction({
        accountId: newRow.id,
        balance: newRow.balance,
      });
      toast("Account Balance Updated", { icon: <FaCheck /> });
    }
    if (newRow.isBanned !== prevRow.isBanned) {
      await banAccountAction({
        accountId: newRow.id,
        isBanned: newRow.isBanned,
      });
      toast(`Account ${newRow.isBanned ? "Banned" : "Un-banned"}`, {
        icon: <FaCheck />,
      });
    }
    return newRow;
  };

  return (
    <div>
      {data && (
        <AdminDataTable
          rows={data}
          loading={loading}
          overideColumns={columnsToOverride}
          editMode="cell"
          processRowUpdate={balanceUpdateHandler}
          onProcessRowUpdateError={(err) => console.log(err)}
          getRowId={(row) => row.id}
        />
      )}
    </div>
  );
}
