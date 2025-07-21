"use client";

import { DataGrid } from "@mui/x-data-grid";
import { IAdminDataTable } from "../types";
import { buildMUIColumns } from "../utils";

export default function AdminDataTable(props: IAdminDataTable) {
  const buildColumns = buildMUIColumns(props.rows);
  return (
    <div className="w-full overflow-x-scroll">
      <DataGrid
        rows={props.rows}
        columns={buildColumns}
        loading={props.loading}
      />
    </div>
  );
}
