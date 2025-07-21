import { GridColDef } from "@mui/x-data-grid";

export interface IAdminDataTable {
  rows: any[];
  loading?: boolean;
  onPageChange?: (page: number) => void;
  page?: number;
}
