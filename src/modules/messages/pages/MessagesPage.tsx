import { Text } from "@chakra-ui/react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

export default function MessagesPage() {
  const Columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          💬 Messages Sent
        </Text>
        <Text fontWeight={"light"}>
          ✨ Checkout the messages sent from your apps ✨
        </Text>
      </div>
      <div>
        <DataGrid rows={[]} columns={Columns} />
      </div>
    </div>
  );
}
