"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function MiniTable() {
  const Columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "category",
      headerName: "Category",
    },
  ];

  return (
    <div>
      <DataGrid columns={Columns} rows={items} />
    </div>
  );
}

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
