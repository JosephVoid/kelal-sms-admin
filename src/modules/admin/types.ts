import { DataGridProps, GridColDef } from "@mui/x-data-grid";

export interface IAdminDataTable extends Partial<DataGridProps> {
  rows: any[];
  loading?: boolean;
  overideColumns?: GridColDef[];
  onPageChange?: (page: number) => void;
  page?: number;
}
