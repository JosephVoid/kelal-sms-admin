"use client";

import { DataGrid } from "@mui/x-data-grid";
import { IAdminDataTable } from "../types";
import { buildMUIColumns } from "../utils";
import { Box } from "@mui/material";
import React from "react";

export default function AdminDataTable(props: IAdminDataTable) {
  const autoColumns = buildMUIColumns(props.rows);

  const buildColumns = React.useMemo(() => {
    if (props.overideColumns) {
      return [
        ...autoColumns.filter(
          (col) =>
            !props.overideColumns?.some((ovCol) => ovCol.field === col.field)
        ),
        ...props.overideColumns,
      ];
    } else return autoColumns;
  }, [props.overideColumns]);

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <DataGrid
        {...props}
        rows={props.rows}
        columns={buildColumns}
        loading={props.loading}
        disableVirtualization
        sx={{
          minWidth: 600,
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#f5f5f5",
          },
        }}
      />
    </Box>
  );
}
