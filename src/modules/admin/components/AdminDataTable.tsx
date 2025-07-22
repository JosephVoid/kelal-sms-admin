"use client";

import { DataGrid } from "@mui/x-data-grid";
import { IAdminDataTable } from "../types";
import { buildMUIColumns } from "../utils";
import { Box } from "@mui/material";

export default function AdminDataTable(props: IAdminDataTable) {
  const buildColumns = buildMUIColumns(props.rows);
  return (
    <Box sx={{ width: 1000 }}>
      <DataGrid
        rows={props.rows}
        columns={buildColumns}
        loading={props.loading}
        className="overflow-x-scroll"
      />
    </Box>
  );
}
