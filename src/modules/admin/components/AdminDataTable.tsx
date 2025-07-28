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
  }, [props.rows]);

  return (
    <Box>
      <DataGrid
        {...props}
        rows={props.rows}
        columns={buildColumns}
        loading={props.loading}
        className="overflow-x-scroll"
        disableVirtualization
      />
    </Box>
  );
}
